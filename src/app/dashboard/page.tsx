"use client";

import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import { authApi } from "@/http/auth";
import { queryClient } from "@/providers/query-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
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
    <div className="max-w-7xl mx-auto py-20">
      {data?.user && (
        <Button
          variant="destructive"
          onClick={handleSignOut}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="size-4 mx-auto animate-spin" />
          ) : (
            "Sign Out"
          )}
        </Button>
      )}
    </div>
  );
};

export default DashboardPage;
