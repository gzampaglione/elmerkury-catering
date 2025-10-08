import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Card,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { STAFF_MEMBERS } from "../../data/dummyData";
import SectionHeader from "../SectionHeader";

const StaffSelector = ({
  assignedStaff,
  setAssignedStaff,
  bonusEnabled,
  setBonusEnabled,
  bonusType,
  setBonusType,
  bonusAmount,
  setBonusAmount,
  showBonus = true,
  defaultHours = 6,
}) => {
  const handleAddStaff = (staffId) => {
    const staff = STAFF_MEMBERS.find((s) => s.id === staffId);
    if (!staff) return;

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

  const staffCost = assignedStaff.reduce((acc, staff) => {
    return acc + staff.hourlyRate * staff.hours;
  }, 0);

  const availableStaff = STAFF_MEMBERS.filter(
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
                handleAddStaff(value.id);
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
        {showBonus && assignedStaff.length > 0 && (
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
              </Box>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default StaffSelector;
