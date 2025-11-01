import { config } from "@/config";
import mongoose, { Mongoose } from "mongoose";

// === db conn string ===
const MONGODB_URI = config.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local"
  );
}

// === use global for cach db conn across page reload in development ===
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  const cache = cached!;

  // == if a connection is already established, reuse it instantly
  if (cache.conn) {
    return cache.conn;
  }

  // === if there is no connection but a connection promise exists, wait for it to resolve ===
  if (!cache.promise) {
    const opts = {
      bufferCommands: false,
    };

    // === create the connection promise ===
    cache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB successfully connected and cached.");
        return mongooseInstance as Mongoose;
      });
  }

  // === await the promise to get the established connection and store it ===
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }

  return cache.conn;
}

export default dbConnect;
