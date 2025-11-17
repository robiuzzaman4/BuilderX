import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Initialize database table (run this once)
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firebase_uid TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function createUser(userData: any) {
  const { firebaseUid, email, name } = userData;

  const result = await sql`
    INSERT INTO users (firebase_uid, email, name)
    VALUES (${firebaseUid}, ${email}, ${name})
    RETURNING *
  `;

  return result[0];
}

export async function getUserByFirebaseUid(firebaseUid: any) {
  const result = await sql`
    SELECT * FROM users
    WHERE firebase_uid = ${firebaseUid}
  `;

  return result[0] || null;
}

export async function getAllUsers() {
  const result = await sql`
    SELECT id, name, email, created_at FROM users
    ORDER BY created_at DESC
  `;

  return result;
}

export { sql };
