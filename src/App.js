import React, { useState } from "react";
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
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// --- THEME to match Google's Material Design aesthetic ---
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Google Blue
    },
    success: {
      main: "#34a853", // Google Green
    },
    warning: {
      main: "#fbbc05", // Google Yellow
    },
    error: {
      main: "#ea4335", // Google Red
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "4px",
        },
      },
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

// --- DUMMY DATA based on the wireframe document ---
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
        emailDesc: "Large Chicken Bowl",
        matchedItem: "Chicken Bowl (L)",
        confidence: "High",
        qty: 3,
        unitPrice: 12.0,
        notes: "Extra cilantro, no onions",
      },
      {
        emailDesc: "Small Cheesy Rice",
        matchedItem: "Cheesy Rice (S)",
        confidence: "High",
        qty: 2,
        unitPrice: 8.0,
        notes: "Vegan option",
      },
      {
        emailDesc: "Plantain chips",
        matchedItem: "Plantain Chips",
        confidence: "High",
        qty: 1,
        unitPrice: 10.0,
        notes: "",
      },
    ],
    deliveryFee: 25.0,
    tip: 10.0,
  },
  proposals: [
    {
      title: "Traditional Guatemalan Feast",
      ingredientsOnHand: true,
      successRate: 87,
      similarTo: "Penn Law 4/15",
      items: [
        { name: "Large Pepian Chicken", price: 85 },
        { name: "2× Black Bean Rice", price: 32 },
      ],
      total: 247,
    },
    {
      title: "Build-Your-Own Bowl Bar",
      ingredientsOnHand: false,
      needs: "cilantro",
      successRate: 92,
      total: 450,
    },
  ],
  recentOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "May 20",
      status: "Confirmed",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "May 18",
      status: "Delivered",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "May 15",
      status: "Delivered",
      total: 850.0,
    },
  ],
};

// --- HELPER & LAYOUT COMPONENTS ---
const AppContainer = ({ children }) => (
  <Box sx={{ p: 1, maxWidth: 380, margin: "auto", bgcolor: "#f8f9fa" }}>
    <Card sx={{ boxShadow: "none" }}>
      <CardContent>{children}</CardContent>
    </Card>
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

const SectionHeader = ({ children }) => (
  <Typography
    variant="overline"
    color="text.secondary"
    sx={{ display: "block", mt: 2.5, mb: 1 }}
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
      {recentOrders.map((order) => (
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

const ProcessOrderStep1 = ({ setView, customer, order }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back to Home</BackButton>
    <Typography variant="h6">Step 1 of 3: Customer & Delivery</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      📋 Order #: {order.orderNum}
    </Typography>
    <SectionHeader>Customer Information</SectionHeader>
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
    {customer.flags.taxExempt && (
      <Alert
        severity="warning"
        icon={<Warning fontSize="inherit" />}
        sx={{ mt: 1 }}
      >
        Tax Exempt | Requires PO
      </Alert>
    )}
    <TextField
      fullWidth
      label="Email"
      defaultValue={customer.contactEmail}
      margin="dense"
      size="small"
    />
    <TextField
      fullWidth
      label="Phone"
      defaultValue={customer.contactPhone}
      margin="dense"
      size="small"
    />
    <SectionHeader>Delivery Details</SectionHeader>
    <TextField
      fullWidth
      label="Address Line 1"
      defaultValue={customer.address.line1}
      margin="dense"
      size="small"
    />
    <TextField
      fullWidth
      label="Address Line 2"
      defaultValue={customer.address.line2}
      margin="dense"
      size="small"
    />
    <Box sx={{ display: "flex", gap: 1 }}>
      <TextField
        label="State"
        defaultValue={customer.address.state}
        margin="dense"
        size="small"
      />
      <TextField
        label="ZIP Code"
        defaultValue={customer.address.zip}
        margin="dense"
        size="small"
      />
    </Box>
    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
      <TextField
        fullWidth
        label="Delivery Date"
        defaultValue="2025-05-20"
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
        defaultValue="12:30"
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
    <SectionHeader>Options</SectionHeader>
    <FormControlLabel control={<Switch />} label="Include Utensils?" />
    <TextField
      label="How many sets?"
      size="small"
      type="number"
      margin="dense"
    />
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

const ProcessOrderStep2 = ({ setView, order }) => {
  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const total = subtotal + order.deliveryFee + order.tip;
  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <Typography variant="body2" color="text.secondary">
        Order #{order.orderNum} | Penn Law
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        AI detected {order.items.length} items from email.
      </Alert>
      <SectionHeader>Items Ordered</SectionHeader>
      {order.items.map((item, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 1.5 }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Email: "{item.emailDesc}"
            </Typography>
            <Select
              fullWidth
              defaultValue={item.matchedItem}
              size="small"
              sx={{ mt: 1 }}
            >
              <MenuItem value={item.matchedItem}>{item.matchedItem}</MenuItem>
            </Select>
            <Typography variant="caption" color="success.main">
              Confidence: ✅ High
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <TextField
                label="Qty"
                defaultValue={item.qty}
                size="small"
                type="number"
                sx={{ width: "70px" }}
              />
              <Typography>x ${item.unitPrice.toFixed(2)}</Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                = ${(item.qty * item.unitPrice).toFixed(2)}
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Flavors/Notes"
              defaultValue={item.notes}
              size="small"
              margin="dense"
            />
            <Button
              fullWidth
              size="small"
              startIcon={<Close />}
              sx={{ mt: 1, color: "text.secondary" }}
            >
              Remove Item
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button fullWidth startIcon={<Edit />} sx={{ mt: 1 }}>
        + Add Another Item
      </Button>
      <SectionHeader>Additional Charges</SectionHeader>
      <Box sx={{ textAlign: "right" }}>
        <Typography>Items Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Typography>Tip: ${order.tip.toFixed(2)}</Typography>
        <Typography>Delivery Fee: ${order.deliveryFee.toFixed(2)}</Typography>
        <Typography color="text.secondary">(Penn Law - Tax Exempt)</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6">TOTAL: ${total.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => setView("processOrderStep1")}>← Back</Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIos />}
          onClick={() => setView("processOrderStep3")}
        >
          Next: Final Review
        </Button>
      </Box>
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
          <ListItem key={i.matchedItem}>
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

const ProcessOrderConfirmation = ({ setView, order }) => (
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
    <Button fullWidth variant="contained" startIcon={<Email />} sx={{ my: 2 }}>
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
    />
    <TextField
      fullWidth
      label="Number of People"
      defaultValue="30"
      margin="dense"
      size="small"
    />
    <Typography variant="caption">Per Person Budget: $16.67</Typography>
    <SectionHeader>Event Details</SectionHeader>
    <Select fullWidth defaultValue="lunch" size="small" sx={{ mt: 1 }}>
      <MenuItem value="lunch">Corporate Lunch</MenuItem>
    </Select>
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Vegetarian options"
    />
    <TextField
      fullWidth
      label="Customer Notes/Preferences"
      defaultValue="Need options that travel well, prefer not too spicy"
      multiline
      rows={3}
      margin="normal"
    />
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => setView("generateProposalStep2")}
    >
      ✨ Generate 5 Proposals
    </Button>
  </>
);

const GenerateProposalStep2 = ({ setView, proposals }) => (
  <>
    <BackButton onClick={() => setView("generateProposalStep1")}>
      Back
    </BackButton>
    <Typography variant="h6">Menu Proposals</Typography>
    <Alert severity="info" sx={{ my: 2 }}>
      Generated {proposals.length} proposals based on inventory, past orders,
      and budget.
    </Alert>
    {proposals.map((p, i) => (
      <Accordion key={i} defaultExpanded={i === 0}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
          <Typography
            variant="body2"
            color={p.ingredientsOnHand ? "success.main" : "warning.main"}
          >
            {p.ingredientsOnHand
              ? "✅ All ingredients on hand"
              : `⚠️ Need to order: ${p.needs}`}
          </Typography>
          <Typography variant="body2" color="primary.main">
            ⭐ {p.successRate}% success rate
          </Typography>
          <Divider sx={{ my: 1 }} />
          {p.items?.map((item) => (
            <Typography key={item.name}>
              • {item.name} - ${item.price}
            </Typography>
          ))}
          <Typography sx={{ mt: 1, fontWeight: "bold" }}>
            Total: ${p.total}
          </Typography>
          <Button size="small" variant="contained" sx={{ mt: 1 }}>
            ✓ Select
          </Button>
        </AccordionDetails>
      </Accordion>
    ))}
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => alert("Email draft created!")}
    >
      Continue with Selected →
    </Button>
  </>
);

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

const EditOrderScreen = ({ setView }) => (
  <>
    <BackButton onClick={() => setView("editOrderSelect")}>Cancel</BackButton>
    <Typography variant="h6">Edit Order #12345</Typography>
    <Alert severity="warning" sx={{ my: 2 }}>
      This order is already in Toast, QuickBooks, and HubSpot. Changes will
      update all systems.
    </Alert>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        Customer & Delivery
      </AccordionSummary>
      <AccordionDetails>
        {" "}
        (Editable customer fields would go here){" "}
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>Items</AccordionSummary>
      <AccordionDetails> (Editable item list would go here) </AccordionDetails>
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

// FIX: Renamed this component from "Settings" to "SettingsPage"
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

// --- Main App Component ---
const App = () => {
  const [view, setView] = useState("homepage");
  const [customer, setCustomer] = useState(DUMMY_DATA.knownCustomer);

  // Simple loading state simulation
  if (view.includes("loading")) {
    return (
      <AppContainer>
        <Header />
        <Divider />
        <Box sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>{view.split("-")[1]}...</Typography>
        </Box>
      </AppContainer>
    );
  }

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
          />
        );
      case "generateProposalStep1":
        return <GenerateProposalStep1 setView={setView} customer={customer} />;
      case "generateProposalStep2":
        return (
          <GenerateProposalStep2
            setView={setView}
            proposals={DUMMY_DATA.proposals}
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
        return <EditOrderScreen setView={setView} />;
      // FIX: Changed this to render the renamed component
      case "settingsPage":
        return <SettingsPage setView={setView} />;
      default:
        return <Homepage setView={setView} customer={customer} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <Divider sx={{ mb: 2 }} />
        {renderView()}
        <Button
          size="small"
          fullWidth
          onClick={() =>
            setCustomer(
              customer.name === "New Customer"
                ? DUMMY_DATA.knownCustomer
                : DUMMY_DATA.newCustomer
            )
          }
          sx={{ mt: 2, textTransform: "uppercase", color: "text.secondary" }}
        >
          Toggle Customer Context
        </Button>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
