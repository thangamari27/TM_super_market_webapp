const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/mysqlDB');

//express app and dotenv config
const app = express();
dotenv.config();

// db config

// middleware
app.use(cors());
app.use(express.json());

// Routes
const getUsersRoute = require('./routes/UsersRoute');
const getProductRoute = require('./routes/ProductRoute');

app.use('/api/users', getUsersRoute);
app.use('/api/products', getProductRoute);

const port = process.env.PORT || 5000
// app listen
app.listen(port, ()=>{
    console.log("server running http://localhost:"+port);
})
