import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const NotificationsOverlay = ({ notifications, setNotifications }) => (
  <Card
    sx={{ position: "absolute", top: 50, right: 10, width: 300, zIndex: 100 }}
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

export default NotificationsOverlay;
