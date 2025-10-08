import React, { useState } from "react";
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
  FormControl,
  InputLabel,
} from "@mui/material";
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const SearchOrders = ({ setView, orders }) => {
  const [channelFilter, setChannelFilter] = useState("All");

  const filteredOrders = orders.filter(
    (order) => channelFilter === "All" || order.channel === channelFilter
  );

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        🔍 Search Orders
      </Typography>

      <SectionHeader>Filters</SectionHeader>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flexGrow: 1 }}
        />
      </Box>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Channel</InputLabel>
        <Select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          label="Channel"
        >
          <MenuItem value="All">All Channels</MenuItem>
          <MenuItem value="Email">📧 Email</MenuItem>
          <MenuItem value="Website">🌐 Website</MenuItem>
          <MenuItem value="Satellite">🎪 Satellite</MenuItem>
        </Select>
      </FormControl>

      <Select
        multiple
        defaultValue={["Penn Law"]}
        fullWidth
        size="small"
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} size="small" />
            ))}
          </Box>
        )}
      >
        <MenuItem value="Penn Law">Penn Law</MenuItem>
        <MenuItem value="SIG">SIG</MenuItem>
        <MenuItem value="Wharton">Wharton</MenuItem>
        <MenuItem value="Mann Center">Mann Center</MenuItem>
      </Select>

      <SectionHeader>Results ({filteredOrders.length})</SectionHeader>
      <List>
        {filteredOrders.map((order) => (
          <Card key={order.id} variant="outlined" sx={{ mb: 1.5 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography fontWeight="bold">
                    {order.id} - {order.customer}
                  </Typography>
                  <Typography variant="body2">{order.date}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip label={order.channel} size="small" color="primary" />
                    <Chip label={order.status} size="small" />
                  </Box>
                </Box>
                <Typography variant="h6" color="text.secondary">
                  ${order.total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                sx={{ mt: 1 }}
                fullWidth
                variant="outlined"
                onClick={() => setView("editOrderScreen")}
              >
                View Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  );
};

export default SearchOrders;
