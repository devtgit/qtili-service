import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "@tanstack/react-location";

export const AppBottomNavigation = () => {
  const { t } = useTranslation();

  const location = useLocation();

  return (
    <BottomNavigation
      sx={{ width: "100%" }}
      showLabels={true}
      value={location.current.pathname}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        value="/"
        activeOptions={{ exact: true }}
        sx={{ fontWeight: 500 }}
        label={t("school_page")}
        icon={<SchoolIcon />}
      />

      <BottomNavigationAction
        component={Link}
        to="/stat"
        value="/stat"
        activeOptions={{ exact: true }}
        sx={{ fontWeight: 500 }}
        label={t("stat_page")}
        icon={<AnalyticsIcon />}
      />

      {/*<BottomNavigationAction*/}
      {/*  component={Link}*/}
      {/*  to="/settings"*/}
      {/*  value="/settings"*/}
      {/*  activeOptions={{ exact: true }}*/}
      {/*  sx={{ fontWeight: 500 }}*/}
      {/*  label={t('settings_page')}*/}
      {/*  icon={<SettingsIcon />}*/}
      {/*/>*/}
    </BottomNavigation>
  );
};
