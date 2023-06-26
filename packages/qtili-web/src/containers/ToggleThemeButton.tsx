import React, { useEffect } from "react";
import { useAtom } from "jotai";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import IconButton from "@mui/material/IconButton";
import { UIState } from "@/store/UIState";
import { useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

type ReactNativeWebView = {
  postMessage<T>(message: string): void;
};

declare global {
  interface Window {
    ReactNativeWebView: ReactNativeWebView;
  }
}

function reactNativeCallback(
  cb: (ReactNativeWebView: ReactNativeWebView) => void
) {
  if (window.ReactNativeWebView != null) {
    cb(window.ReactNativeWebView);
  }
}

const switchThemePayload = (theme: Theme) => {
  if (theme.palette.mode === "light") {
    return {
      status: "light",
      top: theme.palette.primary.main,
      bottom: theme.palette.background.default,
    };
  }

  return {
    mode: "light",
    top: "#272727", // background.default + linear gradient 255, 0.09
    bottom: theme.palette.background.default,
  };
};

export const ToggleThemeButton = () => {
  const [themeMode, setThemeMode] = useAtom(UIState.paletteMode);
  const theme = useTheme();

  useEffect(() => {
    console.log(theme);

    reactNativeCallback(({ postMessage }) => {
      postMessage(
        JSON.stringify({
          type: "SWITCH_THEME",
          payload: switchThemePayload(theme),
        })
      );
    });
  }, [theme]);

  return (
    <IconButton
      size="large"
      color="inherit"
      onClick={() => setThemeMode((x) => (x === "dark" ? "light" : "dark"))}
    >
      {themeMode === "light" ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
  );
};
