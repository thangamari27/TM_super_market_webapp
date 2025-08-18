// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const redirectByRole = (userObj) => {
    const role = userObj?.roles || userObj?.role || 'customer';
    if (role.toLowerCase() === 'admin') {
      navigate('/dashboard/admin');
    } else {
      navigate('/dashboard/customer');
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { user: loggedUser, token } = await authService.login(credentials);
      if (token) localStorage.setItem('token', token);

      const finalUser = loggedUser || {};
      localStorage.setItem('user', JSON.stringify(finalUser));
      setUser(finalUser);
      redirectByRole(finalUser);
      return finalUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.signup(userData);
      const token = data.token || null;
      const createdUser = data.user || data || {};
      if (token) localStorage.setItem('token', token);

      localStorage.setItem('user', JSON.stringify(createdUser));
      setUser(createdUser);
      redirectByRole(createdUser);
      return createdUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
