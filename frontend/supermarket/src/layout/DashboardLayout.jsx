import React from "react";
import { getCurrentUser, logout } from '../services/authService';

const DashboardLayout = ({ role, children }) => {
   const user = getCurrentUser();

  return (
    <div className="d-flex">
      {/* Sidebar */}
       <nav className="navbar navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid">
          {/* Sidebar Toggle (Left) */}
          <button
            className="btn me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand fw-bold" href="#">
            My Dashboard
          </a>

          {/* Profile Menu (Right) */}
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={
                  role === 'admin' ? "https://ui-avatars.com/api/?name=A+D&size=40":"https://ui-avatars.com/api/?name=C+U&size=40"
                }
                alt="profile"
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <span className="d-none d-sm-inline">{user?.username || "Guest"}</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end shadow"
              aria-labelledby="profileDropdown"
            >
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button onClick={logout} className="dropdown-item text-danger">Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar (Offcanvas) */}
      <div
        className="offcanvas offcanvas-start bg-white shadow"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="sidebarMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="list-group list-group-flush">
            <li className="list-group-item rounded-end" >
              <a href="/dashboard" className="text-decoration-none text-dark">
                Dashboard
              </a>
            </li>
            <li className="list-group-item">
              <a href="/dashboard/orders" className="text-decoration-none text-dark">
                Orders
              </a>
            </li>
            <li className="list-group-item">
              <a href="/dashboard/products" className="text-decoration-none text-dark">
                Products
              </a>
            </li>
            <li className="list-group-item">
              <a href="/dashboard/customers" className="text-decoration-none text-dark">
                Customers
              </a>
            </li>
            <li className="list-group-item">
              <a href="/dashboard/reports" className="text-decoration-none text-dark">
                Reports
              </a>
            </li>
          </ul>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
