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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
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
  Add,
  RemoveCircleOutline,
  Event,
  History,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// --- THEME ---
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    success: { main: "#34a853" },
    warning: { main: "#fbbc05" },
    error: { main: "#ea4335" },
    info: { main: "#4285F4" },
    grey: { 50: "#f8f9fa", 100: "#f1f3f4", 200: "#e9ecef" },
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

// --- DUMMY DATA V2.0 ---
const DUMMY_DATA = {
  knownCustomer: {
    name: "Penn Law",
    clientSince: "2021",
    avgMargin: 42,
    orderCount: 15,
    ytdSpend: 12450,
    lastOrder: "October 7, 2025",
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
        estFoodCost: 4.5,
        estLaborCost: 1.5,
      },
      {
        id: 2,
        emailDesc: "Small Cheesy Rice",
        matchedItem: "Cheesy Rice (S)",
        confidence: "High",
        qty: 2,
        unitPrice: 8.0,
        notes: "Vegan option",
        estFoodCost: 2.4,
        estLaborCost: 0.75,
      },
      {
        id: 3,
        emailDesc: "Plantain chips",
        matchedItem: "Plantain Chips",
        confidence: "High",
        qty: 1,
        unitPrice: 10.0,
        notes: "",
        estFoodCost: 3.2,
        estLaborCost: 0.5,
      },
    ],
    deliveryFee: 25.0,
    tip: 10.0,
    utensils: { included: true, count: 30, costPer: 0.15 },
  },
  proposals: [
    {
      id: 1,
      title: "Traditional Guatemalan Feast",
      items: [
        {
          id: 1,
          name: "Pepian Chicken (L)",
          qty: 2,
          price: 85,
          cost: 37.5,
          labor: 10,
        },
        {
          id: 2,
          name: "Black Bean Rice (L)",
          qty: 2,
          price: 32,
          cost: 12.0,
          labor: 4,
        },
      ],
    },
    {
      id: 2,
      title: "Hearty Taco Bar",
      items: [
        {
          id: 1,
          name: "Carne Asada (per lb)",
          qty: 5,
          price: 25,
          cost: 11.0,
          labor: 3,
        },
        {
          id: 2,
          name: "Corn Tortillas (50)",
          qty: 1,
          price: 20,
          cost: 5.0,
          labor: 2,
        },
      ],
    },
  ],
  recentOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "Oct 07",
      status: "scheduled",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "Oct 05",
      status: "completed",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "Oct 03",
      status: "completed",
      total: 850.0,
    },
    {
      id: "#12342",
      customer: "Comcast",
      date: "Oct 02",
      status: "completed",
      total: 1200.0,
    },
    {
      id: "#12341",
      customer: "Penn Law",
      date: "Sep 28",
      status: "completed",
      total: 450.0,
    },
  ],
  allOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "2025-10-07",
      status: "scheduled",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "2025-10-05",
      status: "completed",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "2025-10-03",
      status: "completed",
      total: 850.0,
    },
    {
      id: "#12342",
      customer: "Comcast",
      date: "2025-10-02",
      status: "completed",
      total: 1200.0,
    },
    {
      id: "#12341",
      customer: "Penn Law",
      date: "2025-09-28",
      status: "completed",
      total: 450.0,
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
        {customer.name === "New Customer" ? (
          <Typography
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <Warning color="warning" sx={{ mr: 1 }} />
            {customer.name}
          </Typography>
        ) : (
          <>
            <Typography
              sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
            >
              <BusinessCenter color="primary" sx={{ mr: 1 }} />
              {customer.name}
            </Typography>
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
    <Button
      fullWidth
      onClick={() => setView("searchOrders")}
      sx={{ justifyContent: "flex-start", mt: 2.5, mb: 1 }}
    >
      <Typography variant="overline" color="text.secondary">
        Recent Orders
      </Typography>
    </Button>
    <List dense>
      {recentOrders.slice(0, 5).map((order) => (
        <ListItem key={order.id} disablePadding>
          <ListItemIcon sx={{ minWidth: 30 }}>
            {order.status === "scheduled" ? (
              <Event color="primary" />
            ) : (
              <History color="action" />
            )}
          </ListItemIcon>
          <ListItemText
            primary={`${order.customer} - ${order.date}`}
            secondary={`$${order.total.toFixed(2)}`}
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
        onClick={() => setView("searchOrders")}
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
      <Select fullWidth defaultValue={customer.name} size="small">
        <MenuItem value="Penn Law">Penn Law</MenuItem>
        <MenuItem value="Wharton">Wharton</MenuItem>
        <MenuItem value="SIG">SIG</MenuItem>
      </Select>
      {customer.name !== "New Customer" && (
        <Card variant="outlined" sx={{ p: 1.5, mt: 1, bgcolor: "grey.50" }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Client Since:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                {customer.clientSince}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Total Volume:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                ${customer.ytdSpend.toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Avg. Order:
              </Typography>
              <Typography variant="body2" fontWeight="500">
                ${Math.round(customer.ytdSpend / customer.orderCount)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" display="block">
                Avg. Margin:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="500"
                color={
                  customer.avgMargin > 40 ? "success.main" : "warning.main"
                }
              >
                {customer.avgMargin}% (
                {customer.avgMargin > 40 ? "Strong" : "Weak"})
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
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
  const [editingFee, setEditingFee] = useState(null);

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const totalFoodCost = order.items.reduce(
    (acc, item) => acc + item.qty * item.estFoodCost,
    0
  );
  const totalLaborCost = order.items.reduce(
    (acc, item) => acc + item.qty * item.estLaborCost,
    0
  );
  const grossProfit = subtotal - totalFoodCost - totalLaborCost;
  const netProfit = grossProfit - parseFloat(order.deliveryFee || 0);

  return (
    <>
      <BackButton onClick={() => setView("processOrderStep1")}>Back</BackButton>
      <Typography variant="h6">Step 2 of 3: Items & Pricing</Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        AI detected {order.items.length} items from email.
      </Alert>
      <SectionHeader>
        Items Ordered{" "}
        <Tooltip title="Pulled from Toast">
          <Info fontSize="small" sx={{ ml: 1 }} color="disabled" />
        </Tooltip>
      </SectionHeader>
      {order.items.map((item) => (
        <Card key={item.id} variant="outlined" sx={{ mb: 1.5 }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              Email: "{item.emailDesc}"
            </Typography>
            <Select
              fullWidth
              defaultValue={item.matchedItem}
              size="small"
              sx={{ my: 1 }}
            >
              <MenuItem value={item.matchedItem}>{item.matchedItem}</MenuItem>
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                label="Qty"
                defaultValue={item.qty}
                size="small"
                type="number"
                sx={{ width: "70px" }}
              />
              <Typography>
                x ${item.unitPrice.toFixed(2)} ={" "}
                <b>${(item.qty * item.unitPrice).toFixed(2)}</b>
              </Typography>
              <IconButton size="small">
                <RemoveCircleOutline color="error" />
              </IconButton>
            </Box>
            <Accordion sx={{ mt: 1, boxShadow: "none", bgcolor: "grey.50" }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="caption">Profitability</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption">Est Food Cost:</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography variant="caption">
                      ${(item.qty * item.estFoodCost).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption">Est Labor Cost:</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography variant="caption">
                      ${(item.qty * item.estLaborCost).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" fontWeight="bold">
                      Gross Margin:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      color="success.main"
                    >
                      $
                      {(
                        item.qty * item.unitPrice -
                        item.qty * item.estFoodCost -
                        item.qty * item.estLaborCost
                      ).toFixed(2)}{" "}
                      (
                      {(
                        ((item.unitPrice -
                          item.estFoodCost -
                          item.estLaborCost) /
                          item.unitPrice) *
                        100
                      ).toFixed(0)}
                      %)
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      ))}
      <SectionHeader>Additional Charges</SectionHeader>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Tip:</Typography>
          {editingFee === "tip" ? (
            <TextField
              value={order.tip}
              onChange={(e) => setOrder({ ...order, tip: e.target.value })}
              onBlur={() => setEditingFee(null)}
              size="small"
              type="number"
              sx={{ width: 80 }}
              autoFocus
            />
          ) : (
            <Typography>
              ${parseFloat(order.tip || 0).toFixed(2)}{" "}
              <IconButton size="small" onClick={() => setEditingFee("tip")}>
                <Edit fontSize="inherit" />
              </IconButton>
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Typography>Delivery Fee:</Typography>
          {editingFee === "delivery" ? (
            <TextField
              value={order.deliveryFee}
              onChange={(e) =>
                setOrder({ ...order, deliveryFee: e.target.value })
              }
              onBlur={() => setEditingFee(null)}
              size="small"
              type="number"
              sx={{ width: 80 }}
              autoFocus
            />
          ) : (
            <Typography>
              ${parseFloat(order.deliveryFee || 0).toFixed(2)}{" "}
              <IconButton
                size="small"
                onClick={() => setEditingFee("delivery")}
              >
                <Edit fontSize="inherit" />
              </IconButton>
            </Typography>
          )}
        </Box>
      </Paper>
      <Card variant="outlined" sx={{ my: 2, bgcolor: "grey.50" }}>
        <CardContent>
          <SectionHeader>Order Profitability</SectionHeader>
          <Grid container spacing={0.5}>
            <Grid item xs={6}>
              <Typography>Revenue:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Est Food Cost:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>- ${totalFoodCost.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Est Labor Cost:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>- ${totalLaborCost.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 0.5 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography fontWeight="bold">Gross Profit:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography fontWeight="bold">
                ${grossProfit.toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Delivery Fee:</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography>
                - ${parseFloat(order.deliveryFee || 0).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 0.5 }} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                fontWeight="bold"
                color={netProfit > 0 ? "success.main" : "error.main"}
              >
                Net Profit:
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography
                fontWeight="bold"
                color={netProfit > 0 ? "success.main" : "error.main"}
              >
                ${netProfit.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
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
  const utensilsTotal = order.utensils.included
    ? order.utensils.count * order.utensils.costPer
    : 0;
  const total =
    subtotal +
    parseFloat(order.deliveryFee) +
    parseFloat(order.tip) +
    utensilsTotal;
  return (
    <>
      <BackButton onClick={() => setView("processOrderStep2")}>Back</BackButton>
      <Typography variant="h6">Step 3 of 3: Final Review</Typography>
      <Paper variant="outlined" sx={{ p: 2, my: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Order Summary</Typography>
          </Grid>
          {order.items.map((i) => (
            <React.Fragment key={i.id}>
              <Grid item xs={8}>
                {i.qty}× {i.matchedItem}
              </Grid>
              <Grid item xs={4} textAlign="right">
                ${(i.qty * i.unitPrice).toFixed(2)}
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={8}>
            Items Subtotal
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${subtotal.toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Delivery Fee
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${parseFloat(order.deliveryFee).toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Tip
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${parseFloat(order.tip).toFixed(2)}
          </Grid>
          <Grid item xs={8}>
            Utensils ({order.utensils.count} sets)
          </Grid>
          <Grid item xs={4} textAlign="right">
            ${utensilsTotal.toFixed(2)}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight="bold">Grand Total</Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {customer.flags.requiresPO && (
        <>
          <SectionHeader>Penn Special Handling</SectionHeader>
          <Alert severity="warning">This customer requires a PO</Alert>
          <TextField
            fullWidth
            label="PO Number"
            defaultValue="PO-2025-456"
            margin="dense"
            size="small"
          />
        </>
      )}
      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        sx={{ mt: 2 }}
        startIcon={<CheckCircle />}
        onClick={() => setView("processOrderConfirmation")}
      >
        PROCESS ORDER
      </Button>
    </>
  );
};

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
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: p.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : p
      )
    );
  };
  const handleRemoveItem = (propId, itemId) => {
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? { ...p, items: p.items.filter((item) => item.id !== itemId) }
          : p
      )
    );
  };
  const handleAddItem = (propId) => {
    setProposals(
      proposals.map((p) =>
        p.id === propId
          ? {
              ...p,
              items: [
                ...p.items,
                {
                  id: Date.now(),
                  name: "New Item",
                  qty: 1,
                  price: 10,
                  cost: 4,
                  labor: 1,
                },
              ],
            }
          : p
      )
    );
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
        const totalCost = p.items.reduce(
          (acc, item) => acc + item.qty * item.cost,
          0
        );
        const totalLabor = p.items.reduce(
          (acc, item) => acc + item.qty * item.labor,
          0
        );
        const margin = ((total - totalCost - totalLabor) / total) * 100 || 0;
        return (
          <Accordion key={p.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: "bold" }}>{p.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
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
                  <TextField
                    fullWidth
                    size="small"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(p.id, item.id, "name", e.target.value)
                    }
                  />
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
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveItem(p.id, item.id)}
                  >
                    <Close color="error" />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<Add />}
                size="small"
                onClick={() => handleAddItem(p.id)}
              >
                Add Item
              </Button>
              <Divider sx={{ my: 1 }} />
              <Box textAlign="right">
                <Typography fontWeight="bold">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  color={margin > 40 ? "success.main" : "warning.main"}
                >
                  Est. Margin: {margin.toFixed(1)}%
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={openEmail}
              >
                Select Proposal
              </Button>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

const EditOrderScreen = ({ setView, order: initialOrder, customer }) => {
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
            defaultValue={customer.contactName}
            margin="dense"
            size="small"
          />
          <TextField
            fullWidth
            label="Address"
            defaultValue={customer.address.line1}
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

const SearchOrders = ({ setView, orders }) => {
  return (
    <>
      <BackButton onClick={() => setView("homepage")}>Back</BackButton>
      <Typography variant="h6">Search Orders</Typography>
      <Box sx={{ display: "flex", gap: 1, my: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Select
        multiple
        defaultValue={["Penn Law"]}
        fullWidth
        size="small"
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        <MenuItem value="Penn Law">Penn Law</MenuItem>
        <MenuItem value="SIG">SIG</MenuItem>
        <MenuItem value="Wharton">Wharton</MenuItem>
      </Select>
      <List>
        {orders.map((order) => (
          <Card key={order.id} variant="outlined" sx={{ mb: 1.5 }}>
            <CardContent>
              <Typography fontWeight="bold">
                {order.id} - {order.customer}
              </Typography>
              <Typography variant="body2">{order.date}</Typography>
              <Typography variant="body2">
                Status: {order.status} | Total: ${order.total.toFixed(2)}
              </Typography>
              <Button sx={{ mt: 1 }} onClick={() => setView("editOrderScreen")}>
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  );
};

const CalendarView = ({ setView, events }) => {
  const [viewMode, setViewMode] = useState("grid");
  const today = new Date("2025-10-08");
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const days = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);
  const firstDayIndex = startOfMonth.getDay();

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
        <Typography variant="h6">October 2025</Typography>
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
        <Grid container columns={7} sx={{ mt: 2 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
            <Grid item xs={1} key={day} textAlign="center">
              <Typography variant="caption" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <Grid item xs={1} key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const event = events.find(
              (e) => new Date(e.date).getDate() + 1 === day
            );
            return (
              <Grid item xs={1} key={day}>
                <Paper
                  variant="outlined"
                  sx={{
                    height: 60,
                    p: 0.5,
                    bgcolor: event ? "primary.main" : "transparent",
                    color: event ? "white" : "inherit",
                  }}
                >
                  <Typography fontWeight="bold">{day}</Typography>
                  {event && (
                    <Typography variant="caption" display="block" noWrap>
                      {event.customer}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

// --- Email Pane Components ---
const EmailPane = ({ content }) => (
  <Box sx={{ flexGrow: 1, p: 3, bgcolor: "white" }}>{content}</Box>
);
const SettingsPage = ({ setView }) => (
  <>
    <BackButton onClick={() => setView("homepage")}>Back</BackButton>
    <Typography variant="h6">Settings</Typography>
  </>
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
      startIcon={<Email />}
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

// --- Main App ---
const App = () => {
  const [view, setView] = useState("homepage");
  const [customer, setCustomer] = useState(DUMMY_DATA.knownCustomer);
  const [emailContent, setEmailContent] = useState(<DefaultEmail />);

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

const DefaultEmail = () => (
  <Paper elevation={0}>
    <Typography variant="h5">Catering Request for Penn Law</Typography>
    <Typography variant="body2" color="text.secondary">
      From: Ashley Duchi (ashley@law.upenn.edu)
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Typography>Hi Sofia,</Typography>
    <Typography paragraph>
      We'd like to place a catering order. We have a budget of **$500** and **30
      people**.
    </Typography>
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

export default App;
