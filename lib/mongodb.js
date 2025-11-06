// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env file");
}

// Global variable to cache the connection (important in Next.js)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) {
    // ✅ Already connected — reuse the same connection
    return cached.conn;
  }

  if (!cached.promise) {
    // Create a new connection promise if none exists
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "test", // ✅ explicitly use your 'test' database
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongooseInstance) => {
        console.log(
          "✅ MongoDB connected to:",
          mongooseInstance.connection.name
        );
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
