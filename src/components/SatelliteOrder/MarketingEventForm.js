import React, { useState } from "react";
import { Card, TextField, Grid, Typography } from "@mui/material";
import ItemsSelector from "./ItemsSelector";
import StaffSelector from "./StaffSelector";

const MarketingEventForm = ({ orderData, setOrderData }) => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("2025-10-15");
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(4);

  return (
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
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              size="small"
              placeholder="e.g., Campus Food Festival"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              size="small"
              placeholder="Enter event address"
            />
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duration (hours)"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
              helperText="How long will the event last?"
            />
          </Grid>
        </Grid>
      </Card>

      <ItemsSelector
        selectedItems={orderData.selectedItems}
        setSelectedItems={(items) =>
          setOrderData({ ...orderData, selectedItems: items })
        }
      />

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
        defaultHours={duration}
      />
    </>
  );
};

export default MarketingEventForm;
