import dbConnection from "@/lib/db-connection";
import { Platform } from "@/models/platform";
import jwt from "jsonwebtoken";
import { config } from "@/config";

// === GET: Get single platform by ID ===
export async function GET(
  request: Request,
  { params }: { params: Promise<{ platformId: string }> }
) {
  try {
    // === await params ===
    const { platformId } = await params;

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

    // === get platform by id ===
    const platform = await Platform.findOne({
      _id: platformId,
      user: decoded._id,
    });

    if (!platform) {
      return Response.json(
        {
          success: false,
          message: "Platform not found or unauthorized.",
        },
        { status: 404 }
      );
    }

    // === send response ===
    return Response.json(
      {
        success: true,
        message: "Platform retrieved successfully!",
        platform: platform,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get platform failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during retrieving platform.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// === PUT: Update platform ===
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ platformId: string }> }
) {
  try {
    // === await params ===
    const { platformId } = await params;

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

    // === get payload ===
    const payload = await request.json();
    const { pageStructure } = payload;

    // === connect db ===
    await dbConnection();

    // === find platform and check ownership ===
    const platform = await Platform.findOne({
      _id: platformId,
      user: decoded._id,
    });

    if (!platform) {
      return Response.json(
        {
          success: false,
          message: "Platform not found or unauthorized.",
        },
        { status: 404 }
      );
    }

    // === update platform ===
    if (pageStructure) {
      platform.pageStructure = pageStructure;
    }
    await platform.save();

    // === send response ===
    return Response.json(
      {
        success: true,
        message: "Platform updated successfully!",
        platform: platform,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Platform update failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during platform update.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
