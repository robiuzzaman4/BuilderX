"use client";

import { SquaresSubtract } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/http/auth";
import { toast } from "sonner";
import { queryClient } from "@/providers/query-provider";

export const Navbar = () => {
  // === get loggedin user ===
  const { isLoading } = useMe();

  // === sign out mutation ===
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.signOut,
    onSuccess: async (data) => {
      toast.success(data?.message);
      await queryClient.invalidateQueries({ queryKey: ["ME"] });
      window.location.href = "/sign-in";
    },
    onError: (error: any) => {
      console.log("err", error);
      toast.error(
        error?.response?.data?.message || "Sign out failed! Try again."
      );
    },
  });

  // === handle sign out ===
  const handleSignOut = () => {
    mutate();
  };

  return (
    <nav className="h-14 w-full fixed top-0 bg-background border-b z-50">
      <div className="h-full w-full max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="text-base font-bold flex items-center gap-2"
        >
          <SquaresSubtract className="text-blue-500" />{" "}
          <p className="hidden sm:inline-flex">BuilderX</p>
        </Link>

        <Button
          variant="destructive"
          disabled={isPending || isLoading}
          className="px-3 h-7 grid place-items-center py-0"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </nav>
  );
};
