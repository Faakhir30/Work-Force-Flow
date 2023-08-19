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
import { useCreateProjectMutation } from "../redux/Apis/projectApi";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [teamLead, setTeamLead] = useState(""); // State to hold the selected dropdown value
  const [interns, setInterns] = useState([]); // State to hold selected options
  const { data } = useAllusersApiQuery();
  const profile = useProfieApiQuery();
  const navigate = useNavigate();
  const [createProject] = useCreateProjectMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const { data, error } = await createProject({
      title: formdata.get("title"),
      team: [teamLead, profile.data._id, ...interns],
    });
    setIsError(error ? true : false);
    setMessage(error ? "* " + error.data?.message : data?.message);
    if (data) {
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    }
  };

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setInterns(selectedOption);
  };
  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ fontSize: "1rem", mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Team Lead</InputLabel>
          <Select
            value={teamLead}
            label="Select an option"
            required
            onChange={(e) => {
              setTeamLead(e.target.value);
            }}
          >
            {data?.users
              ?.filter((user) => user.role === "dev")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name + "  (TL)"}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Interns</InputLabel>
          <Select
            multiple
            required
            value={interns}
            label="Select options"
            onChange={handleDropdownChange}
          >
            {data?.users
              ?.filter((user) => user.role === "intern")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name + " (Intern)"}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Tooltip title="You will be signed up as Product Manager of this Project.You can perform changes for this project.">
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
          Create Project
        </Button>
        <Typography component="p" sx={{ color: isError ? "red" : "green" }}>
          {message}
        </Typography>
      </Box>
    </Container>
  );
};

export default CreateProject;
