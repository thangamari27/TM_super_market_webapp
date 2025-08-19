const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/mysqlDB');

dotenv.config();
const app = express();


app.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form-data if needed


const getUsersRoute = require('./routes/UsersRoute');
const getProductRoute = require('./routes/ProductRoute');
const getOrderRoute = require('./routes/OrderRoute');

app.use('/api/users', getUsersRoute);
app.use('/api/products', getProductRoute);
app.use('/api/orders', getOrderRoute);

app.get('/api/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 AS alive');
        res.json({ status: 'server running ok', db: rows[0].alive });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});


const port = process.env.X_ZOHO_CATALYST_LISTEN_PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
