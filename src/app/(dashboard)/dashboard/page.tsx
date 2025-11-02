"use client";

import { useMe } from "@/hooks/use-me";
import { Plus } from "lucide-react";
import Link from "next/link";

const DashboardPage = () => {
  const { data } = useMe();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 space-y-6">
      <h1 className="text-xl font-medium border-b pb-4">
        Welcome Back {data?.user?.name}!
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Link
          href="/dashboard/builder"
          className="group h-60 rounded-md bg-muted/50 border border-dashed hover:border-cyan-500 hover:shadow text-sm font-medium flex items-center justify-center gap-1"
        >
          <Plus className="size-4 group-hover:text-cyan-500" />{" "}
          <p className="group-hover:text-cyan-500">Create New Platform</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
