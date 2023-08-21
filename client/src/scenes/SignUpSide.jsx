import * as React from "react";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import login from "../assets/login.gif";
import { setUserId } from "../redux/states";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterApiMutation } from "../redux/Apis/userApi";
import { IconButton, Tooltip } from "@mui/material";
export default function SignUpSide() {
  const { userId } = useSelector((state) => state.global.userId);
  if (userId) navigate("/dashboard");

  const [errorSubmiting, seterrorSubmiting] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerApi] = useRegisterApiMutation();
  const [photo, setPhoto] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    formdata.append("name", formdata.get("email").split("@")[0]);
    formdata.append("Login", "true");
    const { data, error } = await registerApi(formdata);
    if (error)
      seterrorSubmiting(
        "* " + error.data.message ? error.data.message : "try again"
      );
    else if (data) {
      dispatch(setUserId(data.token));
      Cookies.set("jwt", data.token, { expires: 7 }); // Set the cookie using js-cookie library
      navigate("/dashboard");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", overflow:"hidden" }}>
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={false}
        sm={8}
        md={7}
        sx={{
          display: { xs: "none", sm: "block" }, // Hide for screens < 900px
          backgroundImage: `url(${login})`, // Use the "login" image as the background
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ebebeb",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />
      <Grid
        item
        xs={12}
        sx={{ height: "100vh !important" }}
        sm={4}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: "20px",
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ fontSize: "1rem", mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              autoComplete="company"
              autoFocus
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
            <TextField
              type="file"
              variant="outlined"
              label="Upload Photo"
              id="photo"
              name="photo"
              onChange={(event) => setPhoto(event.target.files[0])}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Tooltip title="You will be signed up as admin/Product Manager of this company.You can add company members later">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Typography component="p" sx={{ color: "red" }}>
              {errorSubmiting}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button type="" fullWidth variant="primary" sx={{ mt: 3, mb: 2 }}>
              Take A Demo
            </Button>
            <Grid container sx={{ justifyContent: "center" }}>
              <Link href="/login" variant="body2" sx={{ fontSize: "1rem" }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
