"use client";

import { cn } from "@/lib/utils";
import { SquaresSubtract, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useMe } from "@/hooks/use-me";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/http/auth";
import { toast } from "sonner";
import { queryClient } from "@/providers/query-provider";

const NAVLINKS = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Builder",
    path: "/dashboard/builder",
  },
];

export const Navbar = () => {
  // === pathname ===
  const pathname = usePathname();

  // === get loggedin user ===
  const { data } = useMe();

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
    <nav className="h-14 w-full fixed top-0 bg-background border-b">
      <div className="h-full w-full max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="text-base font-bold flex items-center gap-2"
        >
          <SquaresSubtract className="text-cyan-500" /> <p className="hidden sm:inline-flex">BuilderX</p>
        </Link>

        {/* navlinks */}
        <div className="flex items-center gap-4">
          {NAVLINKS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium px-3 h-7 grid place-items-center rounded-md border border-transparent",
                  {
                    "bg-muted border-border": isActive,
                  }
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full text-cyan-500 size-7"
            >
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hi {data?.user?.name}! 👋</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
