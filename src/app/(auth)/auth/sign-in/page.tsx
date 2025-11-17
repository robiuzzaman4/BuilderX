"use client";

import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Use React.FC for functional components in TypeScript
const SignInPage: React.FC = () => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Use the custom authentication hook
  const { signIn, isLoading } = useAuth();

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });
      if (response?.user) {
        router.push("/users");
      }

      console.log("Sign In Response:", response);
    } catch (e) {
      console.error("Sign In Failed:", e);
    }
  };

  return (
    <section className="min-h-screen w-full grid place-items-center bg-zinc-100">
      <form
        className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl border border-zinc-200 flex flex-col gap-4 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-zinc-800">
          Sign In
        </h2>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email-input" className="text-sm font-medium block">
            Email:
          </label>
          <input
            id="email-input"
            type="email"
            className="w-full px-3 py-2 rounded-md outline-none border border-zinc-200 focus:border-orange-500 transition duration-150 text-sm"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password-input" className="text-sm font-medium block">
            Password:
          </label>
          <input
            id="password-input"
            type="password"
            className="w-full px-3 py-2 rounded-md outline-none border border-zinc-200 focus:border-orange-500 transition duration-150 text-sm"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:cursor-pointer"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <Link
          href={"/auth/sign-up"}
          className="text-sm text-zinc-500 hover:underline underline-offset-4 hover:text-blue-500 hover:decoration-blue-500"
        >
          Don't have an account? Sign Up.
        </Link>
      </form>
    </section>
  );
};

export default SignInPage;
