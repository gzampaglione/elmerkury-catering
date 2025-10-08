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
  const [order] = useState(initialOrder);
  const [setEditingFee] = useState(null);

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const salesTax = customer.flags.taxExempt ? 0 : subtotal * 0.08;
  const total =
    subtotal +
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
  const estProfit = grossProfit - parseFloat(order.deliveryFee || 0);
  const estProfitPercent = (estProfit / subtotal) * 100 || 0;
  const netProfit = estProfit; // Alias for consistency

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        AI detected {order.items.length} items from email.
      </Alert>
      <SectionHeader>
        Items Ordered{" "}
        <Tooltip title="Pulled from Toast">
          <Info fontSize="small" sx={{ ml: 1 }} color="disabled" />
        </Tooltip>
      </SectionHeader>
      {order.items.map((item) => (
        <Card key={item.id} variant="outlined" sx={{ mb: 1.5 }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Email: "{item.emailDesc}"
            </Typography>
            <Select
              fullWidth
              defaultValue={item.matchedItem}
              size="small"
              sx={{ my: 1 }}
            >
              <MenuItem value={item.matchedItem}>{item.matchedItem}</MenuItem>
            </Select>
            <Typography variant="caption" color="success.main">
              Confidence: ✅ High
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <TextField
                label="Qty"
                defaultValue={item.qty}
                size="small"
                type="number"
                sx={{ width: "70px" }}
              />
              <Typography>x ${item.unitPrice.toFixed(2)}</Typography>
              <Typography variant="body1" fontWeight="bold">
                {" "}
                = ${(item.qty * item.unitPrice).toFixed(2)}
              </Typography>
            </Box>
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
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      component="ul"
                      sx={{ pl: 2, m: 0 }}
                    >
                      <li>Ingredients: {item.ingredients.join(", ")}</li>
                      <li>
                        Est. Labor: {(item.estLaborHours * 60).toFixed(0)} mins
                      </li>
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="caption">Est Food Cost:</Typography>
                  </Grid>
                  <Grid item xs={5} textAlign="right">
                    <Typography variant="caption">
                      ${(item.qty * item.estFoodCost).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="caption">Est Labor Cost:</Typography>
                  </Grid>
                  <Grid item xs={5} textAlign="right">
                    <Typography variant="caption">
                      ${(item.qty * (item.estLaborHours * 25)).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Tooltip title="Revenue - Food & Labor Cost">
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
                      $
                      {(
                        item.qty * item.unitPrice -
                        item.qty * item.estFoodCost -
                        item.qty * (item.estLaborHours * 25)
                      ).toFixed(2)}
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
      ))}

      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8}>
            <Typography>Items Subtotal</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography fontWeight="bold">${subtotal.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>Tip</Typography>
          </Grid>
          <Grid item xs={2} textAlign="right">
            <IconButton size="small" onClick={() => setEditingFee("tip")}>
              <Edit fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Typography>Delivery Fee</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography>
              ${parseFloat(order.deliveryFee || 0).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>Sales Tax (8%)</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            {customer.flags.taxExempt ? (
              <Chip label="Tax Exempt" size="small" color="success" />
            ) : (
              `$${salesTax.toFixed(2)}`
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">Total</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography variant="h6">${total.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography
              fontWeight="bold"
              color={estProfit > 0 ? "success.main" : "error.main"}
            >
              Est. Profit
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography
              fontWeight="bold"
              color={estProfit > 0 ? "success.main" : "error.main"}
            >
              ${estProfit.toFixed(2)} ({estProfitPercent.toFixed(1)}%)
            </Typography>
          </Grid>
        </Grid>
      </Paper>
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
              <Typography>${subtotal.toFixed(2)}</Typography>
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
                ${grossProfit.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Delivery Fee:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>
                - ${parseFloat(order.deliveryFee || 0).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 0.5 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                fontWeight="bold"
                color={netProfit > 0 ? "success.main" : "error.main"}
              >
                Net Profit:
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography
                fontWeight="bold"
                color={netProfit > 0 ? "success.main" : "error.main"}
              >
                ${netProfit.toFixed(2)}
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
