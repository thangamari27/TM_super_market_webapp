// src/context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts, createOrder } from "../services/productService";
import { useAuth } from "./AuthContext"; // ✅ import AuthContext

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user } = useAuth(); // ✅ get logged-in user
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async (productId, quantity, price) => {
  try {
    const userId = user?.id || user?._id || user?.user_id; // ✅ flexible check

    if (!userId) {
      alert("⚠️ Please login to place an order");
      return;
    }

    const orderData = {
      user_id: userId,
      items: [
        {
          item_id: productId,
          quantity,
          price,
        },
      ],
    };

    const res = await createOrder(orderData);

    if (res.success) {
      alert("✅ Order placed successfully!");
    } else {
      alert("❌ Failed to place order: " + (res.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Order Error:", err);
    alert("❌ Error while placing order");
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, fetchProducts, placeOrder }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
