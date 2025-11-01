export async function POST(request: Request) {
  try {
    // === set cookie options to remove token ===
    const cookieOptions = [`token=`, `Max-Age=0`, `Path=/`].join("; ");

    // === send response to the client with removed token from cookie ===
    return new Response(
      JSON.stringify({
        success: true,
        message: "Sign out successful.",
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
    console.error("User sign out failed:", error);

    // === send err response ===
    return Response.json(
      {
        success: false,
        message: "Internal Server Error during user sign out.",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
