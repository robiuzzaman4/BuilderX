"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/http/auth";
import { toast } from "sonner";
import { DEFAULT_SIGN_IN_REDIRECT } from "@/constant";

const signinSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInFormValues = z.infer<typeof signinSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "hia@mail.com",
      password: "123456",
    },
  });

  // === sign in mutation ===
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: () => {
      toast.success("Signin Successful");
      window.location.href = DEFAULT_SIGN_IN_REDIRECT;
    },
    onError: (error: any) => {
      console.log("err", error);
      toast.error(
        error?.response?.data?.message || "Signin failed! Try again."
      );
    },
  });

  // === handle sign in ===
  const handleSignIn = (values: SignInFormValues) => {
    mutate(values);
  };

  return (
    <div className="h-screen w-full grid place-items-center bg-secondary">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="max-w-sm mx-auto w-full h-full flex flex-col items-center justify-center bg-background border-x"
        >
          <div className="w-full flex flex-col gap-4 border-y p-6 relative">
            <h2 className="text-xl mx-auto font-medium">Welcome Back</h2>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-fuchsia-500"
                aria-disabled={isPending}
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
