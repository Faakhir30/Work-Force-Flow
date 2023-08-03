import { useSelector } from "react-redux";
import "./App.css";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/dashboard";

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
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to={"/dashboard"} />}>
                <Route path="/dashboard" element={<Dashboard />} />
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
