import React from "react";
import {
  Alert,
  Paper,
  Grid,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessOrderStep3 = ({ setView, order, customer }) => {
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
  return (
    <>
      <BackButton onClick={() => setView("processOrderStep2")}>Back</BackButton>
      <Typography variant="h6">Step 3 of 3: Final Review</Typography>
      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Order Summary</Typography>
          </Grid>
          {order.items.map((i) => (
            <React.Fragment key={i.id}>
              <Grid item xs={8}>
                {i.qty}× {i.matchedItem}
              </Grid>
              <Grid item xs={4} textAlign="right">
                ${(i.qty * i.unitPrice).toFixed(2)}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={8}>
            Items Subtotal
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${subtotal.toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Sales Tax
          </Grid>
          <Grid item xs={4} textAlign="right">
            {customer.flags.taxExempt ? "Exempt" : `$${salesTax.toFixed(2)}`}
          </Grid>
          <Grid item xs={8}>
            Delivery Fee
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${parseFloat(order.deliveryFee).toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Tip
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${parseFloat(order.tip).toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Utensils ({order.utensils.count} sets)
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${utensilsTotal.toFixed(2)}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight="bold">Grand Total</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {customer.flags.requiresPO && (
        <>
          <SectionHeader>Penn Special Handling</SectionHeader>
          <Alert severity="warning">This customer requires a PO</Alert>
          <RadioGroup row defaultValue="final">
            <FormControlLabel
              value="preliminary"
              control={<Radio />}
              label="Preliminary"
            />
            <FormControlLabel value="final" control={<Radio />} label="Final" />
          </RadioGroup>
          <TextField
            fullWidth
            label="PO Number"
            defaultValue="PO-2025-456"
            margin="dense"
            size="small"
          />
        </>
      )}
      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        sx={{ mt: 2 }}
        startIcon={<CheckCircle />}
        onClick={() => setView("processOrderConfirmation")}
      >
        PROCESS ORDER
      </Button>
    </>
  );
};

export default ProcessOrderStep3;
