// Mock MarginEdge API
export const mockMarginEdge = {
  getRecipeCost: (toastItemId) => ({
    totalCost: Math.random() * 20 + 5, // $5-25
    laborHours: 0.5,
    inventoryAvailable: true,
    lowStockIngredients: [],
  }),
};

// Mock Toast API
export const mockToast = {
  getMenu: () => DUMMY_DATA.toastMenu,
  createOrder: (orderData) => ({
    guid: "TOAST-" + Date.now(),
    status: "sent_to_kds",
  }),
};

// Mock HubSpot API
export const mockHubSpot = {
  lookupCustomer: (email) => {
    if (email.includes("penn")) return DUMMY_DATA.knownCustomer;
    return null;
  },
};
