import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    const connectionOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain at least 2 socket connections
      maxIdleTimeMS: 30000, // Close idle connections after 30s
    };

    const result = await mongoose.connect(process.env.DBURL, connectionOptions);
    console.log("Database connected successfully");
    return result;
  } catch (error) {
    console.log(`Database connection failed: ${error}`);
    throw error;
  }
};

export default ConnectDb;
