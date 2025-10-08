import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Chip,
  Alert,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  BusinessCenter,
  Event,
  History,
  RestaurantMenu,
  Settings,
  ShoppingCart,
  Warning,
  Assignment,
  Payment,
  Satellite,
  ExpandMore,
  Language,
} from "@mui/icons-material";
import SectionHeader from "../components/SectionHeader";

const Homepage = ({
  setView,
  customer,
  recentOrders,
  poQueue,
  paymentTracking,
  websiteOrders,
}) => {
  const pendingPOs = poQueue.filter((po) => po.poStatus === "Awaiting PO");
  const receivedPOs = poQueue.filter((po) => po.poStatus === "PO Received");
  const overduePayments = paymentTracking.filter(
    (p) => p.paymentStatus === "Overdue"
  );
  const pendingWebsiteOrders =
    websiteOrders?.filter((wo) => wo.status === "pending_review") || [];

  const totalActionItems =
    receivedPOs.length + overduePayments.length + pendingWebsiteOrders.length;

  return (
    <>
      {/* Email Context */}
      <SectionHeader>📧 Current Email</SectionHeader>
      <Card
        variant="outlined"
        sx={{
          backgroundColor:
            customer.name === "New Customer" ? "#FFF8E1" : "#E3F2FD",
        }}
      >
        <CardContent>
          {customer.name === "New Customer" ? (
            <Typography
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <Warning color="warning" sx={{ mr: 1 }} />
              {customer.name}
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BusinessCenter color="primary" sx={{ mr: 1 }} />
                  {customer.name}
                </Typography>
                <Chip
                  label={customer.category}
                  size="small"
                  color={
                    customer.category === "Satellite" ? "warning" : "primary"
                  }
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                📊 {customer.orderCount} orders | $
                {customer.ytdSpend.toLocaleString()} YTD | Avg margin:{" "}
                {customer.avgMargin}%
              </Typography>
              {customer.flags?.requiresPO && (
                <Chip
                  label="⚠️ Requires PO"
                  size="small"
                  color="warning"
                  sx={{ mt: 1 }}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Divider sx={{ my: 2 }} />

      {/* Primary Actions */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={() => setView("processOrderStep1")}
          sx={{ flexGrow: 1 }}
        >
          Process Order
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<RestaurantMenu />}
          onClick={() => setView("generateProposalStep1")}
          sx={{ flexGrow: 1 }}
        >
          Generate Proposal
        </Button>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<Satellite />}
        onClick={() => setView("processSatelliteOrder")}
        sx={{ mb: 2 }}
      >
        Satellite Event (Mann / Churro Bike)
      </Button>

      {/* Action Items */}
      {totalActionItems > 0 && (
        <>
          <SectionHeader>
            <Badge badgeContent={totalActionItems} color="error" sx={{ mr: 1 }}>
              <Assignment />
            </Badge>
            Action Items
          </SectionHeader>

          {receivedPOs.length > 0 && (
            <Alert
              severity="success"
              sx={{ mb: 1 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setView("poTrackingQueue")}
                >
                  View
                </Button>
              }
            >
              <Typography variant="body2" fontWeight="bold">
                {receivedPOs.length} PO{receivedPOs.length > 1 ? "s" : ""} ready
                to finalize
              </Typography>
            </Alert>
          )}

          {overduePayments.length > 0 && (
            <Alert
              severity="error"
              sx={{ mb: 1 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setView("paymentMonitoring")}
                >
                  View
                </Button>
              }
            >
              <Typography variant="body2" fontWeight="bold">
                {overduePayments.length} overdue payment
                {overduePayments.length > 1 ? "s" : ""}
              </Typography>
            </Alert>
          )}

          {pendingWebsiteOrders.length > 0 && (
            <Alert
              severity="info"
              sx={{ mb: 1 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setView("websiteOrderQueue")}
                >
                  View
                </Button>
              }
            >
              <Typography variant="body2" fontWeight="bold">
                {pendingWebsiteOrders.length} website order
                {pendingWebsiteOrders.length > 1 ? "s" : ""} pending review
              </Typography>
            </Alert>
          )}
        </>
      )}

      {/* Work Queues - Collapsible */}
      <Accordion sx={{ mb: 1 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              pr: 2,
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Work Queues
            </Typography>
            <Chip
              label={`${
                pendingPOs.length +
                receivedPOs.length +
                pendingWebsiteOrders.length
              }`}
              size="small"
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <List dense>
            <ListItemButton onClick={() => setView("poTrackingQueue")}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Badge
                  badgeContent={pendingPOs.length + receivedPOs.length}
                  color="warning"
                >
                  <Assignment />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="PO Tracking" />
            </ListItemButton>
            <ListItemButton onClick={() => setView("paymentMonitoring")}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Badge badgeContent={overduePayments.length} color="error">
                  <Payment />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Payment Monitoring" />
            </ListItemButton>
            <ListItemButton onClick={() => setView("websiteOrderQueue")}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Badge badgeContent={pendingWebsiteOrders.length} color="info">
                  <Language />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Website Orders" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Recent Orders - Collapsible */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2" fontWeight="bold">
            Recent Orders
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <List dense>
            {recentOrders.slice(0, 5).map((order) => (
              <ListItemButton
                key={order.id}
                onClick={() => setView("editOrderScreen")}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  {order.status === "scheduled" ? (
                    <Event color="primary" fontSize="small" />
                  ) : (
                    <History color="action" fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={`${order.customer} - ${order.date}`}
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      <Chip label={order.channel} size="small" />
                      <Typography variant="caption">
                        ${order.total.toFixed(2)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => setView("searchOrders")}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="primary">
                    View All Orders →
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Quick Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          gap: 1,
        }}
      >
        <Button
          size="small"
          startIcon={<Event />}
          onClick={() => setView("calendarView")}
        >
          Calendar
        </Button>
        <Button
          size="small"
          startIcon={<Settings />}
          onClick={() => setView("settingsPage")}
        >
          Settings
        </Button>
      </Box>
    </>
  );
};

export default Homepage;
