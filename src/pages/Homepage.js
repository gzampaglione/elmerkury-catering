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
} from "@mui/icons-material";
import SectionHeader from "../components/SectionHeader";

const Homepage = ({ setView, customer, recentOrders }) => (
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
            <Typography
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <BusinessCenter color="primary" sx={{ mr: 1 }} />
              {customer.name}
            </Typography>
            <Typography variant="body2">
              📊 {customer.orderCount} orders | $
              {customer.ytdSpend.toLocaleString()} YTD
            </Typography>
            <Typography variant="body2">
              Last order: {customer.lastOrder}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
    <Divider sx={{ my: 2, borderStyle: "dashed" }} />
    <Button
      fullWidth
      variant="contained"
      startIcon={<ShoppingCart />}
      sx={{ mb: 1, justifyContent: "flex-start", p: 1.5 }}
      onClick={() => setView("processOrderStep1")}
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
            secondary={`$${order.total.toFixed(2)}`}
          />
        </ListItemButton>
      ))}
    </List>
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button
        size="small"
        startIcon={<Today />}
        onClick={() => setView("calendarView")}
      >
        Calendar
      </Button>
      <Button
        size="small"
        startIcon={<Search />}
        onClick={() => setView("searchOrders")}
      >
        Search Orders
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

export default Homepage;
