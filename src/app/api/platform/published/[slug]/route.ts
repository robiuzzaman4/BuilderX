import dbConnection from "@/lib/db-connection";
import { Platform } from "@/models/platform";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // === await params ===
    const slug = (await params)?.slug;

    if (!slug) {
      return Response.json(
        {
          success: false,
          message: "Slug is required.",
        },
        { status: 404 }
      );
    }

    // === connect db ===
    await dbConnection();

    // === get platform by id ===
    const platform = await Platform.findOne({
      slug: slug,
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

    if (platform?.isPublished === false) {
      return Response.json(
        {
          success: false,
          message: "Platform is not published.",
        },
        { status: 500 }
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
