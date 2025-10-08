import React from "react";
import { Box, Card, CardContent, Divider, Button } from "@mui/material";
import Header from "./Header";
import { Notifications } from "@mui/icons-material";
import NotificationsOverlay from "./states/Notifications";

const AppContainer = ({ children }) => (
  <Box
    sx={{
      p: 1,
      maxWidth: 380,
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
  handleCustomerToggle,
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
              <Notifications />
            </IconButton>
          </Tooltip>
          {showNotifications && (
            <NotificationsOverlay
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
          {children}
        </CardContent>
      </Card>
      <Button
        size="small"
        fullWidth
        onClick={handleCustomerToggle}
        sx={{ mt: 2, textTransform: "uppercase", color: "text.secondary" }}
      >
        Toggle Customer Context
      </Button>
    </AppContainer>
  </Box>
);

export default MainLayout;
