import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";

const Step2_VolumeDiscount = ({
  customer,
  subtotal,
  total,
  estProfit,
  discount,
  finalSubtotal,
  setDiscount,
}) => {
  if (customer.name !== "Penn Law") {
    return null;
  }

  return (
    <Card
      variant="outlined"
      sx={{ my: 2, bgcolor: "info.main", color: "white" }}
    >
      <CardContent>
        <Typography fontWeight="bold">
          💰 Volume Discount Opportunity
        </Typography>
        <Typography variant="body2">
          {customer.name} - Loyal Customer ⭐
        </Typography>
        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
        <Typography variant="caption">
          SUGGESTION: Offer 10% loyalty discount ($
          {(subtotal * 0.1).toFixed(2)})
        </Typography>
        <Typography variant="caption" display="block">
          New Total: ${(total - subtotal * 0.1).toFixed(2)} | New Margin:{" "}
          {(
            ((estProfit + discount - subtotal * 0.1) /
              (finalSubtotal - subtotal * 0.1)) *
            100
          ).toFixed(1)}
          % ✅
        </Typography>
        <Box mt={1}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => setDiscount(subtotal * 0.1)}
          >
            Apply Discount
          </Button>
          <Button
            size="small"
            sx={{ color: "white", ml: 1 }}
            onClick={() => setDiscount(0)}
          >
            Send Without
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Step2_VolumeDiscount;
