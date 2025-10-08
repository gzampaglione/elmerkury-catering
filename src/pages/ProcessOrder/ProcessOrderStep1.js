import React, { useState, useEffect } from "react";
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
  Button,
  FormControlLabel,
  Switch,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  CalendarMonth,
  Info,
  ArrowForwardIos,
} from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessOrderStep1 = ({ setView, customer, order, setShowHelpTip }) => {
  const [deliveryTime, setDeliveryTime] = useState("12:30");
  const [utensils, setUtensils] = useState({
    included: order.utensils.included,
    count: order.utensils.count,
  });
  const [customerPhone, setCustomerPhone] = useState(
    customer.contactPhone || ""
  );
  const [deliveryContactPhone, setDeliveryContactPhone] = useState("");
  const conflict = deliveryTime === "12:30";

  useEffect(() => {
    // Show help tip for Penn customers
    if (customer.name === "Penn Law") {
      setShowHelpTip(true);
    } else {
      setShowHelpTip(false);
    }
    // Cleanup on component unmount
    return () => setShowHelpTip(false);
  }, [customer, setShowHelpTip]);

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handleCustomerPhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCustomerPhone(formatted);
  };

  const handleDeliveryPhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setDeliveryContactPhone(formatted);
  };

  const handleUtensilsChange = (event) => {
    setUtensils({ ...utensils, included: event.target.checked });
  };

  const handleUtensilCountChange = (event) => {
    setUtensils({ ...utensils, count: parseInt(event.target.value, 10) || 0 });
  };

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
      <TextField
        fullWidth
        label="Customer Email"
        defaultValue={customer.contactEmail}
        margin="dense"
        size="small"
        type="email"
      />
      <TextField
        fullWidth
        label="Customer Phone"
        value={customerPhone}
        onChange={handleCustomerPhoneChange}
        margin="dense"
        size="small"
        type="tel"
        placeholder="(215) 555-1234"
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
                YTD Spend:
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
      <Tooltip title="Leave blank if same as customer">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Contact
          </Typography>
          <TextField
            fullWidth
            label="Delivery Contact Name"
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            label="Delivery Contact Phone"
            value={deliveryContactPhone}
            onChange={handleDeliveryPhoneChange}
            margin="dense"
            size="small"
            type="tel"
            placeholder="(215) 555-1234"
          />
        </Box>
      </Tooltip>
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="overline" color="text.secondary">
        Address
      </Typography>
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
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="overline" color="text.secondary">
        Date & Time
      </Typography>
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
      <Divider sx={{ my: 1.5 }} />
      <Typography variant="overline" color="text.secondary">
        Add-ons
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={utensils.included}
              onChange={handleUtensilsChange}
            />
          }
          label="Utensils"
        />
        {utensils.included && (
          <TextField
            label="How many?"
            type="number"
            size="small"
            value={utensils.count}
            onChange={handleUtensilCountChange}
            sx={{ width: 120 }}
          />
        )}
      </Box>
      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        sx={{ mt: 2 }}
        onClick={() => setView("processOrderStep2")}
      >
        Next: Review Items
      </Button>
    </>
  );
};

export default ProcessOrderStep1;
