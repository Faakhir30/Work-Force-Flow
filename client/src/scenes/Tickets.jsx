import React, { useState } from "react";
import Header from "../components/Header";
import { useProfieApiQuery } from "../redux/Apis/userApi";
import {
  Box,
  Button,
  Container,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // Import the necessary components for drag-and-drop
import { Add, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
const Tickets = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const profile = useProfieApiQuery();
  
  return (
    <Box m={{
      xs: "0 1rem",      // No margin for extra-small screens (mobile)
      sm: "0 2.5rem" // Apply margin for small screens and above
    }}>
      <Header
        title={"Tickets"}
        subtitle={`See tickets issued ${
          profile?.data?.role === "intern" ? "to" : "by"
        } you!`}
      />
      {profile?.data?.role !== "intern" && (
        <Button
          sx={{
            color: theme.palette.secondary[100],
          }}
          onClick={() => {
            navigate("/tickets/create");
          }}
        >
          <Add />
          Create New Ticket
        </Button>
      )}{" "}
      <Kanban />
    </Box>
  );
};

const itemsFromBackend = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" },
];

const columnsFromBackend = {
  ["11"]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  ["33"]: {
    name: "Review Submissions",
    items: [],
  },
  ["44"]: {
    name: "Mark as Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
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

function Kanban() {
  const theme = useTheme();
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              width={{xs:"30vw", sm:"20vw"}}
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
                          width:"100%",
                          height: "65vh",
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
                          <Tooltip title="sundlijfldsijld">
                            <Info />
                          </Tooltip>
                        </FlexBetween>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 8,
                                      margin: "0 0 8px 0",
                                      minHeight: "40px",
                                      borderRadius:8,
                                      backgroundColor: snapshot.isDragging
                                        ? theme.palette.primary[700]
                                        : theme.palette.primary[600],
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
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
export default Tickets;
