// src/services/authService.js
import { api } from './api';

const signup = async (userData) => {
  try {
    const payload = {
      username: userData.username,
      email: userData.email,
      password_hash: userData.password || userData.password_hash,
      phoneno: userData.phoneno || userData.phone || '',
      roles: userData.role || userData.roles || 'customer',
      user_address: userData.address || userData.user_address || ''
    };

    const response = await api.post('/users/signup', payload);
    return response.data; 
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message || 'Signup failed');
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', {
      email: credentials.email,
      password_hash: credentials.password,
    });

    const token = response.data.token || null;
    const user = response.data.user || response.data || null;
    return { user, token };
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message || 'Login failed');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // 👇 redirect to login without breaking existing calls
  window.location.href = "/";
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export { signup, login, logout, getCurrentUser };
