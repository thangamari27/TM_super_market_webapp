import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

const CustomerProductsTable = () => {
  const { products, loading, error, placeOrder } = useProducts();
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm p-3 mt-3">
      <h4>Available Products</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, index) => (
              <tr key={p.item_id}>
                <td>{index + 1}</td>
                <td>{p.item_name}</td>
                <td>₹{p.item_price}</td>
                <td>{p.stock_quantity}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary me-1"
                    onClick={() => handleQuantityChange(p.item_id, -1)}
                  >
                    -
                  </button>
                  {quantities[p.item_id] || 1}
                  <button
                    className="btn btn-sm btn-secondary ms-1"
                    onClick={() => handleQuantityChange(p.item_id, 1)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>
                        placeOrder(
                        p.item_id,
                        quantities[p.item_id] || 1,
                        p.item_price // 🔹 pass product price
                        )
                    }
                    >
                    Order Now
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProductsTable;
