import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Box,
} from "@mui/material";

const OrderSummary = ({ satelliteType, orderData }) => {
  const {
    assignedStaff,
    selectedItems,
    bonusEnabled,
    bonusType,
    bonusAmount,
    churroHours,
  } = orderData;

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

  const churroPrice = (churroHours || 3) * 200;
  const deliveryFee = satelliteType === "Churro Bike" ? 0 : 50;

  const subtotal =
    satelliteType === "Churro Bike" ? churroPrice : itemsTotal + deliveryFee;

  const grandTotal =
    satelliteType === "Churro Bike"
      ? churroPrice
      : itemsTotal + staffCost + bonusCost + deliveryFee;

  if (satelliteType === "Churro Bike") {
    return (
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Invoice Summary
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  Churro Bike Rental ({churroHours || 3} hours)
                </TableCell>
                <TableCell align="right">${churroPrice.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Divider sx={{ my: 0.5 }} />
                </TableCell>
              </TableRow>
              <TableRow sx={{ bgcolor: "#E3F2FD" }}>
                <TableCell>
                  <Typography fontWeight="bold">Invoice Total:</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold" color="primary">
                    ${churroPrice.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Staff costs shown separately for Churro Bike */}
          {assignedStaff.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="caption"
                fontWeight="bold"
                display="block"
                gutterBottom
              >
                Staff Costs (Not Included in Invoice)
              </Typography>
              <Box sx={{ bgcolor: "#FFF8E1", p: 1, borderRadius: 1 }}>
                {assignedStaff.map((staff) => (
                  <Box
                    key={staff.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="caption">
                      {staff.name} ({staff.hours}h)
                    </Typography>
                    <Typography variant="caption">
                      ${(staff.hourlyRate * staff.hours).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 0.5 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="caption" fontWeight="bold">
                    Total Staff Cost:
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    ${staffCost.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
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
            <TableRow sx={{ bgcolor: "#E3F2FD" }}>
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

export default OrderSummary;
