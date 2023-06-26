import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { useAtomValue } from "jotai";
import { UIState } from "@/store/UIState";

export const theme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#00A300",
      },
      info: {
        main: "#0476d0",
      },
      success: {
        main: "#00A300",
      },
      error: {
        main: "#FF5C5C",
      },
    },
    typography: {
      fontFamily:
        "Ubuntu, Fira Sans, Inter, Avenir, Helvetica, Arial, sans-serif",
    },
    border: {
      main: "#141414",
    },
  });

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const paletteMode = useAtomValue(UIState.paletteMode);
  const appTheme = useMemo(() => theme(paletteMode), [paletteMode]);

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export type AppTheme = ReturnType<typeof theme>;
