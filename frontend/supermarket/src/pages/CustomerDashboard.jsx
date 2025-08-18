import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ShowOrderTable from "../component/ShowOrderTable";
import CustomerProductsTable from "../component/CustomerProductsTable";

const CustomerDashboard = () => {
  return (
    <DashboardLayout role="customer">
      <h2 className="mt-5 mb-4">Welcome Back, </h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>My Orders</h5>
            <p>You have 3 active orders</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>pending Orders</h5>
            <p>You have 5 payment pending orders</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h5>Order Credit</h5>
            <p>100 points</p>
          </div>
        </div>
      </div>
      {/* Order table */}
      <CustomerProductsTable />
      <ShowOrderTable />
    </DashboardLayout>
  );
};

export default CustomerDashboard;
