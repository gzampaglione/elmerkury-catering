import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import Step2_Profitability from "./Step2_Profitability";

const Step2_ItemCard = ({ item: initialItem }) => {
  const [item, setItem] = useState(initialItem);
  const [lineTotal, setLineTotal] = useState(item.qty * item.unitPrice);

  useEffect(() => {
    setLineTotal(item.qty * item.unitPrice);
  }, [item.qty, item.unitPrice]);

  const handleQtyChange = (e) => {
    const newQty = Math.floor(e.target.value);
    if (newQty >= 0) {
      setItem({ ...item, qty: newQty });
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (newPrice >= 0) {
      setItem({ ...item, unitPrice: newPrice });
    }
  };

  const confidenceColor =
    item.confidence === "High"
      ? "success"
      : item.confidence === "Medium"
      ? "warning"
      : "error";

  return (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          Email: "{item.emailDesc}"
        </Typography>
        <br />
        <Typography variant="caption" color="textSecondary">
          AI Confidence:
        </Typography>

        <Chip
          label={`${item.confidence}`}
          color={confidenceColor}
          //size="small"
          sx={{ mb: 1 }}
        />
        <Grid container alignItems="center" spacing={1} sx={{ my: 1 }}>
          <Grid item xs={12}>
            <Select fullWidth defaultValue={item.matchedItem} size="small">
              <MenuItem value={item.matchedItem}>{item.matchedItem}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Qty"
              value={item.qty}
              onChange={handleQtyChange}
              size="small"
              type="number"
              inputProps={{ min: 0, step: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Price"
              value={item.unitPrice.toFixed(2)}
              onChange={handlePriceChange}
              size="small"
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
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
        <Step2_Profitability item={item} />
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
};

export default Step2_ItemCard;
