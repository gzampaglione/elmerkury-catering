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
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { CheckCircle, Satellite } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessSatelliteOrder = ({ setView, handleProcessOrder }) => {
  const [satelliteType, setSatelliteType] = useState("Mann Center");

  // Mann Center specific
  const [mannDate, setMannDate] = useState("2025-10-20");
  const [mannTime, setMannTime] = useState("17:00");
  const [mannAttendees, setMannAttendees] = useState(500);
  const [mannRiceTrays, setMannRiceTrays] = useState(10);
  const [mannPorkTrays, setMannPorkTrays] = useState(8);
  const [mannChips, setMannChips] = useState(5);
  const [mannWater, setMannWater] = useState(100);

  // Churro Bike specific
  const [churroHours, setChurroHours] = useState(3);
  const [churroAttendees, setChurroAttendees] = useState(150);
  const [preMakeChurros, setPreMakeChurros] = useState(false);
  const [churroDate, setChurroDate] = useState("2025-10-25");
  const [churroTime, setChurroTime] = useState("14:00");
  const [churroLocation, setChurroLocation] = useState("");
  const [churroContact, setChurroContact] = useState("");

  // Calculate costs
  const mannTotalCost =
    mannRiceTrays * 85 +
    mannPorkTrays * 90 +
    mannChips * 25 +
    mannWater * 1.5 +
    50; // +50 delivery
  const churroTotalCost = churroHours * 200; // $200/hour base rate

  const renderMannCenterForm = () => (
    <>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Mann Center VIP Tent
        </Typography>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          5201 Parkside Avenue, Philadelphia, PA 19131
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Event Date"
              value={mannDate}
              onChange={(e) => setMannDate(e.target.value)}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Setup Time"
              value={mannTime}
              onChange={(e) => setMannTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              helperText="Ready before concert"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Expected Attendees"
              value={mannAttendees}
              onChange={(e) => setMannAttendees(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
            />
          </Grid>
        </Grid>
      </Card>

      <SectionHeader>Menu Items (Custom Trays)</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="body2">
              Rice Bowl Trays (serves 50 each)
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={mannRiceTrays}
              onChange={(e) => setMannRiceTrays(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              InputProps={{ startAdornment: "×" }}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body2">Pork Trays (serves 50 each)</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={mannPorkTrays}
              onChange={(e) => setMannPorkTrays(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              InputProps={{ startAdornment: "×" }}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body2">Chip Bags</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={mannChips}
              onChange={(e) => setMannChips(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              InputProps={{ startAdornment: "×" }}
            />
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body2">Bottled Water</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={mannWater}
              onChange={(e) => setMannWater(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              InputProps={{ startAdornment: "×" }}
            />
          </Grid>
        </Grid>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Rice Trays ({mannRiceTrays})</TableCell>
                <TableCell align="right">
                  ${(mannRiceTrays * 85).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pork Trays ({mannPorkTrays})</TableCell>
                <TableCell align="right">
                  ${(mannPorkTrays * 90).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chips ({mannChips})</TableCell>
                <TableCell align="right">
                  ${(mannChips * 25).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Water ({mannWater})</TableCell>
                <TableCell align="right">
                  ${(mannWater * 1.5).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Delivery Fee (satellite)</TableCell>
                <TableCell align="right">$50.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    ${mannTotalCost.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderChurroBikeForm = () => (
    <>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Churro Bike Event Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Event Date"
              value={churroDate}
              onChange={(e) => setChurroDate(e.target.value)}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              value={churroTime}
              onChange={(e) => setChurroTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              value={churroLocation}
              onChange={(e) => setChurroLocation(e.target.value)}
              size="small"
              placeholder="Enter event address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              value={churroContact}
              onChange={(e) => setChurroContact(e.target.value)}
              size="small"
              placeholder="Name and phone"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hours Needed"
              value={churroHours}
              onChange={(e) => setChurroHours(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              helperText="$200/hour"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expected Attendees"
              value={churroAttendees}
              onChange={(e) =>
                setChurroAttendees(parseInt(e.target.value) || 0)
              }
              size="small"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preMakeChurros}
                  onChange={(e) => setPreMakeChurros(e.target.checked)}
                />
              }
              label="Pre-make churros (for faster service)"
            />
          </Grid>
        </Grid>
      </Card>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Churro Bike Rental ({churroHours} hours)</TableCell>
                <TableCell align="right">
                  ${churroTotalCost.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expected Attendees</TableCell>
                <TableCell align="right">{churroAttendees} people</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Service Type</TableCell>
                <TableCell align="right">
                  {preMakeChurros ? "Pre-made" : "Made on-site"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">
                    ${churroTotalCost.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

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
        </Typography>
      </Alert>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Satellite Type</InputLabel>
        <Select
          value={satelliteType}
          onChange={(e) => setSatelliteType(e.target.value)}
          label="Satellite Type"
        >
          <MenuItem value="Mann Center">🎵 Mann Center (Concert VIP)</MenuItem>
          <MenuItem value="Churro Bike">🚲 Churro Bike (Mobile Event)</MenuItem>
        </Select>
      </FormControl>

      {satelliteType === "Mann Center" && renderMannCenterForm()}
      {satelliteType === "Churro Bike" && renderChurroBikeForm()}

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          📋 Toast KDS Routing
        </Typography>
        <Typography variant="caption" display="block">
          This order will appear on Catering KDS tagged: "{satelliteType}"
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
