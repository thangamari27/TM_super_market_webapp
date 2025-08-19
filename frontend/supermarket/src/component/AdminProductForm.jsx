// src/components/AdminProductForm.jsx
import React, { useState, useEffect } from "react";

const AdminProductForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    item_name: "",
    item_price: "",
    stock_quantity: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        item_name: initialData.item_name,
        item_price: initialData.item_price,
        stock_quantity: initialData.stock_quantity,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {initialData ? "Edit Product" : "Add Product"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="item_name"
                  className="form-control"
                  value={form.item_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  name="item_price"
                  className="form-control"
                  value={form.item_price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  className="form-control"
                  value={form.stock_quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {initialData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
