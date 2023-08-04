import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
} from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { setMode } from "../redux/states";
import FlexBetween from "./FlexBetween";
const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        // width:""
      }}
    >
      <Toolbar sx={{justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
