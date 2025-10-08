class MockPropertiesService {
  constructor() {
    this.storage = {};
  }

  setProperty(key, value) {
    this.storage[key] = value;
    localStorage.setItem("props_" + key, value); // Persist across page reloads
  }

  getProperty(key) {
    return this.storage[key] || localStorage.getItem("props_" + key);
  }

  deleteProperty(key) {
    delete this.storage[key];
    localStorage.removeItem("props_" + key);
  }
}

export const PropertiesService = new MockPropertiesService();
