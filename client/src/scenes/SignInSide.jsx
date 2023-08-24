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
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import login from "../assets/login.gif";
import { useLoginApiMutation } from "../redux/Apis/userApi";
import { setUserId } from "../redux/states";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function SignInSide() {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.global.userId);
  if (userId) navigate("/dashboard");
  const [errorSubmiting, seterrorSubmiting] = React.useState("");
  const dispatch = useDispatch();
  const [loginApi] = useLoginApiMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const { data, error } = await loginApi({
      email: formdata.get("email"),
      password: formdata.get("password"),
    });
    if (error) seterrorSubmiting("* " + error.data.message? error.data.message: "try again");
    else if (data) {
      dispatch(setUserId(data.token));
      Cookies.set("jwt", data.token, { expires: 7 }); // Set the cookie using js-cookie library
      navigate("/dashboard");
    }
  };
  const handleDemo = () => {
    const demoId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGUyYjk2ZmY5NWU5NDNkOWM5ODUwZjgiLCJpYXQiOjE2OTI1ODAyMDksImV4cCI6MTY5NTE3MjIwOX0.5lj5unCknIDdrrMH02PE6G6EGSSLxHLh7Pso_zLT8PQ"
    dispatch(setUserId(demoId));
      Cookies.set("jwt", demoId, { expires: 7 }); // Set the cookie using js-cookie library
      navigate("/dashboard");
  }
  
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
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
        sx={{ height: "100vh" }}
        sm={4}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
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
            Sign in
          </Typography>
          <Box
            component="form"
            // noValidate
            onSubmit={handleSubmit}
            sx={{ fontSize: "1rem", mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography component="p" sx={{ color: "red" }}>
              {errorSubmiting}
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button onClick={handleDemo} fullWidth variant="primary" sx={{ mt: 3, mb: 2 }}>
              Take A Demo
            </Button>
            <Grid container sx={{ justifyContent: "center" }}>
              <Link onClick={()=>navigate("/register")} variant="body2" sx={{ fontSize: "1rem" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mt={5}
            >
              {"Copyright © WorkForceFlow "}

              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
