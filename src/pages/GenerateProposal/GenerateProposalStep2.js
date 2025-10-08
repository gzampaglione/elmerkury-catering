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
} from "@mui/material";
import { ExpandMore, Close, Add, Refresh } from "@mui/icons-material";
import BackButton from "../../components/BackButton";

const GenerateProposalStep2 = ({ setView, initialProposals, openEmail }) => {
  const [proposals, setProposals] = useState(initialProposals);
  const budget = 500; // From step 1
  const peopleCount = 30; // From step 1
  const perPersonBudget = budget / peopleCount;

  const handleItemChange = (propId, itemId, field, value) =>
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: p.items.map((item) =>
                item.id === itemId
                  ? { ...item, [field]: parseFloat(value) || value }
                  : item
              ),
            }
          : p
      )
    );

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
                  name: "New Item",
                  qty: 1,
                  price: 10,
                  marginEdge: {
                    foodCost: 4,
                    foodCostPercent: 40,
                    laborHours: 0.5,
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

      {proposals.map((p) => {
        const total = p.items.reduce(
          (acc, item) => acc + (item.qty || 0) * (item.price || 0),
          0
        );
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
        const margin = ((total - totalCost - totalLabor) / total) * 100 || 0;
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
                const itemCost = item.marginEdge?.foodCost || 0;
                const itemLabor = item.marginEdge?.laborCost || 0;
                const itemMargin =
                  ((itemTotal - itemCost * item.qty - itemLabor * item.qty) /
                    itemTotal) *
                  100;

                return (
                  <Box key={item.id} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <TextField
                        size="small"
                        label="Qty"
                        value={item.qty || 1}
                        onChange={(e) =>
                          handleItemChange(p.id, item.id, "qty", e.target.value)
                        }
                        type="number"
                        sx={{ width: 80 }}
                      />
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
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                          <MenuItem value="Pepian Chicken (serves 15)">
                            Pepian Chicken (serves 15)
                          </MenuItem>
                          <MenuItem value="Black Bean Rice (serves 10)">
                            Black Bean Rice (serves 10)
                          </MenuItem>
                          <MenuItem value="Taco Bar (serves 20)">
                            Taco Bar (serves 20)
                          </MenuItem>
                          <MenuItem value="Horchata (30 servings)">
                            Horchata (30 servings)
                          </MenuItem>
                          <MenuItem value="Custom Item">
                            Custom Item...
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
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
                        sx={{ width: 100 }}
                        InputProps={{ startAdornment: "$" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(p.id, item.id)}
                      >
                        <Close color="error" />
                      </IconButton>
                    </Box>

                    {/* MarginEdge Cost Display */}
                    {item.marginEdge && (
                      <Box
                        sx={{
                          bgcolor: "#f5f5f5",
                          p: 1,
                          borderRadius: 1,
                          mt: 1,
                        }}
                      >
                        <Typography variant="caption" display="block">
                          Food Cost: ${(itemCost * item.qty).toFixed(2)} (
                          {item.marginEdge.foodCostPercent?.toFixed(1)}%)
                        </Typography>
                        <Typography variant="caption" display="block">
                          Labor: {item.marginEdge.laborHours * item.qty} hrs ($
                          {(itemLabor * item.qty).toFixed(2)})
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          fontWeight="bold"
                          color={
                            itemMargin > 60
                              ? "success.main"
                              : itemMargin > 40
                              ? "warning.main"
                              : "error.main"
                          }
                        >
                          Item Margin: {itemMargin.toFixed(1)}%
                        </Typography>

                        {/* Ingredient Status */}
                        {item.marginEdge.ingredients && (
                          <Box sx={{ mt: 1 }}>
                            {item.marginEdge.ingredients.map((ing, idx) => (
                              <Chip
                                key={idx}
                                label={`${ing.name} ${
                                  ing.inStock ? "✅" : "⚠️"
                                }`}
                                size="small"
                                color={ing.inStock ? "success" : "warning"}
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}

              <Button
                startIcon={<Add />}
                size="small"
                onClick={() => handleAddItem(p.id)}
              >
                Add Item
              </Button>
              <Divider sx={{ my: 1 }} />

              {/* Proposal Summary */}
              <Box textAlign="right">
                <Typography fontWeight="bold">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block">
                  Per Person: ${perPerson.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block">
                  Food Cost: ${totalCost.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block">
                  Labor: ${totalLabor.toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  color={underBudget >= 0 ? "success.main" : "error.main"}
                  fontWeight="bold"
                  display="block"
                >
                  {underBudget >= 0 ? "Under" : "Over"} Budget: $
                  {Math.abs(underBudget).toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  color={margin > 40 ? "success.main" : "warning.main"}
                  fontWeight="bold"
                >
                  Est. Margin: {margin.toFixed(1)}%
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={openEmail}
                disabled={underBudget < 0}
              >
                {underBudget >= 0
                  ? "Select Proposal"
                  : "Over Budget - Adjust Items"}
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
export default GenerateProposalStep2;
