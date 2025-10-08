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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  ExpandMore,
  Edit,
  Block,
  Update,
  ArrowBack,
} from "@mui/icons-material";

const EditOrderScreen = ({ setView, order: initialOrder, customer }) => {
  const [order, setOrder] = useState(initialOrder);
  const [isDirty, setIsDirty] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, index) => {
    const newItems = [...order.items];
    newItems[index].qty = e.target.value;
    setOrder({ ...order, items: newItems });
    setIsDirty(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => setView("searchOrders")}
          sx={{ color: "text.secondary" }}
        >
          Back to Recent Orders
        </Button>
        <Button onClick={() => setView("homepage")} color="error">
          Cancel
        </Button>
      </Box>

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
          {order.items.map((item, index) => (
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
                onChange={(e) => handleChange(e, index)}
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
        <Button color="error" startIcon={<Block />} onClick={handleOpen}>
          Cancel Order
        </Button>
        <Button
          variant="contained"
          startIcon={<Update />}
          onClick={() => alert("Order Updated!")}
          disabled={!isDirty}
        >
          Update Order
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Cancel this order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this order? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditOrderScreen;
