const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

const mysqlConnection = async() =>{
    try {
        const connectDB = await pool.getConnection();
        if(!connectDB){
            console.log("DB connection unsuccessful");
        }
        console.log("DB connection successful");
    } catch (error) {
        console.log("error",error.message);
    }
}

mysqlConnection();

module.exports = pool;