import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { CheckCircle, Satellite } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessSatelliteOrder = ({
  setView,
  customer,
  order,
  handleProcessOrder,
}) => {
  const [satelliteType, setSatelliteType] = useState("Mann Center");
  const [customDescription, setCustomDescription] = useState(
    "Rice bowls for 500 concert attendees, ready by 5pm"
  );
  const [attendees, setAttendees] = useState(500);
  const [setupTime, setSetupTime] = useState("17:00");
  const [deliveryDate, setDeliveryDate] = useState("2025-10-20");

  const estimatedCost = attendees * 1.7; // $1.70 per person for rice bowls

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Satellite color="warning" />
        <Typography variant="h6">Satellite Event Order</Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="caption">
          Satellite events use custom configurations and route to the same
          Catering KDS with special tags.
        </Typography>
      </Alert>

      <SectionHeader>Event Details</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Satellite Location</InputLabel>
          <Select
            value={satelliteType}
            onChange={(e) => setSatelliteType(e.target.value)}
            label="Satellite Location"
          >
            <MenuItem value="Mann Center">Mann Center (Concert VIP)</MenuItem>
            <MenuItem value="Churro Bike">Churro Bike (Mobile)</MenuItem>
            <MenuItem value="Other">Other Location</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Custom Description"
          value={customDescription}
          onChange={(e) => setCustomDescription(e.target.value)}
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
          helperText="Describe the event and requirements"
        />

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            label="Expected Attendees"
            value={attendees}
            onChange={(e) => setAttendees(parseInt(e.target.value) || 0)}
            size="small"
            type="number"
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Setup Time"
            value={setupTime}
            onChange={(e) => setSetupTime(e.target.value)}
            size="small"
            type="time"
            InputLabelProps={{ shrink: true }}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        <TextField
          fullWidth
          label="Event Date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </Card>

      <SectionHeader>Customer Information</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold">
          {customer.name}
        </Typography>
        <Typography variant="caption" display="block">
          {customer.contactName}
        </Typography>
        <Typography variant="caption" display="block">
          {customer.contactEmail}
        </Typography>
        <Typography variant="caption" display="block">
          {customer.contactPhone}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" display="block">
          {customer.address.line1}
        </Typography>
        <Typography variant="caption" display="block">
          {customer.address.city}, {customer.address.state}{" "}
          {customer.address.zip}
        </Typography>
      </Card>

      <SectionHeader>Custom Items</SectionHeader>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold">
            Custom Rice Bowl Trays
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Large aluminum trays, serves {attendees}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Quantity:</TableCell>
                <TableCell align="right">
                  {Math.ceil(attendees / 50)} trays
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Est. Food Cost:</TableCell>
                <TableCell align="right">
                  ${(estimatedCost * 0.4).toFixed(2)} (40%)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Est. Labor:</TableCell>
                <TableCell align="right">3 hours ($75.00)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Delivery Fee:</TableCell>
                <TableCell align="right">$50.00 (satellite premium)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    ${(estimatedCost + 50).toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          📋 Toast KDS Routing
        </Typography>
        <Typography variant="caption" display="block">
          This order will appear on Catering KDS with tag: "{satelliteType}"
        </Typography>
      </Alert>

      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={<CheckCircle />}
        onClick={handleProcessOrder}
      >
        PROCESS SATELLITE ORDER
      </Button>
    </>
  );
};

export default ProcessSatelliteOrder;
