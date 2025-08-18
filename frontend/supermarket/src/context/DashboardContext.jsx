// src/context/DashboardContext.jsx
import React, { createContext, useState } from "react";
import { getAllOrders, getOrdersByUserId } from "../services/dashboardService";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOrders({ includeItems: true, includeNames: true });
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByUserId = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUserId(userId); // hydrated with items + names
      setOrders(data);
    } catch (err) {
      setError(err.message || "Failed to fetch your orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{ orders, loading, error, fetchAllOrders, fetchOrdersByUserId }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
