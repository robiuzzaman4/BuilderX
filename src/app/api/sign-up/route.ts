import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const db = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    // === get payload and validate ===
    const payload = await request.json();
    const { name, email, password, firebaseUid } = payload;
    if (
      name?.trim() === "" ||
      email?.trim() === "" ||
      password?.trim() === "" ||
      firebaseUid?.trim() === ""
    ) {
      return Response.json(
        {
          success: false,
          message: "Invalid Payload!",
        },
        {
          status: 400,
        }
      );
    }

    // === check user exists or not ===
    const existingUsers = await db`
      SELECT * FROM users
      WHERE email = ${email}
    `;
    if (existingUsers.length > 0) {
      return Response.json(
        {
          success: false,
          message: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    // === hash password ===
    const hashedPassword = await bcrypt.hash(password, 10);

    // === create new user and send response ===
    const result = await db`
      INSERT INTO users (name, email, password, firebase_uid)
      VALUES (${name}, ${email}, ${hashedPassword}, ${firebaseUid})
      RETURNING *
    `;
    const newUser = result[0];

    return Response.json(
      {
        success: true,
        message: "User created successfully!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("User creation failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during user creation.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
