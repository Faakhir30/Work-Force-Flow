import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import { useRegisterApiMutation } from "../redux/Apis/userApi";

export default function AddUserModal({ open, setOpen, company }) {
  const theme = useTheme();
  const handleClose = () => {
    setsuccessMsg("");
    seterrorSubmiting("");
    setOpen(false);
  };
  const [role, setRole] = React.useState("intern");
  const [errorSubmiting, seterrorSubmiting] = React.useState("");
  const [successMsg, setsuccessMsg] = React.useState("");
  const [registerApi] = useRegisterApiMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const { data, error } = await registerApi({
      company: company,
      email: formdata.get("email"),
      password: formdata.get("password"),
      role: role,
      name: formdata.get("email").split("@")[0],
      Login: false,
    });
    if (error) seterrorSubmiting("* " + error.data.message);
    else if (data) {
      seterrorSubmiting("");
      setsuccessMsg(data.message);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          borderRadius: "20px",
          bgcolor: "background.paper",
          color: theme.palette.grey,
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          margin="normal"
          disabled={true}
          value={company}
          fullWidth
          id="company"
          label="Company Name"
          name="company"
          autoComplete="company"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          type="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Box>
          <Typography variant="h6">Select Role</Typography>
          <RadioGroup
            sx={{ display: "flex", flexDirection: "row" }}
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <FormControlLabel
              value="admin"
              control={<Radio color="primary" />}
              label="Admin"
            />
            <FormControlLabel
              value="dev"
              control={<Radio color="primary" />}
              label="Developer"
            />
            <FormControlLabel
              value="intern"
              control={<Radio color="primary" />}
              label="Intern"
            />
          </RadioGroup>
        </Box>
        <Typography component="p" sx={{ color: "red" }}>
          {errorSubmiting}
        </Typography>
        <Typography component="p" sx={{ color: "green" }}>
          {successMsg}
        </Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add User
        </Button>
      </Box>
    </Modal>
  );
}