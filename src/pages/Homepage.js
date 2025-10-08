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
} from "@mui/material";
import {
  BusinessCenter,
  Event,
  History,
  RestaurantMenu,
  Search,
  Settings,
  ShoppingCart,
  Today,
  Warning,
  Assignment,
  Payment,
  Satellite,
} from "@mui/icons-material";
import SectionHeader from "../components/SectionHeader";

const Homepage = ({
  setView,
  customer,
  recentOrders,
  poQueue,
  paymentTracking,
}) => {
  const pendingPOs = poQueue.filter((po) => po.poStatus === "Awaiting PO");
  const receivedPOs = poQueue.filter((po) => po.poStatus === "PO Received");
  const overduePayments = paymentTracking.filter(
    (p) => p.paymentStatus === "Overdue"
  );

  return (
    <>
      <SectionHeader>📧 Current Email Context:</SectionHeader>
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
              <Typography variant="body2">
                📊 {customer.orderCount} orders | $
                {customer.ytdSpend.toLocaleString()} YTD
              </Typography>
              <Typography variant="body2">
                Last order: {customer.lastOrder}
              </Typography>
              {customer.flags?.requiresPO && (
                <Chip
                  label="Requires PO"
                  size="small"
                  color="warning"
                  sx={{ mt: 1 }}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Action Alerts */}
      {receivedPOs.length > 0 && (
        <Alert
          severity="success"
          sx={{ mt: 2 }}
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
            {receivedPOs.length} PO{receivedPOs.length > 1 ? "s" : ""} received
            - ready to finalize
          </Typography>
        </Alert>
      )}

      {overduePayments.length > 0 && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
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

      <Divider sx={{ my: 2, borderStyle: "dashed" }} />

      {/* Primary Actions */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<ShoppingCart />}
        sx={{ mb: 1, justifyContent: "flex-start", p: 1.5 }}
        onClick={() =>
          customer.category === "Satellite"
            ? setView("processSatelliteOrder")
            : setView("processOrderStep1")
        }
      >
        Process Catering Order
      </Button>
      <Button
        fullWidth
        variant="contained"
        startIcon={<RestaurantMenu />}
        sx={{ mb: 1, justifyContent: "flex-start", p: 1.5 }}
        onClick={() => setView("generateProposalStep1")}
      >
        Generate Menu Proposal
      </Button>

      {/* Work Queues */}
      {(pendingPOs.length > 0 || receivedPOs.length > 0) && (
        <>
          <Button
            fullWidth
            onClick={() => setView("poTrackingQueue")}
            sx={{ justifyContent: "flex-start", mt: 2.5, mb: 1 }}
          >
            <Typography variant="overline" color="text.secondary">
              PO Work Queue ({pendingPOs.length + receivedPOs.length})
            </Typography>
          </Button>
          <List dense>
            {poQueue.slice(0, 3).map((po) => (
              <ListItemButton
                key={po.orderNum}
                onClick={() => setView("poTrackingQueue")}
              >
                <ListItemIcon sx={{ minWidth: 30 }}>
                  <Assignment
                    color={
                      po.poStatus === "PO Received" ? "success" : "warning"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={`${po.customerName} - ${po.deliveryDate}`}
                  secondary={
                    po.poStatus === "PO Received"
                      ? `PO: ${po.poNumber}`
                      : `Awaiting PO (Day ${po.daysWaiting})`
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </>
      )}

      {/* Recent Orders */}
      <Button
        fullWidth
        onClick={() => setView("searchOrders")}
        sx={{ justifyContent: "flex-start", mt: 2.5, mb: 1 }}
      >
        <Typography variant="overline" color="text.secondary">
          Recent Orders
        </Typography>
      </Button>
      <List dense>
        {recentOrders.slice(0, 5).map((order) => (
          <ListItemButton
            key={order.id}
            onClick={() => setView("editOrderScreen")}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              {order.status === "scheduled" ? (
                <Event color="primary" />
              ) : (
                <History color="action" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={`${order.customer} - ${order.date}`}
              secondary={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
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
      </List>

      {/* Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Button
          size="small"
          startIcon={<Today />}
          onClick={() => setView("calendarView")}
        >
          Calendar
        </Button>
        <Button
          size="small"
          startIcon={<Payment />}
          onClick={() => setView("paymentMonitoring")}
        >
          Payments
        </Button>
        <Button
          size="small"
          startIcon={<Search />}
          onClick={() => setView("searchOrders")}
        >
          Search
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
