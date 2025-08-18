import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import { DashboardProvider } from './context/DashboardContext';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DashboardProvider>
            <ProductProvider>
                <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/customer" element={<CustomerDashboard />} />
              </Routes>
            </ProductProvider>
        </DashboardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
