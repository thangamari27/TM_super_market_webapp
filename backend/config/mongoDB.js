const mongoose = require('mongoose');

async function connectDB(){
    try {
        const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        if(!connectDB){
            console.log("DB connect unsuccessful");
        }
        console.log(`DB connect successfull ${connectDB.connection.db.databaseName}`)
    } catch (error) {
        console.log("DB error: ",error);
    }
}

module.exports = connectDB