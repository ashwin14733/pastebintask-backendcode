const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to the MongoDb Successfully...");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
};

module.exports = connectDB;
