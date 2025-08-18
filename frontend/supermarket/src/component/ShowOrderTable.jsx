// src/components/ShowOrderTable.jsx
import React, { useContext, useEffect, useMemo } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { getCurrentUser } from "../services/authService";

const ShowOrderTable = () => {
  const { orders, loading, error, fetchAllOrders, fetchOrdersByUserId } =
    useContext(DashboardContext);

  const user = useMemo(() => getCurrentUser(), []);

  const role = (user?.roles || user?.role || "customer").toLowerCase();
  const userId = user?.user_id || user?.id;

  useEffect(() => {
    if (!user) return;
    if (role === "admin") {
      fetchAllOrders();
    } else {
      if (!userId) return;
      fetchOrdersByUserId(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, userId]);

  // Build rows for customer: flatten order items
  const customerRows = useMemo(() => {
    if (!orders?.length) return [];
    const rows = [];
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        rows.push({
          order_id: o.order_id,
          item_name: it.item_name || `Item #${it.item_id}`,
          price: it.price,
          quantity: it.quantity,
          total: o.total_amount,
          status: o.order_status,
          date: o.created_at,
          key: `${o.order_id}-${it.order_item_id || it.item_id}`,
        });
      });
    });
    return rows;
  }, [orders]);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header fw-bold">
        {role === "admin" ? "All Orders" : "My Orders"}
      </div>
      <div className="card-body">
        <table className="table table-bordered table-hover">
          <thead>
            {role === "admin" ? (
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Items</th>
              </tr>
            ) : (
              <tr>
                <th>Order ID</th>
                <th>Order Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Order Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            )}
          </thead>

          <tbody className="light">
            {loading ? (
              <tr>
                <td colSpan={role === "admin" ? 6 : 7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={role === "admin" ? 6 : 7} className="text-center text-danger">
                  {error}
                </td>
              </tr>
            ) : role === "admin" ? (
              orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.order_id}>
                    <tr>
                      <td>{order.order_id}</td>
                      <td>{order.user_id}</td>
                      <td>₹{order.total_amount}</td>
                      <td>{order.order_status}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>{order.items?.length || 0}</td>
                    </tr>
                    {order.items && order.items.length > 0 && (
                      <tr>
                        <td colSpan={6}>
                          <table className="table table-primary mb-0">
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items.map((it) => (
                                <tr key={it.order_item_id || it.item_id}>
                                  <td>{it.item_name || `Item #${it.item_id}`}</td>
                                  <td>₹{it.price}</td>
                                  <td>{it.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )
            ) : // customer view
            customerRows.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No orders found
                </td>
              </tr>
            ) : (
              customerRows.map((r) => (
                <tr key={r.key}>
                  <td>{r.order_id}</td>
                  <td>{r.item_name}</td>
                  <td>₹{r.price}</td>
                  <td>{r.quantity}</td>
                  <td>₹{r.total}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowOrderTable;
