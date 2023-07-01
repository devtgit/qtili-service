import "@emotion/react";
import { Theme } from "@mui/material/styles";
import { theme, AppTheme } from "@/theme/theme";

declare module "@mui/material/styles" {
  interface Theme {
    border: {
      main: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    border?: {
      main?: string;
    };
  }
}

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
