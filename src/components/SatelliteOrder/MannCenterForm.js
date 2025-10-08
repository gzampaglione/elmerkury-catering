import React, { useState } from "react";
import { Card, TextField, Grid, Typography, Box, Divider } from "@mui/material";
import ItemsSelector from "./ItemsSelector";
import StaffSelector from "./StaffSelector";

const MannCenterForm = ({ orderData, setOrderData }) => {
  const [date, setDate] = useState("2025-10-20");
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("22:00");
  const [attendees, setAttendees] = useState(500);

  // Calculate total hours between start and end time
  const calculateTotalHours = () => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    let diffMinutes = endMinutes - startMinutes;

    // Handle overnight events (end time is next day)
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }

    return (diffMinutes / 60).toFixed(1);
  };

  const totalHours = calculateTotalHours();

  return (
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
              label="Expected Attendees"
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              helperText="Setup begins"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
              helperText="Event ends"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ bgcolor: "#E3F2FD", p: 1.5, borderRadius: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Total Staff Hours:
            </Typography>
            <Typography variant="h6" color="primary.main">
              {totalHours} hours
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {startTime} - {endTime}
          </Typography>
        </Box>
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
        defaultHours={parseFloat(totalHours)}
      />
    </>
  );
};

export default MannCenterForm;
