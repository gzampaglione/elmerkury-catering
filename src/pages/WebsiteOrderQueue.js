import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import { CheckCircle, Language, Visibility } from "@mui/icons-material";
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const WebsiteOrderQueue = ({ setView, websiteOrders }) => {
  const pendingOrders =
    websiteOrders?.filter((wo) => wo.status === "pending_review") || [];
  const processedOrders =
    websiteOrders?.filter((wo) => wo.status === "auto_processed") || [];

  const handleReviewOrder = (order) => {
    alert(`Reviewing website order ${order.orderNum}`);
    // In real app: navigate to order details
  };

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Language color="primary" />
        <Typography variant="h6">Website Order Queue</Typography>
      </Box>

      {pendingOrders.length > 0 && (
        <>
          <SectionHeader>Pending Review ({pendingOrders.length})</SectionHeader>
          {pendingOrders.map((order) => (
            <Card
              key={order.orderNum}
              variant="outlined"
              sx={{ mb: 2, bgcolor: "#FFF8E1" }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {order.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Order #{order.orderNum}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Delivery: {order.deliveryDate} at {order.deliveryTime}
                    </Typography>
                    <Chip
                      label={order.paymentStatus}
                      size="small"
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Items: {order.itemsSummary}
                </Typography>
                <Typography variant="caption" display="block">
                  Placed: {order.orderDate}
                </Typography>
                <Alert severity="info" sx={{ mt: 1, py: 0 }}>
                  <Typography variant="caption">
                    Auto-processing paused for review
                  </Typography>
                </Alert>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  startIcon={<Visibility />}
                  sx={{ mt: 2 }}
                  onClick={() => handleReviewOrder(order)}
                >
                  Review & Approve
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {processedOrders.length > 0 && (
        <>
          <SectionHeader>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            Auto-Processed ({processedOrders.length})
          </SectionHeader>
          {processedOrders.slice(0, 5).map((order) => (
            <Card key={order.orderNum} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {order.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Order #{order.orderNum}
                    </Typography>
                    <Chip
                      label="✅ Processed"
                      size="small"
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Processed: {order.processedDate}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="success.main"
                >
                  ✓ Toast | ✓ QBO | ✓ HubSpot | ✓ Email sent
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {pendingOrders.length === 0 && processedOrders.length === 0 && (
        <Alert severity="info">
          <Typography variant="body2">No website orders in queue 🎉</Typography>
        </Alert>
      )}
    </>
  );
};

export default WebsiteOrderQueue;
