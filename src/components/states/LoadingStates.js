import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

export const ProcessingOrderState = ({ progress }) => (
  <Box p={2}>
    <Typography variant="h6" gutterBottom>
      Processing Order #12345678...
    </Typography>
    <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />
    <Typography variant="body2">✅ Creating QBO invoice...</Typography>
    <Typography
      variant="body2"
      color={progress > 50 ? "inherit" : "text.secondary"}
    >
      {progress > 50 ? "✅" : "🔄"} Sending to Toast KDS...
    </Typography>
    <Typography variant="body2" color="text.secondary">
      ⏳ Creating HubSpot deal...
    </Typography>
  </Box>
);

export const GeneratingProposalsState = () => (
  <Box p={2} textAlign="center">
    <CircularProgress sx={{ mb: 2 }} />
    <Typography variant="h6">Generating Menu Proposals...</Typography>
    <Typography variant="body2" color="text.secondary">
      🤖 AI is analyzing...
    </Typography>
    <Typography variant="caption" display="block">
      ✅ Toast menu (142 items)
    </Typography>
    <Typography variant="caption" display="block">
      ✅ Inventory (48 ingredients)
    </Typography>
    <Typography variant="caption" display="block">
      🔄 Past proposals (87 analyzed)
    </Typography>
  </Box>
);
