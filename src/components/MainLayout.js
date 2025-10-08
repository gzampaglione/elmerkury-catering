import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Tooltip,
  IconButton,
  Badge,
} from "@mui/material";
import Header from "./Header";
import { Notifications } from "@mui/icons-material";
import { NotificationsOverlay } from "./states/AppStates";

const AppContainer = ({ children }) => (
  <Box
    sx={{
      p: 1,
      maxWidth: 400,
      width: "100%",
      bgcolor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </Box>
);

const EmailPane = ({ content }) => (
  <Box
    sx={{
      flexGrow: 1,
      p: 3,
      bgcolor: "white",
      borderRight: "1px solid #e0e0e0",
      overflowY: "auto",
    }}
  >
    {content}
  </Box>
);

const MainLayout = ({
  children,
  emailContent,
  showNotifications,
  setShowNotifications,
  notifications,
  setNotifications,
  setView,
}) => (
  <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.100" }}>
    <EmailPane content={emailContent} />
    <AppContainer>
      <Card sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Header />
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          {showNotifications && (
            <NotificationsOverlay
              notifications={notifications}
              setNotifications={setNotifications}
              setView={setView}
            />
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <CardContent sx={{ flexGrow: 1, overflowY: "auto", pt: 0 }}>
          {children}
        </CardContent>
      </Card>
    </AppContainer>
  </Box>
);

export default MainLayout;
