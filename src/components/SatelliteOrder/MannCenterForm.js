import React, { useState } from "react";
import { Card, TextField, Grid, Typography } from "@mui/material";
import ItemsSelector from "./ItemsSelector";
import StaffSelector from "./StaffSelector";

const MannCenterForm = ({ orderData, setOrderData }) => {
  const [date, setDate] = useState("2025-10-20");
  const [time, setTime] = useState("17:00");
  const [attendees, setAttendees] = useState(500);

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
              label="Setup Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value) || 0)}
              size="small"
              type="number"
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
        defaultHours={6}
      />
    </>
  );
};

export default MannCenterForm;
