import { useTheme } from "@emotion/react";
import { Remove } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CreateProject = () => {
    const theme=useTheme()
  const [errorSubmiting, seterrorSubmiting] = useState("");
  const [selectedValue, setSelectedValue] = useState(""); // State to hold the selected dropdown value
  const [selectedValues, setSelectedValues] = useState([]); // State to hold selected options

  const handleSubmit = () => {
    // Your submit logic here
  };

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValues(selectedOption);
  };

  const handleRemoveOption = (option) => {
    setSelectedValues(selectedValues.filter((value) => value !== option));
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
        <FormControl fullWidth sx={{mt:2}}>
          <InputLabel>Select an option</InputLabel>
          <Select
            value={selectedValue}
            label="Select an option"
            onChange={(e) => {
              setSelectedValue(e.target.value);
            }}
          >
            <MenuItem value="a">Option A</MenuItem>
            <MenuItem value="b">Option B</MenuItem>
            <MenuItem value="c">Option C</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{mt:2}}>
          <InputLabel>Select options</InputLabel>
          <Select
            multiple
            value={selectedValues}
            label="Select options"
            onChange={handleDropdownChange}
          >
            <MenuItem value="a">Option A</MenuItem>
            <MenuItem value="b">Option B</MenuItem>
            <MenuItem value="c">Option C</MenuItem>
          </Select>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {selectedValues.map((value) => (
              <Button
                key={value}
                variant="outlined"
                sx={{ m: 0.5,
                    color:theme.palette.secondary[100]
                }}
                onClick={() => handleRemoveOption(value)}
              >
                {value} <Remove/>
              </Button>
            ))}
          </Box>
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
        <Typography component="p" sx={{ color: "red" }}>
          {errorSubmiting}
        </Typography>
      </Box>
    </Container>
  );
};

export default CreateProject;
