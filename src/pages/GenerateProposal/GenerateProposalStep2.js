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
                  cost: 4,
                  labor: 1,
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
          (acc, item) => acc + item.qty * item.cost,
          0
        );
        const totalLabor = p.items.reduce(
          (acc, item) => acc + item.qty * item.labor,
          0
        );
        const margin = ((total - totalCost - totalLabor) / total) * 100 || 0;
        return (
          <Accordion key={p.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
              {p.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}
                >
                  <TextField
                    size="small"
                    label="Qty"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "qty", e.target.value)
                    }
                    type="number"
                    sx={{ width: 70 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "name", e.target.value)
                    }
                  />
                  <TextField
                    size="small"
                    label="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "price", e.target.value)
                    }
                    type="number"
                    sx={{ width: 80 }}
                    InputProps={{ startAdornment: "$" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveItem(p.id, item.id)}
                  >
                    <Close color="error" />
                  </IconButton>
                </Box>
              ))}
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
                <Typography
                  variant="caption"
                  color={margin > 40 ? "success.main" : "warning.main"}
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
