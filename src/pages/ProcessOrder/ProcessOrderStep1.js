import React, { useState } from "react";
import {
  Alert,
  Box,
  Card,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccessTime, CalendarMonth, Info, Warning } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessOrderStep1 = ({ setView, customer, order }) => {
  const [deliveryTime, setDeliveryTime] = useState("12:30");
  const conflict = deliveryTime === "12:30";

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Typography variant="h6">Step 1 of 3: Customer & Delivery</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        📋 Order #: {order.orderNum}
      </Typography>
      <SectionHeader>
        Customer Information{" "}
        <Tooltip title="Pulled from HubSpot CRM">
          <Info fontSize="small" sx={{ ml: 1 }} color="disabled" />
        </Tooltip>
      </SectionHeader>
      <TextField
        fullWidth
        label="Customer Name"
        defaultValue={customer.contactName}
        margin="dense"
        size="small"
      />
      <Select fullWidth defaultValue={customer.name} size="small">
        <MenuItem value="Penn Law">Penn Law</MenuItem>
        <MenuItem value="Wharton">Wharton</MenuItem>
        <MenuItem value="SIG">SIG</MenuItem>
      </Select>
      {customer.name !== "New Customer" && (
        <Card variant="outlined" sx={{ p: 1.5, mt: 1, bgcolor: "grey.50" }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Client Since:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {customer.clientSince}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Total Volume:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                ${customer.ytdSpend.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Avg. Order:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                ${Math.round(customer.ytdSpend / customer.orderCount)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Avg. Margin:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="500"
                color={
                  customer.avgMargin > 40 ? "success.main" : "warning.main"
                }
              >
                {customer.avgMargin}% (
                {customer.avgMargin > 40 ? "Strong" : "Weak"})
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
      <SectionHeader>Delivery Details</SectionHeader>
      <TextField
        fullWidth
        label="Address Line 1"
        defaultValue={customer.address.line1}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="Address Line 2"
        defaultValue={customer.address.line2}
        margin="dense"
        size="small"
      />
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label="State"
          defaultValue={customer.address.state}
          margin="dense"
          size="small"
        />
        <TextField
          label="ZIP Code"
          defaultValue={customer.address.zip}
          margin="dense"
          size="small"
        />
      </Box>
      <Tooltip title="Leave blank if same as customer">
        <TextField
          fullWidth
          label="Delivery Contact Name"
          margin="dense"
          size="small"
        />
      </Tooltip>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          fullWidth
          label="Delivery Date"
          defaultValue="2025-10-14"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
        <TextField
          fullWidth
          label="Delivery Time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          size="small"
          type="time"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <AccessTime sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Box>
      <Tooltip title="Pulled from Toast, calculated by system">
        <Alert severity={conflict ? "error" : "success"} sx={{ mt: 1 }}>
          {conflict ? "Conflict: SIG Delivery at 12:00 PM" : "No Conflict"}
        </Alert>
      </Tooltip>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setView("processOrderStep2")}
      >
        Next: Review Items
      </Button>
    </>
  );
};

export default ProcessOrderStep1;
