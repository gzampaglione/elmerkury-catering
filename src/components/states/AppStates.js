import React from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const HelpTip = ({ onDismiss }) => (
  <Alert severity="info" onClose={onDismiss} sx={{ mb: 2 }}>
    <Typography fontWeight="bold">💡 Tip: First time with Penn?</Typography>
    Penn orders require a 2-step invoice process. Send a "Preliminary" invoice
    first, then update with the PO number they provide.
  </Alert>
);

export const NotificationsOverlay = ({ notifications, setNotifications }) => (
  <Card
    sx={{
      position: "absolute",
      top: 50,
      right: 10,
      width: 300,
      zIndex: 100,
      boxShadow: 6,
    }}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" fontWeight="bold">
          Notifications ({notifications.length} new)
        </Typography>
        <IconButton size="small" onClick={() => setNotifications([])}>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />
      {notifications.map((n) => (
        <Card key={n.id} variant="outlined" sx={{ p: 1, mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {n.icon} {n.title}
          </Typography>
          <Typography variant="caption">{n.body}</Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            {n.time}
          </Typography>
        </Card>
      ))}
    </CardContent>
  </Card>
);
