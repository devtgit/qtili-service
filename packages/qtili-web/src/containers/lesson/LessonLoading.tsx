import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export const LessonLoading = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Backdrop
        sx={{
          background: (props) => props.palette.background.default,
          display: "flex",
          flexDirection: "column",
        }}
        open={true}
      >
        <CircularProgress color="primary" size={48} />
        <div style={{ height: 30 }} />
        <Typography variant="h5">{t("loading")}</Typography>
      </Backdrop>
    </motion.div>
  );
};
