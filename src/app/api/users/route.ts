import dbConnection from "@/lib/db-connection";
import { User } from "@/models/user";

export async function POST(request: Request) {
  try {
    // === get payload and validate ===
    const payload = await request.json();
    const { name, email, password } = payload;
    if (
      name?.trim() === "" ||
      email?.trim() === "" ||
      password?.trim() === ""
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

    // === connect db ===
    await dbConnection();

    // check user is exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    // === create new user and send response ===
    const newUser = await User.create(payload);
    return Response.json(
      {
        success: true,
        message: "User created successfully!",
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
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
