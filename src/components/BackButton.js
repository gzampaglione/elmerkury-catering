import React from "react";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const BackButton = ({ onClick, children }) => (
  <Button
    startIcon={<ArrowBack />}
    onClick={onClick}
    sx={{ mb: 1.5, color: "text.secondary" }}
  >
    {children}
  </Button>
);

export default BackButton;
