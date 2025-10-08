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
} from "@mui/material";
import { Edit, Info, ArrowForwardIos, Add } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";
import Step2_ItemCard from "./Step2_ItemCard";
import Step2_VolumeDiscount from "./Step2_VolumeDiscount";
import Step2_OrderProfitability from "./Step2_OrderProfitability";

const ProcessOrderStep2 = ({ setView, order: initialOrder, customer }) => {
  const [order] = useState(initialOrder);
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(initialOrder.tip);
  const [isEditingTip, setIsEditingTip] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(initialOrder.deliveryFee);
  const [isEditingDeliveryFee, setIsEditingDeliveryFee] = useState(false);
  const [isTaxExempt, setIsTaxExempt] = useState(customer.flags.taxExempt);

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

  const totalFoodCost = order.items.reduce(
    (acc, item) => acc + item.qty * item.estFoodCost,
    0
  );
  const totalLaborCost = order.items.reduce(
    (acc, item) => acc + item.qty * (item.estLaborHours * 25),
    0
  ); // Assuming $25/hr
  const grossProfit = subtotal - totalFoodCost - totalLaborCost;
  const estProfit = grossProfit - deliveryFee - discount;
  const estProfitPercent = (estProfit / finalSubtotal) * 100 || 0;

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <SectionHeader>
        Items Ordered ({order.items.length} AI recognized)
      </SectionHeader>
      {order.items.map((item) => (
        <Step2_ItemCard key={item.id} item={item} />
      ))}
      <Button startIcon={<Add />} size="small" sx={{ mt: 1 }}>
        Add Item
      </Button>

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
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell>
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  fontWeight="bold"
                  color={estProfit > 0 ? "success.main" : "error.main"}
                >
                  Est. Margin
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  fontWeight="bold"
                  color={estProfit > 0 ? "success.main" : "error.main"}
                >
                  ${estProfit.toFixed(2)} ({estProfitPercent.toFixed(1)}%)
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Step2_VolumeDiscount
        customer={customer}
        subtotal={subtotal}
        total={total}
        estProfit={estProfit}
        discount={discount}
        finalSubtotal={finalSubtotal}
        setDiscount={setDiscount}
      />

      <Step2_OrderProfitability
        finalSubtotal={finalSubtotal}
        totalFoodCost={totalFoodCost}
        totalLaborCost={totalLaborCost}
      />

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
