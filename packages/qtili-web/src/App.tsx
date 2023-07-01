import "@/fonts/Ubuntu/fonts.css";
import "@/i18n/i18n";

import React, { Suspense } from "react";
import { useAtomValue } from "jotai";
import {
  Link,
  MakeGenerics,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
} from "@tanstack/react-location";
import CssBaseline from "@mui/material/CssBaseline";
import { AppThemeProvider } from "@/theme/theme";
import { LessonMain } from "@/containers/lesson/LessonMain";
import { SchoolPage } from "@/pages/SchoolPage";
import { AppContainer } from "@/components/AppContainer";
import { AppBottomNavigation } from "@/containers/layout/AppBottomNavigation";
import { SettingsPage } from "@/pages/SettingsPage";
import { StatPage } from "@/pages/StatPage";
import { AppTopBar } from "@/containers/layout/AppTopBar";
import { UIState } from "@/store/UIState";
import { LessonLoading } from "@/containers/lesson/LessonLoading";

const location = new ReactLocation();

const App = () => {
  const lessonMode = useAtomValue(UIState.lessonMode);

  return (
    <AppThemeProvider>
      <CssBaseline />
      <AppContainer>
        {!lessonMode && (
          <Router
            location={location}
            routes={[
              { path: "/", element: <SchoolPage /> },
              { path: "/settings", element: <SettingsPage /> },
              { path: "/stat", element: <StatPage /> },
            ]}
          >
            <AppTopBar />
            <Outlet /> {/* Start rendering router matches */}
            <AppBottomNavigation />
          </Router>
        )}
        {lessonMode && (
          <Suspense fallback={<LessonLoading />}>
            <LessonMain />
          </Suspense>
        )}
      </AppContainer>
    </AppThemeProvider>
  );
};

export default App;
