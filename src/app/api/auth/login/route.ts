import { config } from "@/config";
import dbConnection from "@/lib/db-connection";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_EXPIRATION = 7 * 24 * 60 * 60; // 7 days

export async function POST(request: Request) {
  try {
    // === get payload and validate ===
    const payload = await request.json();
    const { email, password } = payload;
    if (email?.trim() === "" || password?.trim() === "") {
      return Response.json(
        {
          success: false,
          message: "Email and Password is required.",
        },
        {
          status: 400,
        }
      );
    }

    // === connect db ===
    await dbConnection();

    // === check user is exist or not ===
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 400 }
      );
    }

    // === check password is matched or not ===
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return Response.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // === check jwt secret, and create jwt payload ===
    if (!config.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }
    const jwtPayload = {
      _id: existingUser._id,
      email: existingUser.email,
    };

    // === generate token ===
    const token = jwt.sign(jwtPayload, config.JWT_SECRET as jwt.Secret, {
      expiresIn: JWT_EXPIRATION,
    });

    // === set cookie options ===
    const cookieOptions = [
      `token=${token}`,
      `Max-Age=${JWT_EXPIRATION}`,
      `HttpOnly`,
      `Secure`,
      `SameSite=Lax`,
      `Path=/`,
    ].join("; ");

    // === user response data ===
    const userResponseData = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    // === send response to the client with set token on the cookie ===
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful.",
        token: token,
        user: userResponseData,
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
    console.error("User login failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during user login.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
