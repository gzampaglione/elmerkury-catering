import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Alert,
  LinearProgress,
} from "@mui/material";
import { Warning, CheckCircle, Send } from "@mui/icons-material";
import BackButton from "../components/BackButton";
import SectionHeader from "../components/SectionHeader";

const PaymentMonitoring = ({ setView, paymentTracking }) => {
  const overduePayments = paymentTracking.filter(
    (p) => p.paymentStatus === "Overdue"
  );
  const upcomingPayments = paymentTracking.filter(
    (p) => p.paymentStatus === "Unpaid" && p.daysOverdue < 0
  );

  const handleSendReminder = (invoice) => {
    alert(`Reminder sent for invoice ${invoice.qboInvoiceNumber}`);
  };

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        💳 Payment Monitoring
      </Typography>

      {overduePayments.length > 0 && (
        <>
          <SectionHeader>
            <Warning color="error" sx={{ mr: 1 }} />
            Overdue Payments ({overduePayments.length})
          </SectionHeader>
          {overduePayments.map((payment) => (
            <Card
              key={payment.orderNum}
              variant="outlined"
              sx={{ mb: 2, bgcolor: "#FFEBEE" }}
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
                      {payment.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Invoice: {payment.qboInvoiceNumber}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Order #{payment.orderNum}
                    </Typography>
                    <Chip
                      label={`${Math.abs(payment.daysOverdue)} days overdue`}
                      size="small"
                      color="error"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="error">
                    ${payment.invoiceAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Invoice Date: {payment.invoiceDate}
                </Typography>
                <Typography variant="caption" display="block">
                  Due Date: {payment.dueDate}
                </Typography>
                <Typography variant="caption" display="block">
                  Payment Terms: {payment.paymentTerms}
                </Typography>
                {payment.lastReminderSent && (
                  <Typography
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    Last Reminder: {payment.lastReminderSent} (
                    {payment.reminderCount} sent)
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  fullWidth
                  startIcon={<Send />}
                  sx={{ mt: 2 }}
                  onClick={() => handleSendReminder(payment)}
                >
                  Send Payment Reminder
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {upcomingPayments.length > 0 && (
        <>
          <SectionHeader>
            <CheckCircle color="success" sx={{ mr: 1 }} />
            Upcoming Due ({upcomingPayments.length})
          </SectionHeader>
          {upcomingPayments.map((payment) => (
            <Card key={payment.orderNum} variant="outlined" sx={{ mb: 2 }}>
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
                      {payment.customerName}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Invoice: {payment.qboInvoiceNumber}
                    </Typography>
                    <Chip
                      label={`Due in ${Math.abs(payment.daysOverdue)} days`}
                      size="small"
                      color="warning"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Typography variant="h6" color="text.secondary">
                    ${payment.invoiceAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block">
                  Due Date: {payment.dueDate}
                </Typography>
                {Math.abs(payment.daysOverdue) <= 1 && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    <Typography variant="caption">
                      Automatic reminder scheduled
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {overduePayments.length === 0 && upcomingPayments.length === 0 && (
        <Alert severity="success">
          <Typography variant="body2">
            All payments are up to date! 🎉
          </Typography>
        </Alert>
      )}
    </>
  );
};

export default PaymentMonitoring;
