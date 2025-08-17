const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/mysqlDB');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const getUsersRoute = require('./routes/UsersRoute');
const getProductRoute = require('./routes/ProductRoute');
const getOrderRoute = require('./routes/OrderRoute');

app.use('/api/users', getUsersRoute);
app.use('/api/products', getProductRoute);
app.use('/api/orders', getOrderRoute);

// /api/test Route
app.get('/api/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS alive');
        res.json({ status: 'server running ok', db: rows[0].alive });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
