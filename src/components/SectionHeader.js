import React from "react";
import { Typography } from "@mui/material";

const SectionHeader = ({ children, ...props }) => (
  <Typography
    variant="overline"
    color="text.secondary"
    sx={{ display: "flex", alignItems: "center", mt: 2.5, mb: 1 }}
    {...props}
  >
    {children}
  </Typography>
);

export default SectionHeader;
