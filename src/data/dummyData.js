// ============================================================================
// DUMMY DATA - El Merkury Catering Assistant
// Structured for easy porting to Google Apps Script
// ============================================================================

export const DUMMY_DATA = {
  // ==========================================================================
  // CUSTOMERS (HubSpot Source of Truth)
  // ==========================================================================

  knownCustomer: {
    id: "hs_001",
    name: "Penn Law",
    category: "Institutional", // Institutional, Corporate, Individual, Satellite
    clientSince: "2021",
    avgMargin: 60,
    orderCount: 15,
    ytdSpend: 12450,
    ytdOrders: 15,
    avgOrderValue: 830,
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
    flags: {
      taxExempt: true,
      requiresPO: true, // All Penn entities require PO
      paymentTerms: "NET-30",
    },
    preferredItems: ["Pepian Chicken", "Black Bean Rice", "Plantains"],
    orderPatterns: {
      peakSeason: "Q4 (faculty events)",
      avgLeadTime: "5 days",
      preferredDeliveryWindow: "12:00 PM - 1:00 PM",
    },
    paymentBehavior: "Always on-time",
    qboCustomerId: "CUST-001234",
    toastCustomerGuid: "abc-123-def-456",
  },

  otherCustomer: {
    id: "hs_002",
    name: "SIG",
    category: "Corporate",
    clientSince: "2022",
    avgMargin: 72,
    orderCount: 8,
    ytdSpend: 8800,
    ytdOrders: 8,
    avgOrderValue: 1100,
    lastOrder: "October 5, 2025",
    contactName: "David Kim",
    contactEmail: "dk@sig.com",
    contactPhone: "(610) 555-9876",
    address: {
      line1: "123 Market Street",
      line2: "",
      city: "Bala Cynwyd",
      state: "PA",
      zip: "19004",
    },
    flags: {
      taxExempt: false,
      requiresPO: false,
      paymentTerms: "NET-15",
    },
    preferredItems: ["Taco Bar", "Horchata"],
    orderPatterns: {
      peakSeason: "Year-round (weekly lunches)",
      avgLeadTime: "2 days",
      preferredDeliveryWindow: "11:00 AM - 12:00 PM",
    },
    paymentBehavior: "Always on-time",
    qboCustomerId: "CUST-001235",
    toastCustomerGuid: "def-456-ghi-789",
  },

  mannCenter: {
    id: "hs_003",
    name: "Mann Center",
    category: "Satellite",
    clientSince: "2023",
    avgMargin: 55,
    orderCount: 6,
    ytdSpend: 5100,
    ytdOrders: 6,
    avgOrderValue: 850,
    lastOrder: "September 15, 2025",
    contactName: "Events Manager",
    contactEmail: "events@manncenter.org",
    contactPhone: "(215) 555-7890",
    address: {
      line1: "5201 Parkside Avenue",
      line2: "VIP Tent Area",
      city: "Philadelphia",
      state: "PA",
      zip: "19131",
    },
    flags: {
      taxExempt: false,
      requiresPO: false,
      paymentTerms: "Due on Receipt",
    },
    satelliteType: "Mann Center", // Mann Center, Churro Bike, Other
    orderPatterns: {
      orderType: "Known recurring (rice bowls for X attendees)",
      avgLeadTime: "7 days",
      preferredDeliveryWindow: "4:00 PM - 5:00 PM (before concerts)",
    },
    paymentBehavior: "Prepaid",
    qboCustomerId: "CUST-001236",
    toastCustomerGuid: "ghi-789-jkl-012",
  },

  newCustomer: {
    name: "New Customer",
    category: "Unknown",
    orderCount: 0,
    ytdSpend: 0,
    lastOrder: "N/A",
  },

  // ==========================================================================
  // CURRENT ORDER (Email-based catering order)
  // ==========================================================================

  currentOrder: {
    orderNum: "12345678",
    orderType: "email", // email, website, satellite
    channel: "Email Catering",
    items: [
      {
        id: 1,
        emailDesc: "Large Chicken Bowl",
        matchedItem: "Chicken Bowl (L)",
        toastItemGuid: "toast-item-001",
        confidence: "High",
        qty: 3,
        unitPrice: 12.0,
        notes: "Extra cilantro, no onions",
        // MarginEdge cost data
        marginEdge: {
          foodCost: 4.5,
          foodCostPercent: 37.5,
          laborHours: 0.25,
          laborCost: 6.25, // 0.25 hrs * $25/hr
          ingredients: [
            {
              name: "Chicken breast",
              qty: "0.5 lbs",
              cost: 1.75,
              inStock: true,
              stockQty: "15 lbs",
            },
            {
              name: "Rice",
              qty: "0.3 lbs",
              cost: 0.45,
              inStock: true,
              stockQty: "20 lbs",
            },
            {
              name: "Cilantro",
              qty: "0.1 oz",
              cost: 0.3,
              inStock: false,
              stockQty: "0.5 lbs",
            },
            {
              name: "Black beans",
              qty: "0.2 lbs",
              cost: 0.3,
              inStock: true,
              stockQty: "10 lbs",
            },
          ],
        },
      },
      {
        id: 2,
        emailDesc: "Small Cheesy Rice",
        matchedItem: "Cheesy Rice (S)",
        toastItemGuid: "toast-item-002",
        confidence: "High",
        qty: 2,
        unitPrice: 8.0,
        notes: "Vegan option",
        marginEdge: {
          foodCost: 2.4,
          foodCostPercent: 30.0,
          laborHours: 0.1,
          laborCost: 2.5,
          ingredients: [
            {
              name: "Rice",
              qty: "0.4 lbs",
              cost: 0.6,
              inStock: true,
              stockQty: "20 lbs",
            },
            {
              name: "Vegan cheese",
              qty: "0.2 lbs",
              cost: 0.8,
              inStock: true,
              stockQty: "5 lbs",
            },
            {
              name: "Butter (vegan)",
              qty: "0.1 oz",
              cost: 0.2,
              inStock: true,
              stockQty: "2 lbs",
            },
          ],
        },
      },
      {
        id: 3,
        emailDesc: "Plantain chips",
        matchedItem: "Plantain Chips",
        toastItemGuid: "toast-item-003",
        confidence: "High",
        qty: 1,
        unitPrice: 10.0,
        notes: "",
        marginEdge: {
          foodCost: 3.2,
          foodCostPercent: 32.0,
          laborHours: 0.05,
          laborCost: 1.25,
          ingredients: [
            {
              name: "Plantains",
              qty: "3 units",
              cost: 1.5,
              inStock: false,
              stockQty: "5 units",
            },
            {
              name: "Oil",
              qty: "2 oz",
              cost: 0.5,
              inStock: true,
              stockQty: "5 gal",
            },
            {
              name: "Salt",
              qty: "0.1 oz",
              cost: 0.05,
              inStock: true,
              stockQty: "5 lbs",
            },
          ],
        },
      },
    ],
    deliveryFee: 25.0,
    tip: 10.0,
    utensils: { included: true, count: 30, costPer: 0.15 },
  },

  // Satellite order example (Mann Center)
  satelliteOrder: {
    orderNum: "12345680",
    orderType: "satellite",
    channel: "Satellite Event",
    satelliteLocation: "Mann Center",
    customDescription: "Rice bowls for 500 concert attendees, ready by 5pm",
    items: [
      {
        id: 1,
        customItem: true,
        matchedItem: "Custom Rice Bowl Trays (serves 500)",
        qty: 10,
        unitPrice: 85.0,
        notes: "Large aluminum trays, keep warm",
        marginEdge: {
          foodCost: 35.0,
          foodCostPercent: 41.2,
          laborHours: 3.0,
          laborCost: 75.0,
        },
      },
    ],
    deliveryFee: 50.0,
    tip: 0,
    utensils: { included: true, count: 500, costPer: 0.15 },
  },

  // Website order example
  websiteOrder: {
    orderNum: "12345679",
    orderType: "website",
    channel: "Website",
    paymentStatus: "PAID",
    paymentMethod: "Stripe",
    paymentId: "pi_abc123xyz",
    items: [
      {
        id: 1,
        matchedItem: "Taco Bar (serves 20)",
        qty: 2,
        unitPrice: 120.0,
        marginEdge: {
          foodCost: 45.0,
          foodCostPercent: 37.5,
          laborHours: 1.5,
          laborCost: 37.5,
        },
      },
    ],
    deliveryFee: 25.0,
    tip: 20.0,
    utensils: { included: true, count: 40, costPer: 0.15 },
  },

  // ==========================================================================
  // PO TRACKING QUEUE (Penn entities awaiting PO)
  // ==========================================================================

  poTrackingQueue: [
    {
      orderNum: "12345678",
      customerName: "Penn Law",
      contactEmail: "ashley@law.upenn.edu",
      orderDate: "2025-10-08",
      deliveryDate: "2025-10-14",
      deliveryTime: "12:30 PM",
      qboInvoicePrelim: "QBO-1234-PRELIM",
      poStatus: "Awaiting PO", // "Awaiting PO", "PO Received", "Invoice Finalized"
      poNumber: null,
      poReceivedDate: null,
      qboInvoiceFinal: null,
      hubspotDealId: "98765432",
      daysWaiting: 0,
      total: 97.0,
    },
    {
      orderNum: "12345675",
      customerName: "Penn Wharton",
      contactEmail: "events@wharton.upenn.edu",
      orderDate: "2025-10-05",
      deliveryDate: "2025-10-16",
      deliveryTime: "11:00 AM",
      qboInvoicePrelim: "QBO-1231-PRELIM",
      poStatus: "PO Received",
      poNumber: "PO-2025-455",
      poReceivedDate: "2025-10-07",
      qboInvoiceFinal: null,
      hubspotDealId: "98765430",
      daysWaiting: 3,
      total: 450.0,
    },
    {
      orderNum: "12345672",
      customerName: "Penn Medicine",
      contactEmail: "catering@pennmedicine.org",
      orderDate: "2025-10-02",
      deliveryDate: "2025-10-18",
      deliveryTime: "2:00 PM",
      qboInvoicePrelim: "QBO-1228-PRELIM",
      poStatus: "Awaiting PO",
      poNumber: null,
      poReceivedDate: null,
      qboInvoiceFinal: null,
      hubspotDealId: "98765428",
      daysWaiting: 6,
      total: 825.0,
    },
  ],

  // ==========================================================================
  // PAYMENT TRACKING (Overdue/upcoming payments)
  // ==========================================================================

  paymentTracking: [
    {
      orderNum: "12345670",
      customerName: "SIG",
      qboInvoiceNumber: "QBO-1226",
      invoiceDate: "2025-09-25",
      invoiceAmount: 325.0,
      paymentTerms: "NET-15",
      dueDate: "2025-10-10",
      paymentStatus: "Overdue", // Unpaid, Paid, Overdue, Partially Paid
      amountPaid: 0,
      daysOverdue: -2, // Negative = days until due, Positive = days overdue
      lastReminderSent: "2025-10-08",
      reminderCount: 1,
    },
    {
      orderNum: "12345668",
      customerName: "Comcast",
      qboInvoiceNumber: "QBO-1224",
      invoiceDate: "2025-09-20",
      invoiceAmount: 1200.0,
      paymentTerms: "NET-30",
      dueDate: "2025-10-20",
      paymentStatus: "Unpaid",
      amountPaid: 0,
      daysOverdue: -12,
      lastReminderSent: null,
      reminderCount: 0,
    },
  ],

  // ==========================================================================
  // MENU PROPOSALS (AI-generated with MarginEdge costing)
  // ==========================================================================

  proposals: [
    {
      id: 1,
      title: "Traditional Guatemalan Feast",
      targetMargin: 67.5,
      successRate: 87,
      historicalNote: "Similar to Penn Law 4/15 order",
      inventoryStatus: "All on hand",
      items: [
        {
          id: 1,
          name: "Pepian Chicken (serves 15)",
          qty: 2,
          price: 85,
          marginEdge: {
            foodCost: 37.5,
            foodCostPercent: 44.1,
            laborHours: 2.0,
            laborCost: 50.0,
            ingredients: [
              { name: "Chicken", inStock: true, stockQty: "15 lbs" },
              { name: "Pumpkin seeds", inStock: true, stockQty: "9 lbs" },
              { name: "Tomatoes", inStock: true, stockQty: "20 lbs" },
            ],
          },
        },
        {
          id: 2,
          name: "Black Bean Rice (serves 10)",
          qty: 3,
          price: 32,
          marginEdge: {
            foodCost: 12.0,
            foodCostPercent: 37.5,
            laborHours: 0.8,
            laborCost: 20.0,
            ingredients: [
              { name: "Rice", inStock: true, stockQty: "20 lbs" },
              { name: "Black beans", inStock: true, stockQty: "10 lbs" },
            ],
          },
        },
      ],
    },
    {
      id: 2,
      title: "Build-Your-Own Bowl Bar",
      targetMargin: 72.0,
      successRate: 92,
      historicalNote: "Popular for corporate events",
      inventoryStatus: "Need to order cilantro",
      items: [
        {
          id: 1,
          name: "Taco Bar (serves 20)",
          qty: 2,
          price: 120,
          marginEdge: {
            foodCost: 45.0,
            foodCostPercent: 37.5,
            laborHours: 1.5,
            laborCost: 37.5,
          },
        },
        {
          id: 2,
          name: "Horchata (30 servings)",
          qty: 1,
          price: 45,
          marginEdge: {
            foodCost: 15.0,
            foodCostPercent: 33.3,
            laborHours: 0.5,
            laborCost: 12.5,
          },
        },
      ],
    },
  ],

  // ==========================================================================
  // RECENT ORDERS (All channels)
  // ==========================================================================

  recentOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "Oct 07",
      channel: "Email",
      status: "scheduled",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "Oct 05",
      channel: "Website",
      status: "completed",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "Oct 03",
      channel: "Email",
      status: "completed",
      total: 850.0,
    },
    {
      id: "#12342",
      customer: "Mann Center",
      date: "Oct 02",
      channel: "Satellite",
      status: "completed",
      total: 850.0,
    },
    {
      id: "#12341",
      customer: "Penn Law",
      date: "Sep 28",
      channel: "Email",
      status: "completed",
      total: 450.0,
    },
  ],

  allOrders: [
    {
      id: "#12345",
      customer: "Penn Law",
      date: "2025-10-07",
      channel: "Email",
      status: "scheduled",
      total: 97.0,
    },
    {
      id: "#12344",
      customer: "SIG",
      date: "2025-10-05",
      channel: "Website",
      status: "completed",
      total: 325.0,
    },
    {
      id: "#12343",
      customer: "Wharton",
      date: "2025-10-03",
      channel: "Email",
      status: "completed",
      total: 850.0,
    },
  ],

  // ==========================================================================
  // CALENDAR EVENTS
  // ==========================================================================

  calendarEvents: [
    {
      date: "2025-10-09",
      customer: "SIG",
      channel: "Website",
      time: "11:00 AM",
      total: 325,
    },
    {
      date: "2025-10-10",
      customer: "Wharton",
      channel: "Email",
      time: "7:00 PM",
      total: 820,
    },
    {
      date: "2025-10-14",
      customer: "Penn Law",
      channel: "Email",
      time: "12:30 PM",
      total: 450,
    },
    {
      date: "2025-10-20",
      customer: "Mann Center",
      channel: "Satellite",
      time: "5:00 PM",
      total: 850,
    },
  ],

  // ==========================================================================
  // NOTIFICATIONS (Enhanced with all event types)
  // ==========================================================================

  notifications: [
    {
      id: 1,
      type: "payment_received",
      icon: "💳",
      title: "Payment received",
      body: "Penn Law - $97.00",
      time: "5 minutes ago",
      actionable: true,
      actions: [
        { label: "View Order", action: "viewOrder", orderId: "#12345" },
      ],
    },
    {
      id: 2,
      type: "po_received",
      icon: "🎉",
      title: "PO Received",
      body: "Penn Wharton - PO-2025-455",
      time: "1 hour ago",
      actionable: true,
      actions: [
        {
          label: "Finalize Invoice",
          action: "finalizePO",
          orderNum: "12345675",
        },
      ],
    },
    {
      id: 3,
      type: "website_order",
      icon: "🌐",
      title: "Website order auto-processed",
      body: "SIG - $325.00 (PAID)",
      time: "3 hours ago",
      actionable: true,
      actions: [
        { label: "View Details", action: "viewOrder", orderId: "#12344" },
      ],
    },
    {
      id: 4,
      type: "payment_overdue",
      icon: "⚠️",
      title: "Payment overdue",
      body: "Comcast - $1,200 (7 days overdue)",
      time: "1 day ago",
      actionable: true,
      actions: [
        {
          label: "Send Reminder",
          action: "sendReminder",
          invoiceNum: "QBO-1224",
        },
      ],
    },
    {
      id: 5,
      type: "low_inventory",
      icon: "📦",
      title: "Low inventory alert",
      body: "Cilantro: 0.5 lbs remaining",
      time: "2 days ago",
      actionable: false,
      actions: [],
    },
  ],
};

// ==========================================================================
// HELPER FUNCTIONS (For Google Apps Script conversion)
// ==========================================================================

// These functions simulate API calls - in GAS, replace with actual UrlFetchApp calls
export const API_HELPERS = {
  // Simulate Toast API menu fetch
  fetchToastMenu: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, itemCount: 142 });
      }, 1000);
    });
  },

  // Simulate HubSpot customer lookup
  lookupHubSpotCustomer: (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes("law.upenn.edu")) {
          resolve(DUMMY_DATA.knownCustomer);
        } else if (email.includes("sig.com")) {
          resolve(DUMMY_DATA.otherCustomer);
        } else {
          resolve(DUMMY_DATA.newCustomer);
        }
      }, 500);
    });
  },

  // Simulate MarginEdge cost lookup
  getMarginEdgeCosts: (toastItemGuid) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return dummy cost data
        resolve({
          foodCost: 4.5,
          foodCostPercent: 37.5,
          laborHours: 0.25,
          ingredients: [
            { name: "Chicken", qty: "0.5 lbs", cost: 1.75, inStock: true },
          ],
        });
      }, 500);
    });
  },

  // Simulate order processing (Toast + QBO + HubSpot)
  processOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          toastOrderId: "T-5678",
          qboInvoiceId: "QBO-1234",
          hubspotDealId: "98765432",
        });
      }, 8000); // 8 seconds to simulate real processing
    });
  },

  // Simulate PO finalization
  finalizePOInvoice: (orderNum, poNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          qboInvoiceFinal: "QBO-1234",
          emailDraftCreated: true,
        });
      }, 2000);
    });
  },

  websiteOrderQueue: [
    {
      orderNum: "12345681",
      customerName: "SIG",
      contactEmail: "dk@sig.com",
      orderDate: "2025-10-08 14:35",
      deliveryDate: "2025-10-12",
      deliveryTime: "11:00 AM",
      total: 228.45,
      paymentStatus: "PAID",
      paymentMethod: "Stripe",
      itemsSummary: "2x Taco Bar, Horchata",
      status: "pending_review", // pending_review, auto_processed
    },
    {
      orderNum: "12345682",
      customerName: "Comcast",
      contactEmail: "events@comcast.com",
      orderDate: "2025-10-08 09:15",
      deliveryDate: "2025-10-15",
      deliveryTime: "12:30 PM",
      total: 450.0,
      paymentStatus: "PAID",
      paymentMethod: "Stripe",
      itemsSummary: "3x Pepian Chicken, Rice",
      status: "auto_processed",
      processedDate: "2025-10-08 09:16",
    },
  ],
};
