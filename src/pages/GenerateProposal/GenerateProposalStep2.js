import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Divider,
  Button,
  Chip,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { ExpandMore, Close, Add, Refresh, Edit } from "@mui/icons-material";
import BackButton from "../../components/BackButton";

const GenerateProposalStep2 = ({ setView, initialProposals, openEmail }) => {
  const [proposals, setProposals] = useState(initialProposals);
  const budget = 500; // From step 1
  const peopleCount = 30; // From step 1
  const perPersonBudget = budget / peopleCount;

  // Tax and Delivery Fee settings (at top level, apply to all proposals)
  const [includeTax, setIncludeTax] = useState(true);
  const [taxExempt, setTaxExempt] = useState(false);
  const [includeDeliveryFee, setIncludeDeliveryFee] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(25.0);
  const [isEditingDeliveryFee, setIsEditingDeliveryFee] = useState(false);

  const TAX_RATE = 0.08; // 8% sales tax

  // Menu items with prices (from Toast)
  const menuItems = {
    "Pepian Chicken (serves 15)": {
      price: 85,
      foodCost: 37.5,
      laborCost: 12.5,
    },
    "Black Bean Rice (serves 10)": {
      price: 32,
      foodCost: 12.0,
      laborCost: 5.0,
    },
    "Taco Bar (serves 20)": { price: 120, foodCost: 45.0, laborCost: 15.0 },
    "Horchata (30 servings)": { price: 45, foodCost: 15.0, laborCost: 5.0 },
    "Plantain Chips": { price: 10, foodCost: 3.2, laborCost: 1.25 },
    "Cheesy Rice (serves 10)": { price: 28, foodCost: 10.0, laborCost: 4.0 },
    "Custom Item": { price: 0, foodCost: 0, laborCost: 0 },
  };

  const handleItemChange = (propId, itemId, field, value) => {
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: p.items.map((item) => {
                if (item.id === itemId) {
                  const updates = { ...item, [field]: value };

                  // If changing the item name, update price automatically (unless custom)
                  if (field === "name" && value !== "Custom Item") {
                    const menuItem = menuItems[value];
                    if (menuItem) {
                      updates.price = menuItem.price;
                      updates.customName = ""; // Clear custom name
                      updates.marginEdge = {
                        foodCost: menuItem.foodCost,
                        laborCost: menuItem.laborCost,
                      };
                    }
                  }

                  // If changing to Custom Item, reset custom name
                  if (field === "name" && value === "Custom Item") {
                    updates.customName = "";
                    updates.price = 0;
                  }

                  // If changing quantity, just update quantity
                  if (field === "qty") {
                    updates.qty = parseFloat(value) || 0;
                  }

                  // If changing price (custom item), update price
                  if (field === "price") {
                    updates.price = parseFloat(value) || 0;
                  }

                  // If changing custom name
                  if (field === "customName") {
                    updates.customName = value;
                  }

                  return updates;
                }
                return item;
              }),
            }
          : p
      )
    );
  };

  const handleRemoveItem = (propId, itemId) =>
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? { ...p, items: p.items.filter((item) => item.id !== itemId) }
          : p
      )
    );

  const handleAddItem = (propId) =>
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: [
                ...p.items,
                {
                  id: Date.now(),
                  name: "Pepian Chicken (serves 15)",
                  customName: "",
                  qty: 1,
                  price: 85,
                  marginEdge: {
                    foodCost: 37.5,
                    laborCost: 12.5,
                  },
                },
              ],
            }
          : p
      )
    );

  return (
    <>
      <BackButton onClick={() => setView("generateProposalStep1")}>
        Back
      </BackButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Menu Proposals</Typography>
        <IconButton>
          <Refresh />
        </IconButton>
      </Box>

      {/* Budget Summary */}
      <Card variant="outlined" sx={{ mb: 2, bgcolor: "#E3F2FD" }}>
        <CardContent sx={{ py: 1.5 }}>
          <Typography variant="body2" fontWeight="bold">
            📊 Budget Requirements
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption">Total Budget:</Typography>
            <Typography variant="caption" fontWeight="bold">
              ${budget.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">People:</Typography>
            <Typography variant="caption" fontWeight="bold">
              {peopleCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">Per Person:</Typography>
            <Typography variant="caption" fontWeight="bold">
              ${perPersonBudget.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tax & Delivery Fee Settings */}
      <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          Pricing Options (Apply to All Proposals)
        </Typography>
        <Divider sx={{ my: 1 }} />

        {/* Sales Tax Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={includeTax}
                onChange={(e) => setIncludeTax(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">Include Sales Tax (8%)</Typography>
            }
          />
          {includeTax && (
            <IconButton size="small" onClick={() => setTaxExempt(!taxExempt)}>
              <Typography
                variant="caption"
                sx={{
                  border: "1px solid",
                  px: 1,
                  borderRadius: 1,
                  color: taxExempt ? "success.main" : "text.secondary",
                }}
              >
                {taxExempt ? "Exempt" : "Taxable"}
              </Typography>
            </IconButton>
          )}
        </Box>

        {/* Delivery Fee Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={includeDeliveryFee}
                onChange={(e) => setIncludeDeliveryFee(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">Include Delivery Fee</Typography>
            }
          />
          {includeDeliveryFee && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isEditingDeliveryFee ? (
                <TextField
                  value={deliveryFee}
                  onChange={(e) =>
                    setDeliveryFee(parseFloat(e.target.value) || 0)
                  }
                  size="small"
                  type="number"
                  sx={{ width: 100 }}
                  InputProps={{ startAdornment: "$" }}
                  onBlur={() => setIsEditingDeliveryFee(false)}
                  autoFocus
                />
              ) : (
                <>
                  <Typography variant="body2" fontWeight="500">
                    ${deliveryFee.toFixed(2)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setIsEditingDeliveryFee(true)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </Box>
      </Card>

      {proposals.map((p) => {
        const subtotal = p.items.reduce(
          (acc, item) => acc + (item.qty || 0) * (item.price || 0),
          0
        );

        const salesTax = includeTax && !taxExempt ? subtotal * TAX_RATE : 0;
        const deliveryAmount = includeDeliveryFee ? deliveryFee : 0;
        const total = subtotal + salesTax + deliveryAmount;

        const totalCost = p.items.reduce(
          (acc, item) =>
            acc + (item.qty || 0) * (item.marginEdge?.foodCost || 0),
          0
        );
        const totalLabor = p.items.reduce(
          (acc, item) =>
            acc + (item.qty || 0) * (item.marginEdge?.laborCost || 0),
          0
        );
        const margin =
          ((subtotal - totalCost - totalLabor) / subtotal) * 100 || 0;
        const underBudget = budget - total;
        const perPerson = total / peopleCount;

        return (
          <Accordion key={p.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  pr: 2,
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    ${total.toFixed(2)} ({underBudget >= 0 ? "Under" : "Over"}{" "}
                    budget: ${Math.abs(underBudget).toFixed(2)})
                  </Typography>
                </Box>
                <Chip
                  label={`${margin.toFixed(1)}% margin`}
                  size="small"
                  color={
                    margin > 60 ? "success" : margin > 40 ? "warning" : "error"
                  }
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
              {/* Proposal Metadata */}
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="caption" display="block">
                  ⭐ {p.successRate}% success rate
                </Typography>
                <Typography variant="caption" display="block">
                  📊 {p.historicalNote}
                </Typography>
                <Typography variant="caption" display="block">
                  📦 {p.inventoryStatus}
                </Typography>
              </Alert>

              {p.items.map((item) => {
                const itemTotal = (item.qty || 0) * (item.price || 0);
                const isCustom = item.name === "Custom Item";

                return (
                  <Card
                    key={item.id}
                    variant="outlined"
                    sx={{ mb: 2, p: 1.5, bgcolor: "white" }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      {/* Item Selection - Full Width */}
                      <Grid item xs={11}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Item</InputLabel>
                          <Select
                            value={item.name}
                            onChange={(e) =>
                              handleItemChange(
                                p.id,
                                item.id,
                                "name",
                                e.target.value
                              )
                            }
                            label="Item"
                          >
                            {Object.keys(menuItems).map((menuItem) => (
                              <MenuItem key={menuItem} value={menuItem}>
                                {menuItem}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* Remove Button */}
                      <Grid item xs={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveItem(p.id, item.id)}
                        >
                          <Close color="error" fontSize="small" />
                        </IconButton>
                      </Grid>

                      {/* Custom Item Name Field */}
                      {isCustom && (
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Custom Item Name"
                            value={item.customName || ""}
                            onChange={(e) =>
                              handleItemChange(
                                p.id,
                                item.id,
                                "customName",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Special Dessert Platter"
                          />
                        </Grid>
                      )}

                      {/* Quantity */}
                      <Grid item xs={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Qty"
                          value={item.qty || 1}
                          onChange={(e) =>
                            handleItemChange(
                              p.id,
                              item.id,
                              "qty",
                              e.target.value
                            )
                          }
                          type="number"
                          inputProps={{ min: 0, step: 1 }}
                        />
                      </Grid>

                      {/* Price - Auto-calculated or editable for custom */}
                      <Grid item xs={4}>
                        {isCustom ? (
                          <TextField
                            fullWidth
                            size="small"
                            label="Price"
                            value={item.price || 0}
                            onChange={(e) =>
                              handleItemChange(
                                p.id,
                                item.id,
                                "price",
                                e.target.value
                              )
                            }
                            type="number"
                            InputProps={{ startAdornment: "$" }}
                          />
                        ) : (
                          <Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Price
                            </Typography>
                            <Typography variant="body1" fontWeight="500">
                              ${(item.price || 0).toFixed(2)}
                            </Typography>
                          </Box>
                        )}
                      </Grid>

                      {/* Line Total */}
                      <Grid item xs={4}>
                        <Box textAlign="right">
                          <Typography variant="caption" color="text.secondary">
                            Total
                          </Typography>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="primary.main"
                          >
                            ${itemTotal.toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}

              <Button
                startIcon={<Add />}
                size="small"
                onClick={() => handleAddItem(p.id)}
                sx={{ mb: 2 }}
              >
                Add Item
              </Button>

              <Divider sx={{ my: 2 }} />

              {/* Proposal Summary - Clean Table Format */}
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          Items Subtotal:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold">
                          ${subtotal.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {/* Delivery Fee Row */}
                    {includeDeliveryFee && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="body2">Delivery Fee:</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            ${deliveryAmount.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {/* Sales Tax Row */}
                    {includeTax && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="body2">
                            Sales Tax (8%):
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {taxExempt ? (
                            <Chip
                              label="Tax Exempt"
                              size="small"
                              color="success"
                            />
                          ) : (
                            <Typography variant="body2">
                              ${salesTax.toFixed(2)}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell colSpan={2}>
                        <Divider />
                      </TableCell>
                    </TableRow>

                    <TableRow sx={{ bgcolor: "grey.50" }}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          Grand Total:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" fontWeight="bold">
                          ${total.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">Per Person:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          ${perPerson.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">Budget Status:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color={
                            underBudget >= 0 ? "success.main" : "error.main"
                          }
                        >
                          {underBudget >= 0 ? "Under" : "Over"} by $
                          {Math.abs(underBudget).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          Est. Margin:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${margin.toFixed(1)}%`}
                          size="small"
                          color={
                            margin > 60
                              ? "success"
                              : margin > 40
                              ? "warning"
                              : "error"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
                onClick={openEmail}
                disabled={underBudget < 0}
              >
                {underBudget >= 0
                  ? "✉️ Send This Proposal"
                  : "⚠️ Over Budget - Adjust Items"}
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default GenerateProposalStep2;
