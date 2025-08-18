// src/components/AdminProductsTable.jsx
import React from "react";
import { useProducts } from "../context/ProductContext";
import { deleteProduct } from "../services/productService";

const AdminProductsTable = () => {
  const { products, loading, error, fetchProducts } = useProducts();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm p-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Products</h4>
        <button className="btn btn-success btn-sm">+ Add Product</button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Actions</th>
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
                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.item_id)}
                  >
                    Delete
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

export default AdminProductsTable;
