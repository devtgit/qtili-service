import React from "react";
import Button from "@mui/material/Button";
import { css } from "@emotion/css";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@/pages/PageLayout";
import { AppBarTitlePortal } from "@/containers/layout/AppTopBar";
import { Actions } from "@/store/Actions";

export const SchoolPage = () => {
  const { t } = useTranslation();
  const startLesson = Actions.useStartLesson();

  return (
    <PageLayout>
      <AppBarTitlePortal>{t("school_page")}</AppBarTitlePortal>

      <div
        className={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Button
          sx={{
            borderWidth: 4,
            borderRadius: "50%",
            width: 100,
            height: 100,
            padding: 12,
            fontSize: 18,
            "&:hover": {
              borderWidth: 4,
            },
          }}
          fullWidth={true}
          variant="outlined"
          onClick={startLesson}
        >
          {t("start_learning")}
        </Button>
      </div>
    </PageLayout>
  );
};
