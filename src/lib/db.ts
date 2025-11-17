import { neon } from "@neondatabase/serverless";

const db = neon(process.env.DATABASE_URL!);

interface NewUserData {
  firebaseUid: string;
  email: string;
  name: string;
}

interface UserRecord {
  id: number;
  firebase_uid: string;
  email: string;
  name: string;
  created_at: Date;
}

export async function createUser(userData: NewUserData): Promise<UserRecord> {
  const { firebaseUid, email, name } = userData;

  const result = await db`
    INSERT INTO users (firebase_uid, email, name)
    VALUES (${firebaseUid}, ${email}, ${name})
    RETURNING *
  `;

  return result[0] as UserRecord;
}

export async function getUserByFirebaseUid(
  firebaseUid: string
): Promise<UserRecord | null> {
  const result = await db`
    SELECT * FROM users
    WHERE firebase_uid = ${firebaseUid}
  `;

  return result[0] ? (result[0] as UserRecord) : null;
}

export async function getAllUsers(): Promise<UserRecord[]> {
  const result = await db`
    SELECT id, name, email, created_at FROM users
    ORDER BY created_at DESC
  `;

  return result as UserRecord[];
}

export async function initializeDatabase() {
  await db`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      firebase_uid TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export { db };
