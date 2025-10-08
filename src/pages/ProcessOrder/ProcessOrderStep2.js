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
} from "@mui/material";
import { ExpandMore, Close, Add, Refresh } from "@mui/icons-material";
import BackButton from "../../components/BackButton";

const GenerateProposalStep2 = ({ setView, initialProposals, openEmail }) => {
  const [proposals, setProposals] = useState(
    JSON.parse(JSON.stringify(initialProposals))
  );

  const handleItemChange = (propId, itemId, field, value) =>
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: p.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
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
        }}
      >
        <Typography variant="h6">Menu Proposals</Typography>
        <IconButton>
          <Refresh />
        </IconButton>
      </Box>
      {proposals.map((p) => {
        const total = p.items.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        );
        const totalCost = p.items.reduce(
          (acc, item) =>
            acc + item.qty * (item.marginEdge?.foodCost || item.cost || 0),
          0
        );
        const totalLabor = p.items.reduce(
          (acc, item) =>
            acc + item.qty * (item.marginEdge?.laborCost || item.labor || 0),
          0
        );
        const margin = ((total - totalCost - totalLabor) / total) * 100 || 0;
        return (
          <Accordion key={p.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  pr: 2,
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
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
                const itemTotal = item.qty * item.price;
                const itemCost = item.marginEdge?.foodCost || item.cost || 0;
                const itemLabor = item.marginEdge?.laborCost || item.labor || 0;
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
                        my: 1,
                      }}
                    >
                      <TextField
                        size="small"
                        label="Qty"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(p.id, item.id, "qty", e.target.value)
                        }
                        type="number"
                        sx={{ width: 80 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Item Name"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(
                            p.id,
                            item.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        size="small"
                        label="Price"
                        value={item.price}
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
              <Box textAlign="right">
                <Typography fontWeight="bold">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block">
                  Food Cost: ${totalCost.toFixed(2)}
                </Typography>
                <Typography variant="caption" display="block">
                  Labor: ${totalLabor.toFixed(2)}
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
              >
                Select Proposal
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
export default GenerateProposalStep2;
