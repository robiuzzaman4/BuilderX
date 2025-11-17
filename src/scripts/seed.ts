import { initializeDatabase } from "@/lib/db";

async function setup() {
  console.log("Starting database initialization...");
  try {
    await initializeDatabase();
    console.log("Database seeded");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
    process.exit(1);
  }
}

setup();
