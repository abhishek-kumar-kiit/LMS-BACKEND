const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("database successfully connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports =connectDB;