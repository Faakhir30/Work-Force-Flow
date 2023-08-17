import { useSelector } from "react-redux";
import "./App.css";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute";
import SignInSide from "./scenes/SignInSide";
import SignUpSide from "./scenes/SignUpSide";
import Projects from "./scenes/Projects";
import Users from "./scenes/Users";
import CreateProject from "./scenes/CreateProject";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => {
    return createTheme(themeSettings(mode), [mode]);
  });

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<SignInSide />} />
              <Route path="/register" element={<SignUpSide />} />
              <Route element={<PrivateRoute />}>
                <Route path="" element={<Layout />}>
                  <Route path="/" element={<Navigate to={"/dashboard"} />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/create" element={<CreateProject />} />
                  <Route path="/users" element={<Users />} />
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
