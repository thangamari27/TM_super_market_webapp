// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4600/api', // adjust if deployed
  headers: { 'Content-Type': 'application/json' },
});

export { api };
