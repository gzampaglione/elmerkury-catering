import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  TextField,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  RadioGroup,
  Radio,
  Tooltip,
  IconButton,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Apartment,
  ArrowBack,
  ArrowForwardIos,
  BusinessCenter,
  CalendarMonth,
  Check,
  CheckCircle,
  Close,
  Edit,
  Email,
  Error,
  ExpandMore,
  Home,
  Info,
  Block,
  Notifications,
  Person,
  Receipt,
  Replay,
  RestaurantMenu,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Update,
  Warning,
  AccessTime,
  Today,
  ViewList,
  ViewModule,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// --- THEME to match Google's Material Design aesthetic ---
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#34a853" },
    warning: { main: "#fbbc05" },
    error: { main: "#ea4335" },
    info: { main: "#4285F4" },
    grey: { 50: "#f8f9fa", 100: "#f1f3f4" },
  },
  typography: { fontFamily: "Roboto, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: "4px" } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
          borderRadius: "8px",
        },
      },
    },
  },
});

// --- DUMMY DATA ---
const DUMMY_DATA = {
  knownCustomer: {
    name: "Penn Law",
    orderCount: 15,
    ytdSpend: 12450,
    lastOrder: "April 15, 2025",
    contactName: "Ashley Duchi",
    contactEmail: "ashley@law.upenn.edu",
    contactPhone: "(215) 555-1234",
    address: {
      line1: "3501 Sansom Street",
      line2: "Suite 200",
      city: "Philadelphia",
      state: "PA",
      zip: "19104",
    },
    flags: { taxExempt: true, requiresPO: true },
  },
  newCustomer: {
    name: "New Customer",
    orderCount: 0,
    ytdSpend: 0,
    lastOrder: "N/A",
  },
  currentOrder: {
    orderNum: "12345678",
    items: [
      {
        id: 1,
        emailDesc: "Large Chicken Bowl",
        matchedItem: "Chicken Bowl (L)",
        confidence: "High",
        qty: 3,
        unitPrice: 12.0,
        notes: "Extra cilantro, no onions",
        foodCost: 4.5,
      },
      {
        id: 2,
        emailDesc: "Small Cheesy Rice",
        matchedItem: "Cheesy Rice (S)",
        confidence: "High",
        qty: 2,
        unitPrice: 8.0,
        notes: "Vegan option",
        foodCost: 2.4,
      },
      {
        id: 3,
        emailDesc: "Plantain chips",
        matchedItem: "Plantain Chips",
        confidence: "High",
        qty: 1,
        unitPrice: 10.0,
        notes: "",
        foodCost: 3.2,
      },
    ],
    deliveryFee: 25.0,
    tip: 10.0,
  },
  proposals: [
    {
      id: 1,
      title: "Traditional Guatemalan Feast",
      ingredientsOnHand: true,
      successRate: 87,
      similarTo: "Penn Law 4/15",
      items: [
        { id: 1, name: "Pepian Chicken (L)", qty: 2, price: 85, cost: 37.5 },
        { id: 2, name: "Black Bean Rice (L)", qty: 2, price: 32, cost: 12.0 },
      ],
      margin: 68,
      status: "BEST",
    },
    {
      id: 2,
      title: "Hearty Taco Bar",
      ingredientsOnHand: true,
      successRate: 92,
      similarTo: "SIG 3/12",
      items: [
        { id: 1, name: "Carne Asada (per lb)", qty: 5, price: 25, cost: 11.0 },
        { id: 2, name: "Corn Tortillas (50)", qty: 1, price: 20, cost: 5.0 },
      ],
      margin: 62,
      status: "GOOD",
    },
    {
      id: 3,
      title: "Vegetarian Celebration",
      ingredientsOnHand: false,
      needs: "squash",
      successRate: 85,
      items: [
        {
          id: 1,
          name: "Stuffed Chile Rellenos (12)",
          qty: 2,
          price: 60,
          cost: 20.0,
        },
        { id: 2, name: "Elote Loco Tray", qty: 1, price: 45, cost: 15.0 },
      ],
      margin: 71,
      status: "HIGH MARGIN",
    },
  ],
  recentOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "Oct 07",
      status: "Confirmed",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "Oct 05",
      status: "Delivered",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "Oct 03",
      status: "Delivered",
      total: 850.0,
    },
    {
      id: "#12342",
      customer: "Comcast",
      date: "Oct 02",
      status: "Delivered",
      total: 1200.0,
    },
    {
      id: "#12341",
      customer: "Penn Law",
      date: "Sep 28",
      status: "Paid",
      total: 450.0,
    },
    {
      id: "#12340",
      customer: "Morgan Lewis",
      date: "Sep 25",
      status: "Paid",
      total: 680.0,
    },
    {
      id: "#12339",
      customer: "SIG",
      date: "Sep 22",
      status: "Paid",
      total: 250.0,
    },
    {
      id: "#12338",
      customer: "GoPuff",
      date: "Sep 19",
      status: "Paid",
      total: 950.0,
    },
    {
      id: "#12337",
      customer: "Penn Law",
      date: "Sep 15",
      status: "Paid",
      total: 720.0,
    },
    {
      id: "#12336",
      customer: "CHOP",
      date: "Sep 12",
      status: "Paid",
      total: 480.0,
    },
  ],
  calendarEvents: [
    {
      date: "2025-10-09",
      customer: "SIG",
      time: "11:00 AM",
      total: 325,
      status: "Confirmed",
    },
    {
      date: "2025-10-10",
      customer: "Wharton Poker Club",
      time: "7:00 PM",
      total: 820,
      status: "Confirmed",
    },
    {
      date: "2025-10-14",
      customer: "Penn Law",
      time: "12:30 PM",
      total: 450,
      status: "Confirmed",
    },
  ],
};

// --- HELPER & LAYOUT COMPONENTS ---
const AppContainer = ({ children }) => (
  <Box sx={{ p: 1, maxWidth: 380, width: "100%", bgcolor: "#f8f9fa" }}>
    {children}
  </Box>
);
const Header = () => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2, p: 1 }}>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF2tJ0eBvs7HLGKNv-xlBNhWXiQKX_zLvpag&s"
      alt="Logo"
      style={{ width: 32, height: 32, marginRight: 12 }}
    />
    <Typography variant="body1" sx={{ fontWeight: "500" }}>
      El Merkury Catering Assistant
    </Typography>
  </Box>
);
const SectionHeader = ({ children, ...props }) => (
  <Typography
    variant="overline"
    color="text.secondary"
    sx={{ display: "flex", alignItems: "center", mt: 2.5, mb: 1 }}
    {...props}
  >
    {children}
  </Typography>
);
const BackButton = ({ onClick, children }) => (
  <Button
    startIcon={<ArrowBack />}
    onClick={onClick}
    sx={{ mb: 1.5, color: "text.secondary" }}
  >
    {children}
  </Button>
);

// --- VIEW COMPONENTS ---

const Homepage = ({ setView, customer, recentOrders }) => (
  <>
    <SectionHeader>📧 Current Email Context:</SectionHeader>
    <Card
      variant="outlined"
      sx={{
        backgroundColor:
          customer.name === "New Customer" ? "#FFF8E1" : "#E3F2FD",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
        >
          {customer.name === "New Customer" ? (
            <Warning color="warning" sx={{ mr: 1 }} />
          ) : (
            <BusinessCenter color="primary" sx={{ mr: 1 }} />
          )}
          {customer.name}
        </Typography>
        {customer.name !== "New Customer" && (
          <>
            <Typography variant="body2">
              📊 {customer.orderCount} orders | $
              {customer.ytdSpend.toLocaleString()} YTD
            </Typography>
            <Typography variant="body2">
              Last order: {customer.lastOrder}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
    <Divider sx={{ my: 2, borderStyle: "dashed" }} />
    <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500 }}>
      What would you like to do?
    </Typography>
    <Button
      fullWidth
      variant="contained"
      startIcon={<ShoppingCart />}
      sx={{ mb: 1, justifyContent: "flex-start", p: 1.5 }}
      onClick={() => setView("processOrderStep1")}
    >
      Process Catering Order
    </Button>
    <Button
      fullWidth
      variant="contained"
      startIcon={<RestaurantMenu />}
      sx={{ mb: 1, justifyContent: "flex-start", p: 1.5 }}
      onClick={() => setView("generateProposalStep1")}
    >
      Generate Menu Proposal
    </Button>
    <Button
      fullWidth
      variant="outlined"
      startIcon={<Email />}
      sx={{ justifyContent: "flex-start", p: 1.5 }}
    >
      Send Menu & Pricing Info
    </Button>
    <SectionHeader>Recent Orders</SectionHeader>
    <List dense>
      {recentOrders.slice(0, 10).map((order) => (
        <ListItem key={order.id} disablePadding>
          <ListItemText
            primary={`• ${order.customer} - ${order.date} (${order.id})`}
          />
        </ListItem>
      ))}
    </List>
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button
        size="small"
        startIcon={<Today />}
        onClick={() => setView("calendarView")}
      >
        Calendar
      </Button>
      <Button
        size="small"
        startIcon={<Search />}
        onClick={() => setView("editOrderSelect")}
      >
        Search Orders
      </Button>
      <Button
        size="small"
        startIcon={<Settings />}
        onClick={() => setView("settingsPage")}
      >
        Settings
      </Button>
    </Box>
  </>
);

const ProcessOrderStep1 = ({ setView, customer, order }) => {
  const [deliveryTime, setDeliveryTime] = useState("12:30");
  const conflict = deliveryTime === "12:30";

  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
      <Typography variant="h6">Step 1 of 3: Customer & Delivery</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        📋 Order #: {order.orderNum}
      </Typography>
      <SectionHeader>
        Customer Information{" "}
        <Tooltip title="Pulled from HubSpot CRM">
          <Info fontSize="small" sx={{ ml: 1 }} color="disabled" />
        </Tooltip>
      </SectionHeader>
      <TextField
        fullWidth
        label="Customer Name"
        defaultValue={customer.contactName}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="Company/Client"
        defaultValue={customer.name}
        margin="dense"
        size="small"
        InputProps={{ endAdornment: <Apartment /> }}
      />
      {customer.name !== "New Customer" && (
        <Card variant="outlined" sx={{ p: 1, mt: 1, bgcolor: "grey.50" }}>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Order History
          </Typography>
          <Typography variant="caption" display="block">
            {customer.orderCount} orders | Avg. $
            {Math.round(customer.ytdSpend / customer.orderCount)}
          </Typography>
        </Card>
      )}
      <SectionHeader>Delivery Details</SectionHeader>
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          fullWidth
          label="Delivery Date"
          defaultValue="2025-10-14"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
        <TextField
          fullWidth
          label="Delivery Time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          size="small"
          type="time"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <AccessTime sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
        />
      </Box>
      <Tooltip title="Pulled from Toast, calculated by system">
        <Alert severity={conflict ? "error" : "success"} sx={{ mt: 1 }}>
          {conflict ? "Conflict: SIG Delivery at 12:00 PM" : "No Conflict"}
        </Alert>
      </Tooltip>
      <Divider sx={{ my: 2 }} />
      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        onClick={() => setView("processOrderStep2")}
      >
        Next: Review Items
      </Button>
    </>
  );
};

const ProcessOrderStep2 = ({ setView, order: initialOrder }) => {
  const [order, setOrder] = useState(initialOrder);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const newSubtotal = order.items.reduce(
      (acc, item) => acc + item.qty * item.unitPrice,
      0
    );
    setSubtotal(newSubtotal);
  }, [order]);

  const totalFoodCost = order.items.reduce(
    (acc, item) => acc + item.qty * item.foodCost,
    0
  );
  const grossProfit = subtotal - totalFoodCost;
  const netProfit = grossProfit - parseFloat(order.deliveryFee || 0);

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        AI detected {order.items.length} items from email.
      </Alert>
      <SectionHeader>Items Ordered</SectionHeader>
      {order.items.map((item, index) => (
        <Card key={item.id} variant="outlined" sx={{ mb: 1.5 }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Email: "{item.emailDesc}"
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
              {item.qty}× {item.matchedItem}
            </Typography>
            <Typography variant="body2">
              = ${(item.qty * item.unitPrice).toFixed(2)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Profitability:
            </Typography>
            <Typography variant="caption" display="block">
              Food Cost: ${(item.qty * item.foodCost).toFixed(2)} (
              {((item.foodCost / item.unitPrice) * 100).toFixed(1)}%) ✅
            </Typography>
            <Typography variant="caption" display="block">
              Profit: $
              {(item.qty * item.unitPrice - item.qty * item.foodCost).toFixed(
                2
              )}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <SectionHeader>Additional Charges</SectionHeader>
      <TextField
        label="Tip"
        value={order.tip}
        onChange={(e) => setOrder({ ...order, tip: e.target.value })}
        size="small"
        margin="dense"
        type="number"
      />
      <TextField
        label="Delivery Fee"
        value={order.deliveryFee}
        onChange={(e) => setOrder({ ...order, deliveryFee: e.target.value })}
        size="small"
        margin="dense"
        type="number"
      />
      <Card variant="outlined" sx={{ my: 2, bgcolor: "grey.50" }}>
        <CardContent>
          <SectionHeader>Order Profitability</SectionHeader>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography>Revenue:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Food Cost:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>
                ${totalFoodCost.toFixed(2)} (
                {((totalFoodCost / subtotal) * 100 || 0).toFixed(1)}%) ✅
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold" }}>Gross Profit:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography sx={{ fontWeight: "bold" }}>
                ${grossProfit.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography>Delivery:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>
                - ${parseFloat(order.deliveryFee || 0).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: netProfit > 0 ? "success.main" : "error.main",
                }}
              >
                Net Profit:
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: netProfit > 0 ? "success.main" : "error.main",
                }}
              >
                ${netProfit.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Alert
            severity="info"
            icon={<Info fontSize="inherit" />}
            sx={{ mt: 2 }}
          >
            💡 Suggestion: Add plantains (+$10 revenue, +$2 cost). New profit: $
            {(netProfit + 8).toFixed(2)}
          </Alert>
          <Alert
            severity="error"
            icon={<Warning fontSize="inherit" />}
            sx={{ mt: 1 }}
          >
            ⚠️ Inventory Warning: Low chicken stock (2 lbs left)
          </Alert>
        </CardContent>
      </Card>
      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowForwardIos />}
        onClick={() => setView("processOrderStep3")}
      >
        Next: Final Review
      </Button>
    </>
  );
};

const ProcessOrderStep3 = ({ setView, order, customer }) => {
  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const total = subtotal + order.deliveryFee + order.tip;
  return (
    <>
      <BackButton onClick={() => setView("processOrderStep2")}>Back</BackButton>
      <Typography variant="h6">Step 3 of 3: Final Review</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Order #{order.orderNum}
      </Typography>
      <SectionHeader>Order Summary</SectionHeader>
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText
            primary={customer.contactName}
            secondary={customer.name}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Warning color="error" />
          </ListItemIcon>
          <ListItemText primary="Tax Exempt | Requires PO" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Apartment />
          </ListItemIcon>
          <ListItemText
            primary={customer.address.line1}
            secondary={`${customer.address.city}, ${customer.address.state} ${customer.address.zip}`}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CalendarMonth />
          </ListItemIcon>
          <ListItemText primary="May 20, 2025 at 12:30 PM" />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        {order.items.map((i) => (
          <ListItem key={i.id}>
            <ListItemText
              primary={`• ${i.qty}× ${i.matchedItem}`}
              secondary={`$${(i.qty * i.unitPrice).toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" align="right" sx={{ my: 2 }}>
        💰 Total: ${total.toFixed(2)}
      </Typography>
      {customer.flags.requiresPO && (
        <>
          <SectionHeader>Penn Special Handling</SectionHeader>
          <Alert severity="warning">This customer requires a PO</Alert>
          <RadioGroup row defaultValue="final">
            <FormControlLabel
              value="preliminary"
              control={<Radio />}
              label="Preliminary (awaiting PO)"
            />
            <FormControlLabel
              value="final"
              control={<Radio />}
              label="Final (PO provided)"
            />
          </RadioGroup>
          <TextField
            fullWidth
            label="PO Number"
            defaultValue="PO-2025-456"
            margin="dense"
            size="small"
          />
        </>
      )}
      <Divider sx={{ my: 2 }} />
      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={<CheckCircle />}
        onClick={() => setView("processOrderConfirmation")}
      >
        PROCESS ORDER
      </Button>
    </>
  );
};

const ProcessOrderConfirmation = ({ setView, order, openEmail }) => (
  <>
    <Box sx={{ textAlign: "center", my: 2 }}>
      <CheckCircle color="success" sx={{ fontSize: 48 }} />
      <Typography variant="h6">Order Processed Successfully!</Typography>
      <Typography color="text.secondary">
        Order #{order.orderNum} | Penn Law | $97.00
      </Typography>
    </Box>
    <SectionHeader>Created in Systems</SectionHeader>
    <List dense>
      <ListItem>
        <ListItemText
          primary="📊 Toast Kitchen Display"
          secondary="Order ID: T-5678"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="💳 QuickBooks Invoice"
          secondary="Invoice #: QBO-1234"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="📈 HubSpot CRM Deal"
          secondary="Stage: Confirmed & In Kitchen"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="📄 Kitchen Sheet (Backup)"
          secondary="Sheet: Kitchen-12345678"
        />
      </ListItem>
    </List>
    <SectionHeader>Email Draft</SectionHeader>
    <Typography variant="body2">
      Draft created with invoice PDF attached and ready to send.
    </Typography>
    <Button
      fullWidth
      variant="contained"
      startIcon={<Email />}
      sx={{ my: 2 }}
      onClick={openEmail}
    >
      Open Email Draft
    </Button>
    <Divider />
    <Button fullWidth sx={{ mt: 2 }} onClick={() => setView("homepage")}>
      🏠 Back to Home
    </Button>
  </>
);

const GenerateProposalStep1 = ({ setView, customer }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
    <Typography variant="h6">Generate Menu Proposal</Typography>
    <Typography color="text.secondary">Customer: {customer.name}</Typography>
    <SectionHeader>Requirements</SectionHeader>
    <TextField
      fullWidth
      label="Budget"
      defaultValue="500.00"
      margin="dense"
      size="small"
      helperText="Recognized by AI from email"
    />
    <TextField
      fullWidth
      label="Number of People"
      defaultValue="30"
      margin="dense"
      size="small"
      helperText="Recognized by AI from email"
    />
    <Typography variant="caption">Per Person Budget: $16.67</Typography>
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => setView("generateProposalStep2")}
    >
      ✨ Generate 3 Proposals
    </Button>
  </>
);

const GenerateProposalStep2 = ({ setView, initialProposals, openEmail }) => {
  const [proposals, setProposals] = useState(
    JSON.parse(JSON.stringify(initialProposals))
  ); // Deep copy

  const handleItemChange = (propId, itemId, field, value) => {
    const updatedProposals = proposals.map((p) => {
      if (p.id === propId) {
        const updatedItems = p.items.map((item) =>
          item.id === itemId ? { ...item, [field]: value } : item
        );
        return { ...p, items: updatedItems };
      }
      return p;
    });
    setProposals(updatedProposals);
  };

  return (
    <>
      <BackButton onClick={() => setView("generateProposalStep1")}>
        Back
      </BackButton>
      <Typography variant="h6">Menu Proposals</Typography>
      {proposals.map((p, i) => {
        const total = p.items.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        );
        return (
          <Accordion key={p.id} defaultExpanded={i === 0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
              <Typography variant="body2" color="primary.main">
                ⭐ Margin: {p.margin}% ({p.status})
              </Typography>
              {p.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}
                >
                  <TextField
                    size="small"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "qty", e.target.value)
                    }
                    type="number"
                    sx={{ width: 70 }}
                  />
                  <Typography sx={{ flexGrow: 1 }}>{item.name}</Typography>
                  <TextField
                    size="small"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "price", e.target.value)
                    }
                    type="number"
                    sx={{ width: 80 }}
                    InputProps={{ startAdornment: "$" }}
                  />
                  <IconButton size="small">
                    <Edit fontSize="inherit" />
                  </IconButton>
                </Box>
              ))}
              <Typography
                sx={{ mt: 1, fontWeight: "bold", textAlign: "right" }}
              >
                Total: ${total.toFixed(2)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={openEmail}>
        Continue with Selected →
      </Button>
    </>
  );
};

const EditOrderSelect = ({ setView, recentOrders }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
    <Typography variant="h6">Edit Existing Order</Typography>
    <TextField
      fullWidth
      label="Search"
      size="small"
      margin="normal"
      InputProps={{ endAdornment: <Search /> }}
    />
    <SectionHeader>Recent Orders</SectionHeader>
    {recentOrders.map((order) => (
      <Card key={order.id} variant="outlined" sx={{ mb: 1.5 }}>
        <CardContent>
          <Typography sx={{ fontWeight: "bold" }}>
            {order.id} - {order.customer}
          </Typography>
          <Typography variant="body2">{order.date}, 2025</Typography>
          <Typography variant="body2">
            Status: {order.status} | Total: ${order.total.toFixed(2)}
          </Typography>
          <Button sx={{ mt: 1 }} onClick={() => setView("editOrderScreen")}>
            Select
          </Button>
        </CardContent>
      </Card>
    ))}
  </>
);

const EditOrderScreen = ({ setView, order: initialOrder }) => {
  const [order, setOrder] = useState(initialOrder);
  return (
    <>
      <BackButton onClick={() => setView("editOrderSelect")}>Cancel</BackButton>
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
            defaultValue={DUMMY_DATA.knownCustomer.contactName}
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
          {order.items.map((item) => (
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
              />
              <Typography sx={{ flexGrow: 1 }}>{item.matchedItem}</Typography>
              <IconButton size="small">
                <Edit fontSize="inherit" />
              </IconButton>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <SectionHeader>What will happen</SectionHeader>
      <List dense>
        <ListItem>
          <Check fontSize="small" /> Update Toast order (new ticket)
        </ListItem>
        <ListItem>
          <Check fontSize="small" /> Void old QBO invoice
        </ListItem>
        <ListItem>
          <Check fontSize="small" /> Create new QBO invoice
        </ListItem>
        <ListItem>
          <Check fontSize="small" /> Update HubSpot deal
        </ListItem>
        <ListItem>
          <Check fontSize="small" /> Send revised invoice email
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="error" startIcon={<Block />}>
          Cancel Order
        </Button>
        <Button
          variant="contained"
          startIcon={<Update />}
          onClick={() => alert("Order Updated!")}
        >
          Update Order
        </Button>
      </Box>
    </>
  );
};

const CalendarView = ({ setView, events }) => {
  const [viewMode, setViewMode] = useState("list");
  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Calendar</Typography>
        <Tabs value={viewMode} onChange={(e, val) => setViewMode(val)}>
          <Tab icon={<ViewList />} value="list" />
          <Tab icon={<ViewModule />} value="grid" />
        </Tabs>
      </Box>
      {viewMode === "list" ? (
        <List>
          {events.map((event) => (
            <ListItem key={event.date}>
              <ListItemText
                primary={`${new Date(event.date).toDateString()}: ${
                  event.customer
                }`}
                secondary={`${event.time} - $${event.total}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ mt: 2 }}>
          (A calendar grid component would be rendered here)
        </Typography>
      )}
    </>
  );
};

const SettingsPage = ({ setView }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back</BackButton>
    <Typography variant="h6">Settings</Typography>
    <SectionHeader>Integrations</SectionHeader>
    <Typography>
      Toast: <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
      Connected
    </Typography>
    <Typography>
      QuickBooks:{" "}
      <CheckCircle color="success" sx={{ verticalAlign: "middle" }} /> Connected
    </Typography>
    <Typography>
      HubSpot: <CheckCircle color="success" sx={{ verticalAlign: "middle" }} />{" "}
      Connected
    </Typography>
    <Button size="small" startIcon={<Replay />}>
      Sync Menu Now
    </Button>
    <SectionHeader>Menu Generation</SectionHeader>
    <TextField size="small" label="Number of proposals" defaultValue="5" />
    <SectionHeader>Notifications</SectionHeader>
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="New website orders"
    />
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Customer replies"
    />
    <Divider sx={{ my: 2 }} />
    <Button variant="contained">Save Settings</Button>
  </>
);

// --- Email Pane Components ---
const EmailPane = ({ content }) => (
  <Box sx={{ flexGrow: 1, p: 3, bgcolor: "white" }}>{content}</Box>
);
const DefaultEmail = () => (
  <Paper elevation={0}>
    <Typography variant="h5">Catering Request for Penn Law</Typography>
    <Typography variant="body2" color="text.secondary">
      From: Ashley Duchi (ashley@law.upenn.edu)
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Typography>Hi Sofia,</Typography>
    <Typography paragraph>
      We'd like to place a catering order for a faculty lunch. We have a budget
      of **$500** and are expecting **30 people**. We need vegetarian options
      and prefer things that travel well.
    </Typography>
    <Typography>Thanks,</Typography>
    <Typography>Ashley</Typography>
  </Paper>
);
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

// --- Main App Component ---
const App = () => {
  const [view, setView] = useState("homepage");
  const [customer, setCustomer] = useState(DUMMY_DATA.knownCustomer);
  const [emailContent, setEmailContent] = useState(<DefaultEmail />);

  const openEmailDraft = (type) => {
    let subject, body;
    if (type === "confirmation") {
      subject = `Your El Merkury Catering Order #${DUMMY_DATA.currentOrder.orderNum} is Confirmed!`;
      body = `Dear Ashley,\n\nThank you for your order! Your invoice is attached.\n\nBest,\nSofia`;
      setView("processOrderConfirmation");
    } else {
      subject = `Menu Proposal for your Event`;
      body = `Hi Ashley,\n\nHere are a couple of proposals for your upcoming event based on your budget...\n\nOPTION 1: Traditional Guatemalan Feast...\n\nOPTION 2: Hearty Taco Bar...`;
      // We don't want to change the right-side view here, just the email
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
        return (
          <EditOrderSelect
            setView={setView}
            recentOrders={DUMMY_DATA.recentOrders}
          />
        );
      case "editOrderScreen":
        return (
          <EditOrderScreen setView={setView} order={DUMMY_DATA.currentOrder} />
        );
      case "settingsPage":
        return <SettingsPage setView={setView} />;
      case "calendarView":
        return (
          <CalendarView setView={setView} events={DUMMY_DATA.calendarEvents} />
        );
      default:
        return <Homepage setView={setView} customer={customer} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.100" }}>
        <EmailPane content={emailContent} />
        <AppContainer>
          <Card>
            <Header />
            <Divider sx={{ mb: 2 }} />
            <CardContent>{renderView()}</CardContent>
          </Card>
          <Button
            size="small"
            fullWidth
            onClick={() => {
              setCustomer(
                customer.name === "New Customer"
                  ? DUMMY_DATA.knownCustomer
                  : DUMMY_DATA.newCustomer
              );
              setEmailContent(<DefaultEmail />);
              setView("homepage");
            }}
            sx={{ mt: 2, textTransform: "uppercase", color: "text.secondary" }}
          >
            Reset & Toggle Customer
          </Button>
        </AppContainer>
      </Box>
    </ThemeProvider>
  );
};

export default App;
