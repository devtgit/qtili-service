import React from "react";
import Typography from "@mui/material/Typography";
import { useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/pages/PageLayout";
import { AppBarTitlePortal } from "@/containers/layout/AppTopBar";
import { StatState } from "@/store/StatState";

export const StatPage = () => {
  const lessonsCount = useAtomValue(StatState.lessonsCount);

  const { t } = useTranslation();

  return (
    <PageLayout>
      <AppBarTitlePortal>{t("stat_page")}</AppBarTitlePortal>
      <Typography variant="body1">
        Вы уже прошли: {lessonsCount} уроков
      </Typography>
    </PageLayout>
  );
};
