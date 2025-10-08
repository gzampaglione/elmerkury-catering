import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CheckCircle, Schedule, Send } from "@mui/icons-material";
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const POTrackingQueue = ({ setView, poQueue, openEmail }) => {
  const [selectedPO, setSelectedPO] = useState(null);
  const [poNumber, setPONumber] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFinalizePO = (po) => {
    setSelectedPO(po);
    setPONumber(po.poNumber || "");
    setOpenDialog(true);
  };

  const handleConfirmFinalize = () => {
    setProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      setOpenDialog(false);
      openEmail("po_final");
      alert(`Invoice finalized with PO ${poNumber}`);
    }, 2000);
  };

  const pendingPOs = poQueue.filter((po) => po.poStatus === "Awaiting PO");
  const receivedPOs = poQueue.filter((po) => po.poStatus === "PO Received");

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        📋 PO Work Queue
      </Typography>

      {receivedPOs.length > 0 && (
        <>
          <SectionHeader>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            Ready to Finalize ({receivedPOs.length})
          </SectionHeader>
          {receivedPOs.map((po) => (
            <Card
              key={po.orderNum}
              variant="outlined"
              sx={{ mb: 2, bgcolor: "#E8F5E9" }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {po.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Order #{po.orderNum}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Delivery: {po.deliveryDate} at {po.deliveryTime}
                    </Typography>
                    <Chip
                      label={`PO: ${po.poNumber}`}
                      size="small"
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    ${po.total.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Preliminary Invoice: {po.qboInvoicePrelim}
                </Typography>
                <Typography variant="caption" display="block">
                  PO Received: {po.poReceivedDate}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => handleFinalizePO(po)}
                >
                  Finalize Invoice
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}
      {pendingPOs.length > 0 && (
        <>
          <SectionHeader>
            <Schedule color="warning" sx={{ mr: 1 }} />
            Awaiting PO ({pendingPOs.length})
          </SectionHeader>
          {pendingPOs.map((po) => (
            <Card key={po.orderNum} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {po.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Order #{po.orderNum}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Delivery: {po.deliveryDate} at {po.deliveryTime}
                    </Typography>
                    <Chip
                      label={`Day ${po.daysWaiting} - Waiting`}
                      size="small"
                      color="warning"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    ${po.total.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Preliminary Invoice: {po.qboInvoicePrelim}
                </Typography>
                <Typography variant="caption" display="block">
                  Ordered: {po.orderDate}
                </Typography>
                {po.daysWaiting >= 3 && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    <Typography variant="caption">
                      Consider sending reminder
                    </Typography>
                  </Alert>
                )}
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  startIcon={<Send />}
                  sx={{ mt: 2 }}
                >
                  Send PO Reminder
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* Finalize PO Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => !processing && setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Finalize Invoice with PO</DialogTitle>
        <DialogContent>
          {selectedPO && (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Order #{selectedPO.orderNum} - {selectedPO.customerName}
              </Typography>
              <TextField
                fullWidth
                label="PO Number"
                value={poNumber}
                onChange={(e) => setPONumber(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="caption">
                  This will:
                  <br />✓ Void preliminary invoice {selectedPO.qboInvoicePrelim}
                  <br />
                  ✓ Create final invoice with PO number
                  <br />
                  ✓ Update HubSpot deal
                  <br />✓ Generate email draft
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={processing}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmFinalize}
            variant="contained"
            disabled={processing || !poNumber}
          >
            {processing ? "Processing..." : "Finalize Invoice"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default POTrackingQueue;
