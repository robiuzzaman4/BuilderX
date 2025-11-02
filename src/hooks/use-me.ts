"use client";

import { userApi } from "@/http/user";
import { useQuery } from "@tanstack/react-query";

export function useMe() {
  return useQuery({
    queryKey: ["ME"],
    queryFn: () => userApi.me(),
    retry: false,
  });
}
