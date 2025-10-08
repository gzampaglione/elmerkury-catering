import React from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  CircularProgress,
  Alert,
} from "@mui/material";

export const LoadingState = ({ type, message, progress }) => {
  if (type === "processing") {
    return (
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />
        <Typography variant="body2">✅ Creating QBO Invoice...</Typography>
        <Typography variant="body2" color="text.secondary">
          🔄 Sending to Toast KDS...
        </Typography>
      </Box>
    );
  }
  return (
    <Box textAlign="center" p={4}>
      <CircularProgress />
      <Typography mt={2}>{message}</Typography>
    </Box>
  );
};

export const ErrorState = ({ type, onRetry, onContinue }) => {
  if (type === "connection") {
    return (
      <Alert
        severity="error"
        action={
          <>
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
            <Button color="inherit" size="small" onClick={onContinue}>
              Continue
            </Button>
          </>
        }
      >
        Toast Connection Issue - Using cached menu.
      </Alert>
    );
  }
  if (type === "validation") {
    return (
      <Alert severity="error">
        <Typography fontWeight="bold">Cannot Process Order</Typography>
        <ul>
          <li>Delivery date is required.</li>
          <li>At least one item must be added.</li>
        </ul>
      </Alert>
    );
  }
  return <Alert severity="error">An unknown error occurred.</Alert>;
};

export const HelpTip = ({ onDismiss }) => (
  <Alert severity="info" onClose={onDismiss} sx={{ mt: 2 }}>
    <Typography fontWeight="bold">💡 Tip: First time with Penn?</Typography>
    Penn orders require a 2-step invoice process. Send a "Preliminary" invoice
    first, then update with the PO number they provide.
  </Alert>
);
