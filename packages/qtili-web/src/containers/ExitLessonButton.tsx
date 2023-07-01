import React from "react";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Actions } from "@/store/Actions";

export const ExitLessonButton = () => {
  const exitLesson = Actions.useExitLesson();

  return (
    <IconButton
      sx={{ position: "absolute", top: 0, left: 0 }}
      size="large"
      color="inherit"
      onClick={exitLesson}
    >
      <ClearOutlinedIcon />
    </IconButton>
  );
};
