import React from "react";
import { createPortal } from "react-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ToggleThemeButton } from "@/containers/ToggleThemeButton";

const titleId = "app-bar-title";

export const AppTopBar = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <div id={titleId} />
        </Typography>
        <div>
          <ToggleThemeButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export const AppBarTitlePortal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return createPortal(
    children,
    document.getElementById(titleId) as HTMLElement
  );
};
