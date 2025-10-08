import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
  List,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import BackButton from "../components/BackButton";

const SearchOrders = ({ setView, orders }) => {
  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Typography variant="h6">Search Orders</Typography>
      <Box sx={{ display: "flex", gap: 1, my: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Select
        multiple
        defaultValue={["Penn Law"]}
        fullWidth
        size="small"
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        <MenuItem value="Penn Law">Penn Law</MenuItem>
        <MenuItem value="SIG">SIG</MenuItem>
        <MenuItem value="Wharton">Wharton</MenuItem>
      </Select>
      <List>
        {orders.map((order) => (
          <Card key={order.id} variant="outlined" sx={{ mb: 1.5 }}>
            <CardContent>
              <Typography fontWeight="bold">
                {order.id} - {order.customer}
              </Typography>
              <Typography variant="body2">{order.date}</Typography>
              <Typography variant="body2">
                Status: {order.status} | Total: ${order.total.toFixed(2)}
              </Typography>
              <Button sx={{ mt: 1 }} onClick={() => setView("editOrderScreen")}>
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  );
};

export default SearchOrders;
