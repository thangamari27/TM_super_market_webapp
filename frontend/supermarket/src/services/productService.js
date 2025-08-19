import { api } from "./api";

// Get all products
export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

// Create product (Admin only)
export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data.data;
};

// Update product (Admin only)
export const updateProduct = async (id, product) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data.data;
};

// Delete product (Admin only)
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// ✅ Add createOrder without affecting existing code
export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};
