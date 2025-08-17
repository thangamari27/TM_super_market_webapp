const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const poolConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

if (isProduction) {
  // Use SSL in Catalyst
  poolConfig.ssl = {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '../certs/ca.pem')),
  };
} else {
  // Local development without strict SSL
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(poolConfig);

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("DB connection successful");
    conn.release();
  } catch (err) {
    console.error(" DB connection error:", err);
  }
})();

module.exports = pool;
