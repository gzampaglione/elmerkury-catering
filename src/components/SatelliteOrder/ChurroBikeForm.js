import React, { useState } from "react";
import {
  Card,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Box,
} from "@mui/material";
import SectionHeader from "../SectionHeader";
import StaffSelector from "./StaffSelector";

const ChurroBikeForm = ({ orderData, setOrderData, customer }) => {
  const [customerName, setCustomerName] = useState(customer?.name || "");
  const [contactName, setContactName] = useState(customer?.contactName || "");
  const [contactEmail, setContactEmail] = useState(
    customer?.contactEmail || ""
  );
  const [contactPhone, setContactPhone] = useState(
    customer?.contactPhone || ""
  );
  const [address, setAddress] = useState(customer?.address?.line1 || "");
  const [city, setCity] = useState(customer?.address?.city || "Philadelphia");
  const [state, setState] = useState(customer?.address?.state || "PA");
  const [zip, setZip] = useState(customer?.address?.zip || "");
  const [date, setDate] = useState("2025-10-25");
  const [time, setTime] = useState("14:00");
  const [hours, setHours] = useState(3);
  const [attendees, setAttendees] = useState(150);
  const [preMake, setPreMake] = useState(false);

  return (
    <>
      <SectionHeader>Customer & Contact Information</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              size="small"
              type="email"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hours Needed"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              helperText="$200/hour"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expected Attendees"
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={preMake}
                  onChange={(e) => setPreMake(e.target.checked)}
                />
              }
              label="Pre-make churros (for faster service)"
            />
          </Grid>
        </Grid>
      </Card>

      <StaffSelector
        assignedStaff={orderData.assignedStaff}
        setAssignedStaff={(staff) =>
          setOrderData({ ...orderData, assignedStaff: staff })
        }
        bonusEnabled={orderData.bonusEnabled}
        setBonusEnabled={(enabled) =>
          setOrderData({ ...orderData, bonusEnabled: enabled })
        }
        bonusType={orderData.bonusType}
        setBonusType={(type) => setOrderData({ ...orderData, bonusType: type })}
        bonusAmount={orderData.bonusAmount}
        setBonusAmount={(amount) =>
          setOrderData({ ...orderData, bonusAmount: amount })
        }
        showBonus={false}
        defaultHours={hours}
      />

      {/* Store hours in orderData for calculations */}
      {setOrderData({ ...orderData, churroHours: hours })}
    </>
  );
};

export default ChurroBikeForm;
