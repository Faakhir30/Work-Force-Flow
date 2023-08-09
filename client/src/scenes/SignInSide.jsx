import * as React from "react";
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
import { useLoginApiQuery } from "../redux/Apis/userApi";
import { setUserId } from "../redux/states";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function SignInSide() {
  const navigate = useNavigate();
  // const {da}=axios.post('http://localhost:5001/api/users/auth',{email: formdata.get("email"), password: formdata.get("password")})
  const dispatch=useDispatch()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUserId("asjdasjd"));
    navigate('/dashboard')
    const formdata = new FormData(event.currentTarget);
    // const { data, isError, error } = useLoginApiQuery({
    //   email: formdata.get("email"),
    //   password: formdata.get("password"),
    // });
    // if (isError) console.log(error.data.message);
    // else {
    //   navigate("/dashboard");
    // }
  };
  
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ fontSize: "1rem", mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Take A Demo
            </Button>
            <Grid container sx={{ justifyContent: "center" }}>
              <Link href="/register" variant="body2" sx={{ fontSize: "1rem" }}>
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
