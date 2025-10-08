import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { CheckCircle, Satellite } from "@mui/icons-material";
import BackButton from "../BackButton";
import MannCenterForm from "./MannCenterForm";
import MarketingEventForm from "./MarketingEventForm";
import ChurroBikeForm from "./ChurroBikeForm";
import OrderSummary from "./OrderSummary";

const SatelliteOrderPage = ({ setView, handleProcessOrder, customer }) => {
  const [satelliteType, setSatelliteType] = useState("Mann Center");
  const [orderData, setOrderData] = useState({
    assignedStaff: [],
    selectedItems: [],
    bonusEnabled: false,
    bonusType: "fixed",
    bonusAmount: 50,
    churroHours: 3,
  });

  const handleTypeChange = (newType) => {
    setSatelliteType(newType);
    setOrderData({
      assignedStaff: [],
      selectedItems: [],
      bonusEnabled: false,
      bonusType: "fixed",
      bonusAmount: 50,
      churroHours: 3,
    });
  };

  const handleSubmit = () => {
    // Process the order with all data
    handleProcessOrder({
      type: satelliteType,
      ...orderData,
    });
  };

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Satellite color="warning" />
        <Typography variant="h6">Satellite Event Order</Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="caption">
          Satellite events route to Catering KDS with special location tags.
          {satelliteType !== "Churro Bike" && " Costs pulled from MarginEdge."}
          {orderData.assignedStaff.length > 0 &&
            " Staff assignments sync with ADP payroll."}
        </Typography>
      </Alert>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Satellite Type</InputLabel>
        <Select
          value={satelliteType}
          onChange={(e) => handleTypeChange(e.target.value)}
          label="Satellite Type"
        >
          <MenuItem value="Mann Center">🎵 Mann Center (Concert VIP)</MenuItem>
          <MenuItem value="Marketing Event">📣 Marketing Event</MenuItem>
          <MenuItem value="Churro Bike">🚲 Churro Bike (Mobile Event)</MenuItem>
        </Select>
      </FormControl>

      {satelliteType === "Mann Center" && (
        <MannCenterForm orderData={orderData} setOrderData={setOrderData} />
      )}
      {satelliteType === "Marketing Event" && (
        <MarketingEventForm orderData={orderData} setOrderData={setOrderData} />
      )}
      {satelliteType === "Churro Bike" && (
        <ChurroBikeForm
          orderData={orderData}
          setOrderData={setOrderData}
          customer={customer}
        />
      )}

      <OrderSummary
        satelliteType={satelliteType}
        orderData={orderData}
        setOrderData={setOrderData}
      />

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          📋 Toast KDS Routing
        </Typography>
        <Typography variant="caption" display="block">
          This order will appear on Catering KDS tagged: "{satelliteType}"
        </Typography>
        {orderData.assignedStaff.length > 0 && (
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
            👥 Staff scheduled:{" "}
            {orderData.assignedStaff.map((s) => s.name).join(", ")}
          </Typography>
        )}
      </Alert>

      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={<CheckCircle />}
        onClick={handleSubmit}
      >
        PROCESS SATELLITE ORDER
      </Button>
    </>
  );
};

export default SatelliteOrderPage;
