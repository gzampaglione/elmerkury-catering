import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Autocomplete,
  Card,
} from "@mui/material";
import { INVENTORY_ITEMS } from "../../data/dummyData";
import SectionHeader from "../SectionHeader";

const ItemsSelector = ({ selectedItems, setSelectedItems }) => {
  const handleAddItem = (itemId) => {
    const item = INVENTORY_ITEMS.find((i) => i.id === itemId);
    if (!item) return;

    setSelectedItems([
      ...selectedItems,
      {
        id: item.id,
        name: item.name,
        cost: item.cost,
        unit: item.unit,
        quantity: 1,
      },
    ]);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== itemId));
  };

  const handleUpdateItemQuantity = (itemId, quantity) => {
    setSelectedItems(
      selectedItems.map((i) =>
        i.id === itemId ? { ...i, quantity: parseFloat(quantity) || 0 } : i
      )
    );
  };

  const itemsTotal = selectedItems.reduce(
    (acc, item) => acc + item.cost * item.quantity,
    0
  );

  const availableItems = INVENTORY_ITEMS.filter(
    (item) => !selectedItems.find((si) => si.id === item.id)
  );

  return (
    <>
      <SectionHeader>Items (MarginEdge Costs)</SectionHeader>
      <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        {selectedItems.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {selectedItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  p: 1,
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cost: ${item.cost.toFixed(2)}/{item.unit}
                  </Typography>
                </Box>
                <TextField
                  size="small"
                  label="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleUpdateItemQuantity(item.id, e.target.value)
                  }
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
                  sx={{ width: 100 }}
                />
                <Typography
                  variant="body2"
                  sx={{ width: 70, textAlign: "right" }}
                >
                  ${(item.cost * item.quantity).toFixed(2)}
                </Typography>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" fontWeight="bold">
                Total Items Cost:
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary">
                ${itemsTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        )}

        {availableItems.length > 0 ? (
          <Autocomplete
            options={availableItems}
            getOptionLabel={(option) =>
              `${option.name} - $${option.cost}/${option.unit}`
            }
            onChange={(event, value) => {
              if (value) {
                handleAddItem(value.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Item"
                size="small"
                placeholder="Search inventory..."
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box>
                  <Typography variant="body2">{option.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Cost: ${option.cost.toFixed(2)}/{option.unit}
                  </Typography>
                </Box>
              </li>
            )}
          />
        ) : (
          <Alert severity="info">
            <Typography variant="caption">All available items added</Typography>
          </Alert>
        )}

        {selectedItems.length === 0 && (
          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="caption">
              💡 Select items from inventory to bring to this event
            </Typography>
          </Alert>
        )}
      </Card>
    </>
  );
};

export default ItemsSelector;
