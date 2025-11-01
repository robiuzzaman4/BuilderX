"use client";

import { authApi } from "@/http/auth";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["ME"],
    queryFn: () => authApi.me(),
    retry: false,
  });
}
