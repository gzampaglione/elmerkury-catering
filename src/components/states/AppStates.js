import React from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const HelpTip = ({ onDismiss }) => (
  <Alert severity="info" onClose={onDismiss} sx={{ mb: 2 }}>
    <Typography fontWeight="bold">💡 Tip: Penn Orders</Typography>
    All Penn entities require a 2-step invoice process. Send "Preliminary"
    invoice first, then update with PO number when received.
  </Alert>
);

export const NotificationsOverlay = ({
  notifications,
  setNotifications,
  setView,
}) => {
  const handleAction = (action, params) => {
    if (action === "viewOrder") {
      setView("editOrderScreen");
    } else if (action === "finalizePO") {
      setView("poTrackingQueue");
    } else if (action === "sendReminder") {
      setView("paymentMonitoring");
    }
  };

  return (
    <Card
      sx={{
        position: "absolute",
        top: 50,
        right: 10,
        width: 320,
        maxHeight: "80vh",
        overflowY: "auto",
        zIndex: 100,
        boxShadow: 6,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontWeight="bold">
            Notifications ({notifications.length})
          </Typography>
          <IconButton size="small" onClick={() => setNotifications([])}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        {notifications.map((n) => (
          <Card key={n.id} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <Typography fontSize="1.2rem">{n.icon}</Typography>
              <Box flexGrow={1}>
                <Typography variant="body2" fontWeight="bold">
                  {n.title}
                </Typography>
                <Typography variant="caption" display="block">
                  {n.body}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mt: 0.5 }}
                >
                  {n.time}
                </Typography>
                {n.actionable && n.actions.length > 0 && (
                  <Box
                    sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {n.actions.map((action, idx) => (
                      <Button
                        key={idx}
                        size="small"
                        variant="outlined"
                        onClick={() => handleAction(action.action, action)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
