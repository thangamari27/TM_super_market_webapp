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
const ProductCatlogRoute = require('./routes/productCatlogRoute')
const ProductCartRoute = require('./routes/productCartRoute');

app.use('/api/product', ProductCatlogRoute);
app.use('/api/productcart', ProductCartRoute);

const port = process.env.PORT || 5000
// app listen
app.listen(port, ()=>{
    console.log("server running http://localhost:"+port);
})
