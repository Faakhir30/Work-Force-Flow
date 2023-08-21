import { useTheme } from "@emotion/react";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAllusersApiQuery, useProfieApiQuery } from "../redux/Apis/userApi";
import { useCreateTicketMutation } from "../redux/Apis/ticketApi";
import { useNavigate } from "react-router-dom";
import { useAllProjectsQuery } from "../redux/Apis/projectApi";

const CreateTicket = () => {
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDev, setSelectedDev] = useState("");
  const { data } = useAllusersApiQuery();
  const { data: projectData } = useAllProjectsQuery();
  const navigate = useNavigate();
  const [createTicket] = useCreateTicketMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const { data, error } = await createTicket({
      title: formdata.get("title"),
      holder: formdata.get("holder"),
      project: formdata.get("project"),
      category: formdata.get("category")
    });
    setIsError(error ? true : false);
    setMessage(error ? "* " + error.data?.message : data?.message);
    if (data) {
      setTimeout(() => {
        navigate("/tickets");
      }, 1000);
    }
  };
  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ fontSize: "1rem", mt: 1 }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Project</InputLabel>
          <Select
            id="project"
            label="Select an option"
            name="project"
            value={selectedProject}
            autoComplete="project"
            required
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projectData
              ?.filter((project) => project.status !== "done")
              .map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Developer</InputLabel>
          <Select
            id="holder"
            name="holder"
            autoComplete="holder"
            label="Select an option"
            value={selectedDev}
            required
            onChange={(e) => setSelectedDev(e.target.value)}
          >
            {data?.users
              ?.filter((user) => user.role === "intern")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category e.g., UI Designing, Testing ... "
          name="category"
          autoComplete="category"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title / Description"
          name="title"
          autoComplete="title"
        />

        <Tooltip title="You will be Ticket Provider.You can perform review Ticket when submitted by dev.">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Ticket
        </Button>
        <Typography component="p" sx={{ color: isError ? "red" : "green" }}>
          {message}
        </Typography>
      </Box>
    </Container>
  );
};

export default CreateTicket;
