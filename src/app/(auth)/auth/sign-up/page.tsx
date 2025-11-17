"use client";
import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp({ email, password });
      if (response?.user) {
        router.push("/");
      }

      console.log("Sign Up Response:", response);
    } catch (e) {
      console.error("Sign Up Failed:", e);
    }
  };

  return (
    <section className="min-h-screen w-full grid place-items-center bg-zinc-100">
      <form
        className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl border border-zinc-200 flex flex-col gap-6 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-zinc-800">
          Sign Up
        </h2>

        {/* Email Input Field */}
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

        {/* Password Input Field */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:cursor-pointer"
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>

        <Link
          href={"/auth/sign-in"}
          className="text-sm text-zinc-500 hover:underline underline-offset-4 hover:text-blue-500 hover:decoration-blue-500"
        >
          Already have an account? Sign In.
        </Link>
      </form>
    </section>
  );
};

export default SignUpPage;
