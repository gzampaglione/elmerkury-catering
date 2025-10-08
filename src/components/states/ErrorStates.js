import React from "react";
import { Alert, Box, Typography, Button } from "@mui/material";
import { CheckCircle, Warning } from "@mui/icons-material";

export const ConnectionErrorState = ({ onRetry, onContinue }) => (
  <Alert severity="error" icon={<Warning fontSize="inherit" />}>
    <Typography fontWeight="bold">Toast Connection Issue</Typography>
    Unable to sync menu from Toast. Using cached menu (2 hours old).
    <Box mt={1}>
      <Button color="inherit" size="small" onClick={onRetry}>
        Retry Connection
      </Button>
      <Button color="inherit" size="small" onClick={onContinue}>
        Continue
      </Button>
    </Box>
  </Alert>
);

export const ValidationErrorState = ({ onFix }) => (
  <Alert
    severity="error"
    action={
      <Button color="inherit" size="small" onClick={onFix}>
        ← Go Back and Fix
      </Button>
    }
  >
    <Typography fontWeight="bold">Cannot Process Order</Typography>
    Please fix the following:
    <ul>
      <li>Delivery date is required</li>
      <li>At least one item must be added</li>
    </ul>
  </Alert>
);

export const PartialSuccessState = ({ onRetry }) => (
  <Alert severity="warning">
    <Typography fontWeight="bold">Order Partially Processed</Typography>
    <Typography variant="body2">Order #12345678</Typography>
    <Box my={1}>
      <Typography variant="caption">✅ QBO Invoice created</Typography>
      <br />
      <Typography variant="caption">✅ HubSpot Deal created</Typography>
      <br />
      <Typography variant="caption" color="error">
        ❌ Toast order failed to send
      </Typography>
    </Box>
    The kitchen ticket did not reach Toast.
    <Box mt={1}>
      <Button color="inherit" size="small" onClick={onRetry}>
        Retry Toast Order
      </Button>
    </Box>
  </Alert>
);
