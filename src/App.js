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
} from "@mui/material"; // Added Card and CardContent
import MainLayout from "./components/MainLayout";
import Homepage from "./pages/Homepage";
import ProcessOrderStep1 from "./pages/ProcessOrder/ProcessOrderStep1";
import ProcessOrderStep2 from "./pages/ProcessOrder/ProcessOrderStep2";
import ProcessOrderStep3 from "./pages/ProcessOrder/ProcessOrderStep3";
import GenerateProposalStep1 from "./pages/GenerateProposal/GenerateProposalStep1";
import GenerateProposalStep2 from "./pages/GenerateProposal/GenerateProposalStep2";
import EditOrderScreen from "./pages/EditOrderScreen";
import SearchOrders from "./pages/SearchOrders";
import SettingsPage from "./pages/SettingsPage";
import CalendarView from "./pages/CalendarView";
import { DUMMY_DATA } from "./data/dummyData";
import { theme } from "./theme";
import { CheckCircle, Email as EmailIcon } from "@mui/icons-material"; // Renamed Email to EmailIcon to avoid conflict

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
      We'd like to place a catering order for a faculty lunch. We have a budget
      of **$500** and are expecting **30 people**.
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "💳",
      title: "Payment received",
      body: "Penn Law - $97.00",
      time: "5 minutes ago",
    },
    {
      id: 2,
      icon: "📧",
      title: "Customer replied",
      body: "SIG confirmed menu proposal",
      time: "1 hour ago",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const openEmailDraft = (type) => {
    let subject, body;
    if (type === "confirmation") {
      subject = `Your Order #${DUMMY_DATA.currentOrder.orderNum} is Confirmed!`;
      body = `Dear Ashley,\n\nThank you for your order! Your invoice is attached.\n\nBest,\nSofia`;
      setView("processOrderConfirmation");
    } else {
      subject = `Menu Proposal for your Event`;
      body = `Hi Ashley,\n\nHere are a couple of proposals...\n\nOPTION 1: Traditional Feast...`;
    }
    setEmailContent(
      <EmailDraft
        to={DUMMY_DATA.knownCustomer.contactEmail}
        subject={subject}
        body={body}
      />
    );
  };

  const renderView = () => {
    switch (view) {
      case "homepage":
        return (
          <Homepage
            setView={setView}
            customer={customer}
            recentOrders={DUMMY_DATA.recentOrders}
          />
        );
      case "processOrderStep1":
        return (
          <ProcessOrderStep1
            setView={setView}
            customer={customer}
            order={DUMMY_DATA.currentOrder}
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
        return <GenerateProposalStep1 setView={setView} customer={customer} />;
      case "generateProposalStep2":
        return (
          <GenerateProposalStep2
            setView={setView}
            initialProposals={DUMMY_DATA.proposals}
            openEmail={() => openEmailDraft("proposal")}
          />
        );
      case "editOrderSelect":
        return <SearchOrders setView={setView} orders={DUMMY_DATA.allOrders} />;
      case "editOrderScreen":
        return (
          <EditOrderScreen
            setView={setView}
            order={DUMMY_DATA.currentOrder}
            customer={DUMMY_DATA.knownCustomer}
          />
        );
      case "settingsPage":
        return <SettingsPage setView={setView} />;
      case "calendarView":
        return (
          <CalendarView setView={setView} events={DUMMY_DATA.calendarEvents} />
        );
      case "searchOrders":
        return <SearchOrders setView={setView} orders={DUMMY_DATA.allOrders} />;
      default:
        return <Homepage setView={setView} customer={customer} />;
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
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout
        emailContent={emailContent}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
        setNotifications={setNotifications}
        handleCustomerToggle={handleCustomerToggle}
      >
        {renderView()}
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
