"use client";

import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { signIn, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });

      if (response?.user) {
        const apiResponse = await fetch("/api/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (apiResponse.ok) {
          router.push("/");
          toast.success("Sign In Successful!");
        } else {
          const errorData = await apiResponse.json();
          console.log("Backend user creation failed:", errorData);
          toast.error("Failed to sign up on the server");
        }
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

        <div className="space-y-2">
          <label htmlFor="email-input" className="text-sm font-medium block">
            Email:
          </label>
          <input
            id="email-input"
            type="email"
            className="w-full px-3 py-2 rounded-md outline-none border border-zinc-200 focus:border-blue-500 transition duration-150 text-sm"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password-input" className="text-sm font-medium block">
            Password:
          </label>
          <input
            id="password-input"
            type="password"
            className="w-full px-3 py-2 rounded-md outline-none border border-zinc-200 focus:border-blue-500 transition duration-150 text-sm"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:cursor-pointer"
          disabled={isLoading}
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
