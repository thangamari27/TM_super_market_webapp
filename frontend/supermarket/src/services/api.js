// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://appsail-50030373162.development.catalystappsail.in/api', // adjust if deployed
  headers: { 'Content-Type': 'application/json' },
});

export { api };
