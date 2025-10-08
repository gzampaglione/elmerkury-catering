import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => (
  <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2tJ0eBvs7HLGKNv-xlBNhWXiQKX_zLvpag&s"
      alt="Logo"
      style={{ width: 32, height: 32, marginRight: 12 }}
    />
    <Typography variant="body1" sx={{ fontWeight: "500" }}>
      El Merkury Catering Assistant
    </Typography>
  </Box>
);

export default Header;
