import { neon } from "@neondatabase/serverless";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = neon(process.env.DATABASE_URL!);

const JWT_EXPIRATION = 2 * 60;

export async function POST(request: NextRequest) {
  try {
    // === 1. Get payload and validate ===
    const payload = await request.json();
    const { email, password } = payload;

    if (email?.trim() === "" || password?.trim() === "") {
      return Response.json(
        {
          success: false,
          message: "Email and Password are required.",
        },
        { status: 400 }
      );
    }

    // === 2. Check user exists and fetch HASHED password ===
    // We select the 'password' column explicitly to compare against it
    const existingUsers = await db`
            SELECT id, name, email, password, firebase_uid
            FROM users
            WHERE email = ${email}
        `;

    const existingUser = existingUsers[0];

    if (!existingUser) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // === 3. Check password is matched or not ===
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // === 4. Check JWT secret and create JWT payload ===
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("FATAL: JWT_SECRET is not defined.");
      return Response.json(
        { success: false, message: "Configuration error." },
        { status: 500 }
      );
    }

    const jwtPayload = {
      id: existingUser?.id,
      email: existingUser?.email,
      firebase_uid: existingUser?.firebase_uid,
    };

    // === 5. Generate access_token ===
    const access_token = jwt.sign(jwtPayload, jwtSecret, {
      expiresIn: JWT_EXPIRATION,
    });

    // === 6. Set cookie options ===
    const cookieOptions = [
      `access_token=${access_token}`,
      `Max-Age=${JWT_EXPIRATION}`,
      `HttpOnly`,
      `Secure`,
      `SameSite=Lax`,
      `Path=/`,
    ].join("; ");

    // === 8. Send response with set access_token on the cookie ===
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sign In successful.",
        user: existingUser,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieOptions,
        },
      }
    );
  } catch (error: any) {
    console.error("User Sign In failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during user sign in.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
