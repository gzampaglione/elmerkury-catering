import React, { useState } from "react";
import {
  Alert,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore, Edit, Block, Update } from "@mui/icons-material";
import BackButton from "../components/BackButton";

const EditOrderScreen = ({ setView, order: initialOrder, customer }) => {
  const [order, setOrder] = useState(initialOrder);
  return (
    <>
      <BackButton onClick={() => setView("editOrderSelect")}>Cancel</BackButton>
      <Typography variant="h6">Edit Order #{order.orderNum}</Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        This order is already in all systems. Changes will create updates.
      </Alert>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Customer & Delivery
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Customer Name"
            defaultValue={customer.contactName}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            label="Address"
            defaultValue={customer.address.line1}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            label="Delivery Time"
            defaultValue="12:30"
            margin="dense"
            size="small"
            type="time"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>Items</AccordionSummary>
        <AccordionDetails>
          {order.items.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}
            >
              <TextField
                size="small"
                label="Qty"
                defaultValue={item.qty}
                type="number"
                sx={{ width: 70 }}
              />
              <Typography sx={{ flexGrow: 1 }}>{item.matchedItem}</Typography>
              <IconButton size="small">
                <Edit fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="error" startIcon={<Block />}>
          Cancel Order
        </Button>
        <Button
          variant="contained"
          startIcon={<Update />}
          onClick={() => alert("Order Updated!")}
        >
          Update Order
        </Button>
      </Box>
    </>
  );
};

export default EditOrderScreen;
