import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { signup, loading, error } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phoneno: '',
    role: 'customer',
    address: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form); 
    } catch (err) {
      
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 550, width: '100%', borderTop:'3px solid blue' }}>
        <h3 className="text-center mb-3">Create account</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input name="username" value={form.username} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input name="phoneno" value={form.phoneno} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="form-select">
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-12">
            <button disabled={loading} className="btn btn-primary w-100" type="submit">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
