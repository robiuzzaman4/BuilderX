"use client";

import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";

const HomePage = () => {
  const { user, logOut, isLoading } = useAuth();
  console.log('loggedin user ', user);
  

  if (isLoading) {
    return (
      <main className="min-h-screen w-full bg-zinc-50 py-12 px-4 grid place-items-center">
        <div className="w-full max-w-sm mx-auto p-6 rounded-md border border-dashed border-blue-500 bg-blue-50 flex flex-col md:items-center md:flex-row justify-center gap-6">
          <p className="text-sm font-medium text-blue-500">Loading..</p>
        </div>
      </main>
    );
  }
  if (!user && !isLoading) {
    return (
      <main className="min-h-screen w-full bg-zinc-50 py-12 px-4 grid place-items-center">
        <div className="w-full max-w-sm mx-auto p-6 rounded-md border border-dashed border-red-500 bg-red-50 flex flex-col md:items-center md:flex-row justify-center gap-6">
          <p className="text-sm font-medium text-red-500">
            Your not Signed In!
          </p>
          <Link
            href="/auth/sign-in"
            className="px-3 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:cursor-pointer h-fit"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen w-full bg-zinc-50 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto p-6 rounded-md border border-dashed border-blue-500 bg-blue-50 flex flex-col md:items-center md:flex-row justify-between gap-6">
        <span>
          <h2>Welcome back {user?.displayName ?? "User"}</h2>
          <h2>Email: {user?.email ?? "N/A"}</h2>
        </span>

        <button
          onClick={logOut}
          disabled={isLoading}
          className="px-3 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:cursor-pointer h-fit"
        >
          {isLoading ? "Processing..." : "Logout"}
        </button>
      </div>
    </main>
  );
};

export default HomePage;
