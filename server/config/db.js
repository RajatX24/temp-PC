import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rajatshukla1000:WkAuCmEEfQPnlsZa@cluster0.jbnhbaa.mongodb.net/PCv2"
    );

    console.log(`MongoDB Connected:${conn.connection.host}`);
  } catch (err) {
    console.log("Error:", err);
    process.exit();
  }
};

export default connectDB;
