// src/services/dashboardService.js
import { api } from "./api";
import { getProductById } from "./productService";

// Helper: hydrate a single order with its items (and optional item names)
const fetchOrderDetail = async (orderId, { includeNames = true } = {}) => {
  const res = await api.get(`/orders/${orderId}`);
  const data = res.data?.data || null; // { orders, items }

  if (!data) return null;

  let items = data.items || [];

  if (includeNames && items.length) {
    // attach item_name to each item
    const nameCache = {};
    items = await Promise.all(
      items.map(async (it) => {
        if (!nameCache[it.item_id]) {
          try {
            const prod = await getProductById(it.item_id);
            nameCache[it.item_id] = prod?.item_name || `Item #${it.item_id}`;
          } catch {
            nameCache[it.item_id] = `Item #${it.item_id}`;
          }
        }
        return { ...it, item_name: nameCache[it.item_id] };
      })
    );
  }

  // return a normalized order object with items attached
  return { ...data.orders, items };
};

// Admin: get ALL orders and attach their items
export const getAllOrders = async ({ includeItems = true, includeNames = true } = {}) => {
  const res = await api.get("/orders");
  const list = res.data?.data || []; // [{order_id,...}]
  if (!includeItems) return list.map(o => ({ ...o, items: [] }));

  const detailed = await Promise.all(
    list.map(o => fetchOrderDetail(o.order_id, { includeNames }))
  );

  // Keep original order fields; fallback to empty items if any detail failed
  return list.map((o, idx) => {
    const det = detailed[idx];
    return { ...o, items: det?.items || [] };
  });
};

// Customer: get orders for a user_id and attach items (+ names)
export const getOrdersByUserId = async (userId) => {
  // Fetch all, then filter; then hydrate those only
  const res = await api.get("/orders");
  const all = res.data?.data || [];
  const mine = all.filter(o => String(o.user_id) === String(userId));

  const detailed = await Promise.all(
    mine.map(o => fetchOrderDetail(o.order_id, { includeNames: true }))
  );

  // Merge base order fields with hydrated items
  return mine.map((o, idx) => {
    const det = detailed[idx];
    return { ...o, items: det?.items || [] };
  });
};
