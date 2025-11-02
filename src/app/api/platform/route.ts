import dbConnection from "@/lib/db-connection";
import { Platform } from "@/models/platform";
import jwt from "jsonwebtoken";
import { config } from "@/config";

// === POST: Create new platform ===
export async function POST(request: Request) {
  try {
    // === get and verify token ===
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

    // === verify token and get user id ===
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET as string);
    } catch (error) {
      return Response.json(
        {
          success: false,
          message: "Invalid or expired token.",
        },
        { status: 401 }
      );
    }

    // === get payload and validate ===
    const payload = await request.json();
    const { name, slug } = payload;

    if (name?.trim() === "" || slug?.trim() === "") {
      return Response.json(
        {
          success: false,
          message: "Platform name and slug are required.",
        },
        {
          status: 400,
        }
      );
    }

    // === connect db ===
    await dbConnection();

    // === check if slug already exists ===
    const slugExists = await Platform.findOne({ slug: slug.trim() });
    if (slugExists) {
      return Response.json(
        {
          success: false,
          message: "Slug is already taken. Please choose another one.",
        },
        { status: 409 }
      );
    }

    // === create new platform ===
    const newPlatform = await Platform.create({
      user: decoded._id,
      name: name.trim(),
      slug: slug.trim(),
      pageStructure: [],
      isPublished: false,
    });

    // === send response ===
    return Response.json(
      {
        success: true,
        message: "Platform created successfully!",
        platform: newPlatform,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Platform creation failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during platform creation.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === GET: Get user-specific platforms or all platforms ===
export async function GET(request: Request) {
  try {
    // === get and verify token ===
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

    // === verify token and get user id ===
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET as string);
    } catch (error) {
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

    // === get query params ===
    const { searchParams } = new URL(request.url);
    const getAll = searchParams.get("all") === "true";

    // === check if admin requesting all platforms ===
    if (getAll) {
      if (decoded.role !== "admin") {
        return Response.json(
          {
            success: false,
            message: "Unauthorized. Admin access required.",
          },
          { status: 403 }
        );
      }

      // === get all platforms for admin ===
      const allPlatforms = await Platform.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      return Response.json(
        {
          success: true,
          message: "All platforms retrieved successfully!",
          data: allPlatforms,
          count: allPlatforms.length,
        },
        { status: 200 }
      );
    }

    // === get user-specific platforms ===
    const userPlatforms = await Platform.find({ user: decoded._id }).sort({
      createdAt: -1,
    });

    // === send response ===
    return Response.json(
      {
        success: true,
        message: "Platforms retrieved successfully!",
        data: userPlatforms,
        count: userPlatforms.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get platforms failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during retrieving platforms.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
