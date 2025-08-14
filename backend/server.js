const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/mongoDB')

//express app and dotenv config
const app = express();
dotenv.config();

// db config
connectDB();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000
// app listen
app.listen(port, ()=>{
    console.log("server running http://localhost:"+port);
})
