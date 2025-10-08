import React from "react";
import {
  Box,
  Paper,
  Divider,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  IconButton,
  Alert,
} from "@mui/material";
import { CheckCircle, Edit } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessOrderStep3 = ({
  setView,
  order,
  customer,
  handleProcessOrder,
}) => {
  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const utensilsTotal = order.utensils.included
    ? order.utensils.count * order.utensils.costPer
    : 0;
  const salesTax = customer.flags.taxExempt ? 0 : subtotal * 0.08;
  const total =
    subtotal +
    parseFloat(order.deliveryFee) +
    parseFloat(order.tip) +
    utensilsTotal +
    salesTax;

  const totalFoodCost = order.items.reduce(
    (acc, item) => acc + item.qty * item.estFoodCost,
    0
  );
  const totalLaborCost = order.items.reduce(
    (acc, item) => acc + item.qty * (item.estLaborHours * 25),
    0
  ); // Assuming $25/hr
  const grossProfit = subtotal - totalFoodCost - totalLaborCost;
  const estProfit = grossProfit - parseFloat(order.deliveryFee || 0);
  const estProfitPercent = (estProfit / subtotal) * 100 || 0;

  // Mock conflict for demonstration
  const conflict = true;

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep2")}>Back</BackButton>
      <Typography variant="h6">Step 3 of 3: Final Review</Typography>

      <Alert severity="info" sx={{ my: 2 }}>
        <Typography variant="caption" fontWeight="bold">
          📄 Processing will:
        </Typography>
        <Typography variant="caption" display="block">
          ✓ Generate HTML invoice (PDF)
        </Typography>
        <Typography variant="caption" display="block">
          ✓ Send to Toast KDS
        </Typography>
        <Typography variant="caption" display="block">
          ✓ Create HubSpot deal (with invoice PDF)
        </Typography>
        <Typography variant="caption" display="block">
          ✓ Record in QuickBooks
        </Typography>
        {customer.flags?.requiresPO && (
          <Typography
            variant="caption"
            display="block"
            color="warning.main"
            sx={{ mt: 0.5 }}
          >
            ⚠️ Preliminary invoice only - awaiting PO
          </Typography>
        )}
      </Alert>

      <SectionHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          Delivery Information
          <IconButton size="small" onClick={() => setView("processOrderStep1")}>
            <Edit fontSize="inherit" />
          </IconButton>
        </Box>
      </SectionHeader>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography fontWeight="bold">{customer.name}</Typography>
        <Typography variant="body2">{customer.contactName}</Typography>
        <Typography variant="body2">
          {customer.address.line1}, {customer.address.line2}
        </Typography>
        <Typography variant="body2">
          {customer.address.city}, {customer.address.state}{" "}
          {customer.address.zip}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            📅 May 20, 2025 at 12:30 PM
          </Typography>
          <Alert severity={conflict ? "error" : "success"} sx={{ p: "0 8px" }}>
            {conflict ? "Conflict" : "No Conflict"}
          </Alert>
        </Box>
      </Paper>
      <SectionHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          Order Summary
          <IconButton size="small" onClick={() => setView("processOrderStep2")}>
            <Edit fontSize="inherit" />
          </IconButton>
        </Box>
      </SectionHeader>
      <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.qty}</TableCell>
                <TableCell>{i.matchedItem}</TableCell>
                <TableCell align="right">
                  ${(i.qty * i.unitPrice).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Divider />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Typography fontWeight="bold">Items Subtotal</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">
                  ${subtotal.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                Delivery Fee
              </TableCell>
              <TableCell align="right">
                ${parseFloat(order.deliveryFee).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                Tip
              </TableCell>
              <TableCell align="right">
                ${parseFloat(order.tip).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                Utensils ({order.utensils.count} sets)
              </TableCell>
              <TableCell align="right">${utensilsTotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                Sales Tax
              </TableCell>
              <TableCell align="right">
                {customer.flags.taxExempt
                  ? "Exempt"
                  : `$${salesTax.toFixed(2)}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Divider />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Typography fontWeight="bold">Grand Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        sx={{ mt: 2 }}
        startIcon={<CheckCircle />}
        onClick={handleProcessOrder}
      >
        PROCESS ORDER
      </Button>
    </>
  );
};

export default ProcessOrderStep3;
