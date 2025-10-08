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
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
} from "@mui/material";
import { CheckCircle, Satellite, Person, Add } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessSatelliteOrder = ({ setView, handleProcessOrder, customer }) => {
  const [satelliteType, setSatelliteType] = useState("Mann Center");

  // Staff data (from ADP payroll system)
  const staffMembers = [
    {
      id: 1,
      name: "Sofia",
      role: "Owner/Manager",
      hourlyRate: 35,
      available: true,
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Lead Chef",
      hourlyRate: 25,
      available: true,
    },
    { id: 3, name: "Oso", role: "Prep Cook", hourlyRate: 18, available: true },
    { id: 4, name: "Anna", role: "Server", hourlyRate: 30, available: true },
    { id: 5, name: "Leo", role: "Prep Cook", hourlyRate: 18, available: true },
    {
      id: 6,
      name: "James Chen",
      role: "Prep Cook",
      hourlyRate: 18,
      available: true,
    },
    {
      id: 7,
      name: "Sarah Johnson",
      role: "Server",
      hourlyRate: 15,
      available: false,
    },
    {
      id: 8,
      name: "David Lee",
      role: "Server",
      hourlyRate: 15,
      available: true,
    },
  ];

  // Available inventory items with MarginEdge costs
  const inventoryItems = [
    { id: 1, name: "Rice Bowl Trays (serves 50)", cost: 35.0, unit: "tray" },
    { id: 2, name: "Pork Trays (serves 50)", cost: 40.0, unit: "tray" },
    { id: 3, name: "Chicken Trays (serves 50)", cost: 38.0, unit: "tray" },
    { id: 4, name: "Taco Bar Kit (serves 20)", cost: 45.0, unit: "kit" },
    { id: 5, name: "Chip Bags", cost: 5.0, unit: "bag" },
    { id: 6, name: "Bottled Water", cost: 0.5, unit: "bottle" },
    { id: 7, name: "Horchata (gallon)", cost: 8.0, unit: "gallon" },
    { id: 8, name: "Plantain Chips", cost: 3.0, unit: "bag" },
    { id: 9, name: "Utensil Packs", cost: 0.15, unit: "pack" },
    { id: 10, name: "Napkins (50ct)", cost: 2.0, unit: "pack" },
  ];

  // Common state
  const [assignedStaff, setAssignedStaff] = useState([]);
  const [bonusEnabled, setBonusEnabled] = useState(false);
  const [bonusType, setBonusType] = useState("fixed"); // fixed or percentage
  const [bonusAmount, setBonusAmount] = useState(50);
  const [selectedItems, setSelectedItems] = useState([]);

  // Mann Center specific
  const [mannDate, setMannDate] = useState("2025-10-20");
  const [mannTime, setMannTime] = useState("17:00");
  const [mannAttendees, setMannAttendees] = useState(500);

  // Marketing Event specific
  const [marketingDate, setMarketingDate] = useState("2025-10-15");
  const [marketingTime, setMarketingTime] = useState("10:00");
  const [marketingLocation, setMarketingLocation] = useState("");
  const [marketingEventName, setMarketingEventName] = useState("");
  const [marketingDuration, setMarketingDuration] = useState(4);

  // Farmer's Market specific
  const [farmersDate, setFarmersDate] = useState("2025-10-19");
  const [farmersTime, setFarmersTime] = useState("08:00");
  const [farmersMarketName, setFarmersMarketName] = useState(
    "Clark Park Farmers Market"
  );
  const [farmersDuration, setFarmersDuration] = useState(5);

  // Churro Bike specific (like regular catering)
  const [churroCustomer, setChurroCustomer] = useState(customer?.name || "");
  const [churroContactName, setChurroContactName] = useState(
    customer?.contactName || ""
  );
  const [churroContactEmail, setChurroContactEmail] = useState(
    customer?.contactEmail || ""
  );
  const [churroContactPhone, setChurroContactPhone] = useState(
    customer?.contactPhone || ""
  );
  const [churroAddress, setChurroAddress] = useState(
    customer?.address?.line1 || ""
  );
  const [churroCity, setChurroCity] = useState(
    customer?.address?.city || "Philadelphia"
  );
  const [churroState, setChurroState] = useState(
    customer?.address?.state || "PA"
  );
  const [churroZip, setChurroZip] = useState(customer?.address?.zip || "");
  const [churroDate, setChurroDate] = useState("2025-10-25");
  const [churroTime, setChurroTime] = useState("14:00");
  const [churroHours, setChurroHours] = useState(3);
  const [churroAttendees, setChurroAttendees] = useState(150);
  const [preMakeChurros, setPreMakeChurros] = useState(false);

  // Calculate costs
  const itemsTotal = selectedItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );

  const staffCost = assignedStaff.reduce((acc, staff) => {
    return acc + staff.hourlyRate * staff.hours;
  }, 0);

  const bonusCost = bonusEnabled
    ? bonusType === "fixed"
      ? bonusAmount * assignedStaff.length
      : (itemsTotal + staffCost) * (bonusAmount / 100)
    : 0;

  const churroPrice = churroHours * 200; // $200/hour for churro bike
  const deliveryFee = satelliteType === "Churro Bike" ? 0 : 50; // No delivery fee for churro bike (on-site)

  const grandTotal =
    satelliteType === "Churro Bike"
      ? churroPrice
      : itemsTotal + staffCost + bonusCost + deliveryFee;

  const handleAddStaff = (staffId) => {
    const staff = staffMembers.find((s) => s.id === staffId);
    if (!staff) return;

    const defaultHours =
      satelliteType === "Mann Center"
        ? 6
        : satelliteType === "Marketing Event"
        ? marketingDuration
        : satelliteType === "Farmer's Market"
        ? farmersDuration
        : churroHours;

    const newStaffMember = {
      id: staff.id,
      name: staff.name,
      role: staff.role,
      hourlyRate: staff.hourlyRate,
      hours: defaultHours,
    };

    setAssignedStaff([...assignedStaff, newStaffMember]);
  };

  const handleRemoveStaff = (staffId) => {
    setAssignedStaff(assignedStaff.filter((s) => s.id !== staffId));
  };

  const handleUpdateStaffHours = (staffId, hours) => {
    setAssignedStaff(
      assignedStaff.map((s) =>
        s.id === staffId ? { ...s, hours: parseFloat(hours) || 0 } : s
      )
    );
  };

  const handleAddItem = (itemId) => {
    const item = inventoryItems.find((i) => i.id === itemId);
    if (!item) return;

    setSelectedItems([
      ...selectedItems,
      {
        id: item.id,
        name: item.name,
        cost: item.cost,
        unit: item.unit,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== itemId));
  };

  const handleUpdateItemQuantity = (itemId, quantity) => {
    setSelectedItems(
      selectedItems.map((i) =>
        i.id === itemId ? { ...i, quantity: parseFloat(quantity) || 0 } : i
      )
    );
  };

  const renderStaffAssignment = () => {
    const availableStaff = staffMembers.filter(
      (sm) => sm.available && !assignedStaff.find((as) => as.id === sm.id)
    );

    return (
      <>
        <SectionHeader>
          <Person sx={{ mr: 1 }} />
          Staff Assignment (ADP)
        </SectionHeader>
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          {assignedStaff.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {assignedStaff.map((staff) => (
                <Box
                  key={staff.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    p: 1,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {staff.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {staff.role} • ${staff.hourlyRate}/hr
                    </Typography>
                  </Box>
                  <TextField
                    size="small"
                    label="Hours"
                    value={staff.hours}
                    onChange={(e) =>
                      handleUpdateStaffHours(staff.id, e.target.value)
                    }
                    type="number"
                    inputProps={{ min: 0, step: 0.5 }}
                    sx={{ width: 100 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ width: 70, textAlign: "right" }}
                  >
                    ${(staff.hourlyRate * staff.hours).toFixed(2)}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveStaff(staff.id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  Total Staff Cost:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  ${staffCost.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}

          {availableStaff.length > 0 ? (
            <Autocomplete
              options={availableStaff}
              getOptionLabel={(option) =>
                `${option.name} - ${option.role} ($${option.hourlyRate}/hr)`
              }
              onChange={(event, value) => {
                if (value) {
                  handleAddItem(value.id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Staff Member"
                  size="small"
                  placeholder="Search by name or role..."
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.role} • ${option.hourlyRate}/hr
                    </Typography>
                  </Box>
                </li>
              )}
            />
          ) : (
            <Alert severity="warning">
              <Typography variant="caption">
                No more available staff for this date
              </Typography>
            </Alert>
          )}

          {assignedStaff.length === 0 && (
            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography variant="caption">
                💡 Tip: Assign staff to this event for accurate labor costing
              </Typography>
            </Alert>
          )}

          {/* Bonus Section */}
          {assignedStaff.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bonusEnabled}
                    onChange={(e) => setBonusEnabled(e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight="bold">
                    Add Staff Bonus
                  </Typography>
                }
              />

              {bonusEnabled && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#FFF8E1", borderRadius: 1 }}>
                  <RadioGroup
                    value={bonusType}
                    onChange={(e) => setBonusType(e.target.value)}
                  >
                    <FormControlLabel
                      value="fixed"
                      control={<Radio size="small" />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2">
                            Fixed amount per staff:
                          </Typography>
                          {bonusType === "fixed" && (
                            <TextField
                              size="small"
                              value={bonusAmount}
                              onChange={(e) =>
                                setBonusAmount(parseFloat(e.target.value) || 0)
                              }
                              type="number"
                              sx={{ width: 100 }}
                              InputProps={{ startAdornment: "$" }}
                            />
                          )}
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="percentage"
                      control={<Radio size="small" />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Typography variant="body2">
                            Percentage of total:
                          </Typography>
                          {bonusType === "percentage" && (
                            <TextField
                              size="small"
                              value={bonusAmount}
                              onChange={(e) =>
                                setBonusAmount(parseFloat(e.target.value) || 0)
                              }
                              type="number"
                              sx={{ width: 100 }}
                              InputProps={{ endAdornment: "%" }}
                            />
                          )}
                        </Box>
                      }
                    />
                  </RadioGroup>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      Total Bonus:
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      ${bonusCost.toFixed(2)}
                    </Typography>
                  </Box>
                  {bonusType === "fixed" && (
                    <Typography variant="caption" color="text.secondary">
                      ${bonusAmount.toFixed(2)} × {assignedStaff.length} staff
                    </Typography>
                  )}
                </Box>
              )}
            </>
          )}
        </Card>
      </>
    );
  };

  const renderItemsSelection = () => {
    const availableItems = inventoryItems.filter(
      (item) => !selectedItems.find((si) => si.id === item.id)
    );

    return (
      <>
        <SectionHeader>Items (MarginEdge Costs)</SectionHeader>
        <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
          {selectedItems.length > 0 && (
            <Box sx={{ mb: 2 }}>
              {selectedItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                    p: 1,
                    bgcolor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cost: ${item.cost.toFixed(2)}/{item.unit}
                    </Typography>
                  </Box>
                  <TextField
                    size="small"
                    label="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateItemQuantity(item.id, e.target.value)
                    }
                    type="number"
                    inputProps={{ min: 0, step: 1 }}
                    sx={{ width: 100 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ width: 70, textAlign: "right" }}
                  >
                    ${(item.cost * item.quantity).toFixed(2)}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  Total Items Cost:
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  ${itemsTotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}

          {availableItems.length > 0 ? (
            <Autocomplete
              options={availableItems}
              getOptionLabel={(option) =>
                `${option.name} - $${option.cost}/${option.unit}`
              }
              onChange={(event, value) => {
                if (value) {
                  handleAddItem(value.id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Item"
                  size="small"
                  placeholder="Search inventory..."
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box>
                    <Typography variant="body2">{option.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Cost: ${option.cost.toFixed(2)}/{option.unit}
                    </Typography>
                  </Box>
                </li>
              )}
            />
          ) : (
            <Alert severity="info">
              <Typography variant="caption">
                All available items added
              </Typography>
            </Alert>
          )}

          {selectedItems.length === 0 && (
            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography variant="caption">
                💡 Select items from inventory to bring to this event
              </Typography>
            </Alert>
          )}
        </Card>
      </>
    );
  };

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

      {renderItemsSelection()}
      {renderStaffAssignment()}
    </>
  );

  const renderMarketingEventForm = () => (
    <>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Marketing Event Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              value={marketingEventName}
              onChange={(e) => setMarketingEventName(e.target.value)}
              size="small"
              placeholder="e.g., Campus Food Festival"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              value={marketingLocation}
              onChange={(e) => setMarketingLocation(e.target.value)}
              size="small"
              placeholder="Enter event address"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Event Date"
              value={marketingDate}
              onChange={(e) => setMarketingDate(e.target.value)}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              value={marketingTime}
              onChange={(e) => setMarketingTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duration (hours)"
              value={marketingDuration}
              onChange={(e) =>
                setMarketingDuration(parseInt(e.target.value) || 0)
              }
              size="small"
              type="number"
              helperText="How long will the event last?"
            />
          </Grid>
        </Grid>
      </Card>

      {renderItemsSelection()}
      {renderStaffAssignment()}
    </>
  );

  const renderFarmersMarketForm = () => (
    <>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Farmer's Market Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Market</InputLabel>
              <Select
                value={farmersMarketName}
                onChange={(e) => setFarmersMarketName(e.target.value)}
                label="Market"
              >
                <MenuItem value="Clark Park Farmers Market">
                  Clark Park Farmers Market
                </MenuItem>
                <MenuItem value="Headhouse Square">Headhouse Square</MenuItem>
                <MenuItem value="Rittenhouse Square">
                  Rittenhouse Square
                </MenuItem>
                <MenuItem value="Reading Terminal Market">
                  Reading Terminal Market
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Market Date"
              value={farmersDate}
              onChange={(e) => setFarmersDate(e.target.value)}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              value={farmersTime}
              onChange={(e) => setFarmersTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duration (hours)"
              value={farmersDuration}
              onChange={(e) =>
                setFarmersDuration(parseInt(e.target.value) || 0)
              }
              size="small"
              type="number"
              helperText="Typical farmers market: 4-6 hours"
            />
          </Grid>
        </Grid>
      </Card>

      {renderItemsSelection()}
      {renderStaffAssignment()}
    </>
  );

  const renderChurroBikeForm = () => (
    <>
      <SectionHeader>Customer & Contact Information</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              value={churroCustomer}
              onChange={(e) => setChurroCustomer(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              value={churroContactName}
              onChange={(e) => setChurroContactName(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={churroContactEmail}
              onChange={(e) => setChurroContactEmail(e.target.value)}
              size="small"
              type="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              value={churroContactPhone}
              onChange={(e) => setChurroContactPhone(e.target.value)}
              size="small"
              type="tel"
            />
          </Grid>
        </Grid>
      </Card>

      <SectionHeader>Event Location</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={churroAddress}
              onChange={(e) => setChurroAddress(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              value={churroCity}
              onChange={(e) => setChurroCity(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="State"
              value={churroState}
              onChange={(e) => setChurroState(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="ZIP"
              value={churroZip}
              onChange={(e) => setChurroZip(e.target.value)}
              size="small"
            />
          </Grid>
        </Grid>
      </Card>

      <SectionHeader>Event Details</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
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
    </>
  );

  const renderSummary = () => {
    if (satelliteType === "Churro Bike") {
      return (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    Churro Bike Rental ({churroHours} hours)
                  </TableCell>
                  <TableCell align="right">${churroPrice.toFixed(2)}</TableCell>
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
                  <TableCell colSpan={2}>
                    <Divider sx={{ my: 0.5 }} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Total:</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold" color="primary">
                      ${churroPrice.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    }
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Cost Summary
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="caption" fontWeight="bold">
                    Items ({selectedItems.length})
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption">
                    ${itemsTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
              {selectedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ pl: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                      • {item.name} ({item.quantity})
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      ${(item.cost * item.quantity).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}

              {assignedStaff.length > 0 && (
                <>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Divider sx={{ my: 0.5 }} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" fontWeight="bold">
                        Staff Cost ({assignedStaff.length} assigned)
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="caption">
                        ${staffCost.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {assignedStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell sx={{ pl: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                          • {staff.name} ({staff.hours}h)
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="caption" color="text.secondary">
                          ${(staff.hourlyRate * staff.hours).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}

              {bonusEnabled && bonusCost > 0 && (
                <>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Divider sx={{ my: 0.5 }} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="caption" fontWeight="bold">
                        Staff Bonus
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="caption" color="warning.main">
                        ${bonusCost.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </>
              )}

              <TableRow>
                <TableCell>Delivery/Setup Fee</TableCell>
                <TableCell align="right">${deliveryFee.toFixed(2)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Divider sx={{ my: 0.5 }} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Grand Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary">
                    ${grandTotal.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
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
          {assignedStaff.length > 0 &&
            " Staff assignments sync with ADP payroll."}
        </Typography>
      </Alert>

      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Satellite Type</InputLabel>
        <Select
          value={satelliteType}
          onChange={(e) => {
            setSatelliteType(e.target.value);
            setAssignedStaff([]);
            setSelectedItems([]);
            setBonusEnabled(false);
          }}
          label="Satellite Type"
        >
          <MenuItem value="Mann Center">🎵 Mann Center (Concert VIP)</MenuItem>
          <MenuItem value="Marketing Event">📣 Marketing Event</MenuItem>
          <MenuItem value="Farmer's Market">🌾 Farmer's Market</MenuItem>
          <MenuItem value="Churro Bike">🚲 Churro Bike (Mobile Event)</MenuItem>
        </Select>
      </FormControl>

      {satelliteType === "Mann Center" && renderMannCenterForm()}
      {satelliteType === "Marketing Event" && renderMarketingEventForm()}
      {satelliteType === "Farmer's Market" && renderFarmersMarketForm()}
      {satelliteType === "Churro Bike" && renderChurroBikeForm()}

      {renderSummary()}

      <Alert severity="warning" sx={{ mb: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          📋 Toast KDS Routing
        </Typography>
        <Typography variant="caption" display="block">
          This order will appear on Catering KDS tagged: "{satelliteType}"
        </Typography>
        {assignedStaff.length > 0 && (
          <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
            👥 Staff scheduled: {assignedStaff.map((s) => s.name).join(", ")}
          </Typography>
        )}
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
