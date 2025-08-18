import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ShowOrderTable from "../component/ShowOrderTable";
import AdminProductsTable from "../component/AdminProductsTable";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
     
      <div className="row g-3 mt-5">
         <h2 className="mb-3">Welcome Admin</h2>
        <div className="col-md-3" >
          <div className="card shadow-sm p-3" style={{borderLeft:"5px solid blue"}}>
            <h5>Total Users</h5>
            <p className="fs-4">120</p>
          </div>
        </div>
        <div className="col-md-3" >
          <div className="card shadow-sm p-3" style={{borderLeft:"5px solid orange"}}>
            <h5>Total Orders</h5>
            <p className="fs-4">85</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm p-3" style={{borderLeft:"5px solid green"}}>
            <h5>Revenue</h5>
            <p className="fs-4">$12,450</p>
          </div>
          
        </div>
          <div className="col-md-3">
          <div className="card shadow-sm p-3" style={{borderLeft:"5px solid red"}}>
            <h5>Order Cancels</h5>
            <p className="fs-4">50</p>
          </div>    
        </div>
      </div>

      {/* Dashboard product table */}
      <AdminProductsTable />

      {/* Dashboard order table */}
      <ShowOrderTable />
    </DashboardLayout>
  );
};

export default AdminDashboard;
