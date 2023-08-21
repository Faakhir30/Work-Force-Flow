import React, { useEffect, useState } from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import the necessary components for drag-and-drop
import { Circle, Info } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import {
  useAllTicketsMutation,
  useUpdateTicketMutation,
} from "../redux/Apis/ticketApi";
const toolTipInfo = {
  Requested: "Tickets assigned to work on by Devs",
  Working: "Your currently active ticket",
  "Review Submissions": "Tickets submitted by Devs for review",
  "Mark as Done": "Mark ticket as completed",
};
function Kanban({ role }) {
  const theme = useTheme();
  const [columns, setColumns] = useState("");
  const [allTickets] = useAllTicketsMutation();
  const [updateTicket] = useUpdateTicketMutation();
  useEffect(() => {
    const getTickets = async () => {
      let { data: tickets } = await allTickets();
      setColumns({
        ["pending"]: {
          name: "Requested",
          items: tickets.filter((ticket) =>
            ["pending", "active"].includes(ticket.status)
          ),
        },
        [role === "intern" ? "active" : "submited"]: {
          name: role === "intern" ? "Working" : "Review Submissions",
          items: tickets.filter(
            (ticket) =>
              ticket.status === (role === "intern" ? "active" : "submited")
          ),
        },
        [role === "intern" ? "submited" : "done"]: {
          name: "Mark as Done",
          items: tickets.filter(
            (ticket) =>
              ticket.status === (role === "intern" ? "submited" : "done")
          ),
        },
      });
    };
    getTickets();
  }, []);
  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      await updateTicket({
        tid: columns[source.droppableId].items[source.index]._id,
        status: destination.droppableId,
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns &&
          Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                width={{ xs: "30vw", sm: "20vw" }}
                key={columnId}
              >
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? theme.palette.primary[800]
                            : theme.palette.background.alt,
                          width: "100%",
                          height: "65vh",
                          overflow:"auto",
                          borderRadius: 15,
                          padding: 10,
                        }}
                      >
                        <FlexBetween mb="10px">
                          <Typography
                            sx={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              color: theme.palette.primary[100],
                            }}
                            variant="h5"
                          >
                            {column.name}
                          </Typography>
                          <Tooltip title={toolTipInfo[column.name]}>
                            <Info />
                          </Tooltip>
                        </FlexBetween>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 8,
                                      margin: "0 0 8px 0",
                                      minHeight: "40px",
                                      borderRadius: 8,
                                      backgroundColor: snapshot.isDragging
                                        ? theme.palette.primary[700]
                                        : theme.palette.primary[600],
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <FlexBetween>
                                      <Typography variant="p">
                                        {item.title}
                                      </Typography>
                                      <Tooltip title={item.status}>
                                        <Circle
                                          sx={{
                                            color:
                                              item.status === "pending"
                                                ? "#ddcc02"
                                                : item.status === "active"
                                                ? "lightslategrey"
                                                : item.status === "submited"
                                                ? "lightgreen"
                                                : theme.palette.background
                                                    .default,
                                          }}
                                        />
                                      </Tooltip>
                                    </FlexBetween>
                                    <Typography variant="overline">{item.updatedAt.slice(0,10)}</Typography>
                                    </Box>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </Box>
            );
          })}
      </DragDropContext>
    </Box>
  );
}

export default Kanban;
