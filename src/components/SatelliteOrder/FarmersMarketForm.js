import React, { useState } from "react";
import {
  Card,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ItemsSelector from "./ItemsSelector";
import StaffSelector from "./StaffSelector";

const FarmersMarketForm = ({ orderData, setOrderData }) => {
  const [marketName, setMarketName] = useState("Clark Park Farmers Market");
  const [date, setDate] = useState("2025-10-19");
  const [time, setTime] = useState("08:00");
  const [duration, setDuration] = useState(5);

  return (
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
                value={marketName}
                onChange={(e) => setMarketName(e.target.value)}
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
              helperText="Typical farmers market: 4-6 hours"
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

export default FarmersMarketForm;
