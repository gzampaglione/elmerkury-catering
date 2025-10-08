import React, { useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  IconButton,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
} from "@mui/material";
import {
  Edit,
  Info,
  RemoveCircleOutline,
  ExpandMore,
  ArrowForwardIos,
} from "@mui/icons-material";
import BackButton from "../../components/BackButton";
import SectionHeader from "../../components/SectionHeader";

const ProcessOrderStep2 = ({ setView, order: initialOrder, customer }) => {
  const [order, setOrder] = useState(initialOrder);
  const [discount, setDiscount] = useState(0);

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const salesTax = customer.flags.taxExempt ? 0 : subtotal * 0.08;
  const finalSubtotal = subtotal - discount;
  const total =
    finalSubtotal +
    parseFloat(order.deliveryFee || 0) +
    parseFloat(order.tip || 0) +
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
  const estProfit = grossProfit - parseFloat(order.deliveryFee || 0) - discount;
  const estProfitPercent = (estProfit / finalSubtotal) * 100 || 0;

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <SectionHeader>
        Items Ordered{" "}
        <Tooltip title="Pulled from Toast">
          <Info fontSize="small" sx={{ ml: 1 }} color="disabled" />
        </Tooltip>
      </SectionHeader>
      {order.items.map((item) => {
        const lineTotal = item.qty * item.unitPrice;
        const estLaborCost = item.qty * item.estLaborHours * 25;
        const estFoodCost = item.qty * item.estFoodCost;
        const grossMargin = lineTotal - estFoodCost - estLaborCost;
        return (
          <Card key={item.id} variant="outlined" sx={{ mb: 1.5 }}>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Email: "{item.emailDesc}"
              </Typography>
              <Grid container alignItems="center" spacing={1} sx={{ my: 1 }}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    defaultValue={item.matchedItem}
                    size="small"
                  >
                    <MenuItem value={item.matchedItem}>
                      {item.matchedItem}
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Qty"
                    defaultValue={item.qty}
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Price"
                    defaultValue={item.unitPrice.toFixed(2)}
                    size="small"
                    InputProps={{ startAdornment: "$" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography textAlign="right" fontWeight="bold">
                    ${lineTotal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Flavors/Notes"
                defaultValue={item.notes}
                size="small"
                margin="dense"
              />
              <Accordion sx={{ mt: 1, boxShadow: "none", bgcolor: "grey.50" }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="caption">Profitability</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={7}>
                      <Typography variant="caption">Est Food Cost:</Typography>
                    </Grid>
                    <Grid item xs={5} textAlign="right">
                      <Typography variant="caption">
                        ${estFoodCost.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="caption">Est Labor Cost:</Typography>
                    </Grid>
                    <Grid item xs={5} textAlign="right">
                      <Typography variant="caption">
                        ${estLaborCost.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Tooltip title="Line Total - Food & Labor">
                        <Typography variant="caption" fontWeight="bold">
                          Gross Margin:
                        </Typography>
                      </Tooltip>
                    </Grid>
                    <Grid item xs={5} textAlign="right">
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        color="success.main"
                      >
                        ${grossMargin.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Button
                fullWidth
                size="small"
                startIcon={<RemoveCircleOutline />}
                sx={{ mt: 1, color: "error.main" }}
              >
                Remove Item
              </Button>
            </CardContent>
          </Card>
        );
      })}

      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            Items Subtotal
          </Grid>
          <Grid item xs={6} textAlign="right">
            ${subtotal.toFixed(2)}
          </Grid>
          {discount > 0 && (
            <>
              <Grid item xs={6}>
                <Typography color="success.main">Loyalty Discount</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography color="success.main">
                  - ${discount.toFixed(2)}
                </Typography>
              </Grid>
            </>
          )}
          <Grid item xs={5}>
            Tip
          </Grid>
          <Grid item xs={6} textAlign="right">
            ${parseFloat(order.tip || 0).toFixed(2)}
          </Grid>
          <Grid item xs={1} textAlign="right">
            <IconButton size="small">
              <Edit fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            Delivery Fee
          </Grid>
          <Grid item xs={6} textAlign="right">
            ${parseFloat(order.deliveryFee || 0).toFixed(2)}
          </Grid>
          <Grid item xs={1} textAlign="right">
            <IconButton size="small">
              <Edit fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            Sales Tax (8%)
          </Grid>
          <Grid item xs={6} textAlign="right">
            {customer.flags.taxExempt ? (
              <Chip label="Tax Exempt" size="small" color="success" />
            ) : (
              `$${salesTax.toFixed(2)}`
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              fontWeight="bold"
              color={estProfit > 0 ? "success.main" : "error.main"}
            >
              Est. Profit
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography
              fontWeight="bold"
              color={estProfit > 0 ? "success.main" : "error.main"}
            >
              ${estProfit.toFixed(2)} ({estProfitPercent.toFixed(1)}%)
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {customer.name === "Penn Law" && (
        <Card
          variant="outlined"
          sx={{ my: 2, bgcolor: "info.main", color: "white" }}
        >
          <CardContent>
            <Typography fontWeight="bold">
              💰 Volume Discount Opportunity
            </Typography>
            <Typography variant="body2">
              {customer.name} - Loyal Customer ⭐
            </Typography>
            <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
            <Typography variant="caption">
              SUGGESTION: Offer 10% loyalty discount ($
              {(subtotal * 0.1).toFixed(2)})
            </Typography>
            <Typography variant="caption" display="block">
              New Total: ${(total - subtotal * 0.1).toFixed(2)} | New Margin:{" "}
              {(
                ((estProfit + discount - subtotal * 0.1) /
                  (finalSubtotal - subtotal * 0.1)) *
                100
              ).toFixed(1)}
              % ✅
            </Typography>
            <Box mt={1}>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => setDiscount(subtotal * 0.1)}
              >
                Apply Discount
              </Button>
              <Button size="small" sx={{ color: "white", ml: 1 }}>
                Send Without
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Order Profitability Details
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={0.5}>
            <Grid item xs={6}>
              <Typography>Revenue:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>${finalSubtotal.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Est Food Cost:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>- ${totalFoodCost.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Est Labor Cost:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>- ${totalLaborCost.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 0.5 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Gross Profit:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography fontWeight="bold">
                ${(finalSubtotal - totalFoodCost - totalLaborCost).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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
