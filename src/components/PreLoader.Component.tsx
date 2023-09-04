import React from "react";
import { CircularProgress, Box } from "@mui/material";

const PreLoaderComponent = () => {
  return (
    <>
      <Box className="preLoaderStyling">
        <CircularProgress className="theme-text-color" />
      </Box>
    </>
  );
};

export default PreLoaderComponent;