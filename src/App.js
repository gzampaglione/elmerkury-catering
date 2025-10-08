import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import ProcessOrderStep1 from "./pages/ProcessOrder/ProcessOrderStep1";
import ProcessOrderStep2 from "./pages/ProcessOrder/ProcessOrderStep2";
import ProcessOrderStep3 from "./pages/ProcessOrder/ProcessOrderStep3";
import ProcessSatelliteOrder from "./pages/ProcessOrder/ProcessSatelliteOrder";
import GenerateProposalStep1 from "./pages/GenerateProposal/GenerateProposalStep1";
import GenerateProposalStep2 from "./pages/GenerateProposal/GenerateProposalStep2";
import POTrackingQueue from "./pages/POTrackingQueue";
import PaymentMonitoring from "./pages/PaymentMonitoring";
import WebsiteOrderQueue from "./pages/WebsiteOrderQueue";
import EditOrderScreen from "./pages/EditOrderScreen";
import SearchOrders from "./pages/SearchOrders";
import SettingsPage from "./pages/SettingsPage";
import CalendarView from "./pages/CalendarView";
import { DUMMY_DATA } from "./data/dummyData";
import { theme } from "./theme";
import { CheckCircle, Email as EmailIcon } from "@mui/icons-material";
import { HelpTip } from "./components/states/AppStates";
import {
  GeneratingProposalsState,
  ProcessingOrderState,
} from "./components/states/LoadingStates";
import {
  ConnectionErrorState,
  PartialSuccessState,
  ValidationErrorState,
} from "./components/states/ErrorStates";

const EmailDraft = ({ to, subject, body }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography color="text.secondary">To: {to}</Typography>
      <Typography color="text.secondary">Subject: {subject}</Typography>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ whiteSpace: "pre-wrap" }}>{body}</Box>
      <Button variant="contained" sx={{ mt: 2 }}>
        Send
      </Button>
    </CardContent>
  </Card>
);

const DefaultEmail = ({ customer }) => (
  <Paper elevation={0}>
    <Typography variant="h5">Catering Request from {customer.name}</Typography>
    <Typography variant="body2" color="text.secondary">
      From: {customer.contactName} ({customer.contactEmail})
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Typography>Hi Sofia,</Typography>
    <Typography paragraph>
      We'd like to place a catering order for a faculty lunch. For items, we
      were thinking of the following:
      <br />- 3 Large Chicken Bowls
      <br />- 2 Small Cheesy Rice (one vegan if possible)
      <br />- 1 order of Plantain Chips
    </Typography>
    <Typography>Thanks,</Typography>
    <Typography>{customer.contactName}</Typography>
  </Paper>
);

const ProcessOrderConfirmation = ({ setView, order, openEmail }) => (
  <>
    <Box sx={{ textAlign: "center", my: 2 }}>
      <CheckCircle color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h6">Order Processed!</Typography>
    </Box>
    <Button
      fullWidth
      variant="contained"
      startIcon={<EmailIcon />}
      sx={{ my: 2 }}
      onClick={openEmail}
    >
      Open Email Draft
    </Button>
    <Button fullWidth sx={{ mt: 2 }} onClick={() => setView("homepage")}>
      🏠 Back to Home
    </Button>
  </>
);

const App = () => {
  const [view, setView] = useState("homepage");
  const [customer, setCustomer] = useState(DUMMY_DATA.knownCustomer);
  const [emailContent, setEmailContent] = useState(
    <DefaultEmail customer={DUMMY_DATA.knownCustomer} />
  );
  const [notifications, setNotifications] = useState(DUMMY_DATA.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [appState, setAppState] = useState("normal");
  const [showHelpTip, setShowHelpTip] = useState(false);

  const openEmailDraft = (type) => {
    let subject, body;
    if (type === "confirmation") {
      subject = `Your Order #${DUMMY_DATA.currentOrder.orderNum} is Confirmed!`;
      body = `Dear ${customer.contactName},\n\nThank you for your order! Your invoice is attached.\n\nBest,\nSofia`;
      setView("processOrderConfirmation");
    } else if (type === "po_prelim") {
      subject = `Order Confirmed - Awaiting PO`;
      body = `Dear ${customer.contactName},\n\nYour order is confirmed. Please send PO number when available.\n\nPreliminary invoice attached.\n\nBest,\nSofia`;
    } else {
      subject = `Menu Proposal for your Event`;
      body = `Hi ${customer.contactName},\n\nHere are a couple of proposals...\n\nOPTION 1: Traditional Feast...`;
    }
    setEmailContent(
      <EmailDraft to={customer.contactEmail} subject={subject} body={body} />
    );
  };

  const handleProcessOrder = () => {
    setAppState("loading_processing");
    setTimeout(() => {
      setAppState("normal");
      setView("processOrderConfirmation");
    }, 8000);
  };

  const renderView = () => {
    if (appState === "loading_proposals") {
      return <GeneratingProposalsState />;
    }
    if (appState === "loading_processing") {
      return <ProcessingOrderState progress={40} />;
    }
    if (appState === "error_connection") {
      return (
        <ConnectionErrorState
          onRetry={() => setAppState("normal")}
          onContinue={() => setAppState("normal")}
        />
      );
    }
    if (appState === "error_validation") {
      return <ValidationErrorState onFix={() => setAppState("normal")} />;
    }
    if (appState === "error_partial") {
      return <PartialSuccessState onRetry={() => setAppState("normal")} />;
    }

    switch (view) {
      case "homepage":
        return (
          <Homepage
            setView={setView}
            customer={customer}
            recentOrders={DUMMY_DATA.recentOrders}
            poQueue={DUMMY_DATA.poTrackingQueue}
            paymentTracking={DUMMY_DATA.paymentTracking}
            websiteOrders={DUMMY_DATA.websiteOrderQueue}
          />
        );
      case "processOrderStep1":
        return (
          <ProcessOrderStep1
            setView={setView}
            customer={customer}
            order={DUMMY_DATA.currentOrder}
            setShowHelpTip={setShowHelpTip}
          />
        );
      case "processOrderStep2":
        return (
          <ProcessOrderStep2
            setView={setView}
            order={DUMMY_DATA.currentOrder}
            customer={customer}
          />
        );
      case "processOrderStep3":
        return (
          <ProcessOrderStep3
            setView={setView}
            customer={customer}
            order={DUMMY_DATA.currentOrder}
            handleProcessOrder={handleProcessOrder}
          />
        );
      case "processSatelliteOrder":
        return (
          <ProcessSatelliteOrder
            setView={setView}
            handleProcessOrder={handleProcessOrder}
          />
        );
      case "processOrderConfirmation":
        return (
          <ProcessOrderConfirmation
            setView={setView}
            order={DUMMY_DATA.currentOrder}
            openEmail={() => openEmailDraft("confirmation")}
          />
        );
      case "generateProposalStep1":
        return (
          <GenerateProposalStep1
            setView={setView}
            customer={customer}
            setAppState={setAppState}
          />
        );
      case "generateProposalStep2":
        return (
          <GenerateProposalStep2
            setView={setView}
            initialProposals={DUMMY_DATA.proposals}
            openEmail={() => openEmailDraft("proposal")}
          />
        );
      case "poTrackingQueue":
        return (
          <POTrackingQueue
            setView={setView}
            poQueue={DUMMY_DATA.poTrackingQueue}
            openEmail={openEmailDraft}
          />
        );
      case "paymentMonitoring":
        return (
          <PaymentMonitoring
            setView={setView}
            paymentTracking={DUMMY_DATA.paymentTracking}
          />
        );
      case "websiteOrderQueue":
        return (
          <WebsiteOrderQueue
            setView={setView}
            websiteOrders={DUMMY_DATA.websiteOrderQueue}
          />
        );
      case "editOrderScreen":
        return (
          <EditOrderScreen
            setView={setView}
            order={DUMMY_DATA.currentOrder}
            customer={DUMMY_DATA.knownCustomer}
          />
        );
      case "settingsPage":
        return <SettingsPage setView={setView} setAppState={setAppState} />;
      case "calendarView":
        return (
          <CalendarView setView={setView} events={DUMMY_DATA.calendarEvents} />
        );
      case "searchOrders":
        return <SearchOrders setView={setView} orders={DUMMY_DATA.allOrders} />;
      default:
        return (
          <Homepage
            setView={setView}
            customer={customer}
            recentOrders={DUMMY_DATA.recentOrders}
            poQueue={DUMMY_DATA.poTrackingQueue}
            paymentTracking={DUMMY_DATA.paymentTracking}
            websiteOrders={DUMMY_DATA.websiteOrderQueue}
          />
        );
    }
  };

  const handleCustomerToggle = () => {
    const newCustomer =
      customer.name === "Penn Law"
        ? DUMMY_DATA.otherCustomer
        : DUMMY_DATA.knownCustomer;
    setCustomer(newCustomer);
    setEmailContent(<DefaultEmail customer={newCustomer} />);
    setView("homepage");
    setShowHelpTip(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout
        emailContent={emailContent}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
        setNotifications={setNotifications}
        setView={setView}
      >
        {showHelpTip && <HelpTip onDismiss={() => setShowHelpTip(false)} />}
        {renderView()}

        {/* Customer Toggle for Demo */}
        <Button
          size="small"
          fullWidth
          onClick={handleCustomerToggle}
          sx={{ mt: 2, textTransform: "uppercase", color: "text.secondary" }}
        >
          Toggle Customer Context (Demo)
        </Button>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
