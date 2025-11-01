import { Mongoose } from "mongoose";

// === cach interface ===
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// === extend the global namespace to include the 'mongoose' property ===
declare global {
  var mongoose: MongooseCache | undefined;
}

// === ensure this file is treated as a module ===
export {};
