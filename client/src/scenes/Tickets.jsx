import React from "react";
import Header from "../components/Header";
import { useProfieApiQuery } from "../redux/Apis/userApi";
import { Box, Button, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Kanban from "../components/Kanban";
const Tickets = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const profile = useProfieApiQuery();

  return (
    <Box
      m={{
        xs: "0 1rem", // No margin for extra-small screens (mobile)
        sm: "0 2.5rem", // Apply margin for small screens and above
      }}
    >
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
      <Kanban role={profile?.data?.role}/>
    </Box>
  );
};

export default Tickets;
