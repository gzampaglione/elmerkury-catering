import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TextField,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Edit, ArrowForwardIos, Add } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";
import Step2_ItemCard from "./Step2_ItemCard";
import Step2_VolumeDiscount from "./Step2_VolumeDiscount";

const ProcessOrderStep2 = ({ setView, order: initialOrder, customer }) => {
  const [order] = useState(initialOrder);
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(initialOrder.tip);
  const [isEditingTip, setIsEditingTip] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(initialOrder.deliveryFee);
  const [isEditingDeliveryFee, setIsEditingDeliveryFee] = useState(false);
  const [isTaxExempt, setIsTaxExempt] = useState(
    customer.flags?.taxExempt || false
  );

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );

  const utensilsTotal = order.utensils.included
    ? order.utensils.count * order.utensils.costPer
    : 0;

  const salesTax = isTaxExempt ? 0 : (subtotal - discount) * 0.08;
  const finalSubtotal = subtotal - discount;
  const total = finalSubtotal + utensilsTotal + deliveryFee + tip + salesTax;

  // MarginEdge totals
  const totalFoodCost = order.items.reduce(
    (acc, item) => acc + item.qty * (item.marginEdge?.foodCost || 0),
    0
  );
  const totalLaborCost = order.items.reduce(
    (acc, item) => acc + item.qty * (item.marginEdge?.laborCost || 0),
    0
  );
  const grossProfit = finalSubtotal - totalFoodCost - totalLaborCost;
  const grossProfitPercent = (grossProfit / finalSubtotal) * 100 || 0;

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>

      <SectionHeader>Items Ordered ({order.items.length})</SectionHeader>
      {order.items.map((item) => (
        <Step2_ItemCard key={item.id} item={item} showProfitability={false} />
      ))}
      <Button startIcon={<Add />} size="small" sx={{ mt: 1 }}>
        Add Item
      </Button>

      {/* Volume Discount - Moved Above Pricing */}
      <Step2_VolumeDiscount
        customer={customer}
        subtotal={subtotal}
        total={total}
        estProfit={grossProfit}
        discount={discount}
        finalSubtotal={finalSubtotal}
        setDiscount={setDiscount}
      />

      {/* Pricing Summary */}
      <SectionHeader>Pricing Summary</SectionHeader>
      <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Items Subtotal</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">
                  ${subtotal.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            {discount > 0 && (
              <TableRow>
                <TableCell>
                  <Typography color="success.main">Loyalty Discount</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography color="success.main">
                    - ${discount.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Utensils ({order.utensils.count} sets)</TableCell>
              <TableCell align="right">${utensilsTotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => setIsEditingTip(!isEditingTip)}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                  Tip
                </Box>
              </TableCell>
              <TableCell align="right">
                {isEditingTip ? (
                  <TextField
                    value={tip}
                    onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                    size="small"
                    type="number"
                    sx={{ width: 80 }}
                    InputProps={{ startAdornment: "$" }}
                    onBlur={() => setIsEditingTip(false)}
                    autoFocus
                  />
                ) : (
                  `$${tip.toFixed(2)}`
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() =>
                      setIsEditingDeliveryFee(!isEditingDeliveryFee)
                    }
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                  Delivery Fee
                </Box>
              </TableCell>
              <TableCell align="right">
                {isEditingDeliveryFee ? (
                  <TextField
                    value={deliveryFee}
                    onChange={(e) =>
                      setDeliveryFee(parseFloat(e.target.value) || 0)
                    }
                    size="small"
                    type="number"
                    sx={{ width: 80 }}
                    InputProps={{ startAdornment: "$" }}
                    onBlur={() => setIsEditingDeliveryFee(false)}
                    autoFocus
                  />
                ) : (
                  `$${deliveryFee.toFixed(2)}`
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => setIsTaxExempt(!isTaxExempt)}
                  >
                    <Typography
                      variant="caption"
                      sx={{ border: "1px solid", px: 0.5, borderRadius: 1 }}
                    >
                      {isTaxExempt ? "Exempt" : "NA"}
                    </Typography>
                  </IconButton>
                  Sales Tax (8%)
                </Box>
              </TableCell>
              <TableCell align="right">
                {isTaxExempt ? (
                  <Chip label="Tax Exempt" size="small" color="success" />
                ) : (
                  `$${salesTax.toFixed(2)}`
                )}
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell>
                <Typography variant="h6">Grand Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* MarginEdge Order Profitability */}
      <Card variant="outlined" sx={{ mb: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            📊 Order Profitability (MarginEdge)
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2">Revenue:</Typography>
            <Typography variant="body2" fontWeight="bold">
              ${finalSubtotal.toFixed(2)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2">Total Food Cost:</Typography>
            <Typography variant="body2" color="text.secondary">
              - ${totalFoodCost.toFixed(2)} (
              {((totalFoodCost / finalSubtotal) * 100).toFixed(1)}%)
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="body2">Total Labor Cost:</Typography>
            <Typography variant="body2" color="text.secondary">
              - ${totalLaborCost.toFixed(2)} (
              {((totalLaborCost / finalSubtotal) * 100).toFixed(1)}%)
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" fontWeight="bold">
              Gross Profit:
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              color={
                grossProfitPercent > 60
                  ? "success.main"
                  : grossProfitPercent > 40
                  ? "warning.main"
                  : "error.main"
              }
            >
              ${grossProfit.toFixed(2)} ({grossProfitPercent.toFixed(1)}%)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        sx={{ mt: 2 }}
        onClick={() => setView("processOrderStep3")}
      >
        Next: Final Review
      </Button>
    </>
  );
};

export default ProcessOrderStep2;
