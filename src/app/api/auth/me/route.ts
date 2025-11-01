import { config } from "@/config";
import dbConnection from "@/lib/db-connection";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    // === get token from headers ===
    const token = request.headers.get("authorization");

    if (!token) {
      return Response.json(
        {
          success: false,
          message: "Token is required.",
        },
        { status: 401 }
      );
    }

    // === check jwt secret ===
    if (!config.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }

    // === verify token ===
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET as jwt.Secret);
    } catch (error: any) {
      return Response.json(
        {
          success: false,
          message: "Invalid or expired token.",
        },
        { status: 401 }
      );
    }

    // === connect db ===
    await dbConnection();

    // === find user by _id or email from jwt payload ===
    const user = await User.findById(decoded?._id);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // === user response data ===
    const userResponseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // === send response to the client ===
    return Response.json(
      {
        success: true,
        message: "User retrieved successfully.",
        user: userResponseData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get user failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during retrieving user.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
