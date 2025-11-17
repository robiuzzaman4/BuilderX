"use client";
import { useAuth } from "@/provider/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signUp({ name, email, password });

      if (response?.user) {
        const apiResponse = await fetch("/api/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: response?.user?.displayName,
            email,
            password,
            firebaseUid: response?.user?.uid,
          }),
        });

        if (apiResponse.ok) {
          router.push("/");
          toast.success("Sign Up Successful!");
        } else {
          const errorData = await apiResponse.json();
          console.log("Backend user creation failed:", errorData);
          toast.error("Failed to sign up on the server");
        }
      }
    } catch (e) {
      console.error("Sign Up Failed:", e);
    }
  };

  return (
    <section className="min-h-screen w-full grid place-items-center bg-zinc-100 px-4">
      <form
        className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl border border-zinc-200 flex flex-col gap-6 shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-zinc-800">
          Sign Up
        </h2>

        <div className="space-y-2">
          <label htmlFor="name-input" className="text-sm font-medium block">
            Name:
          </label>
          <input
            id="name-input"
            type="text"
            className="w-full px-3 py-2 rounded-md outline-none border border-zinc-200 focus:border-blue-500 transition duration-150 text-sm"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
