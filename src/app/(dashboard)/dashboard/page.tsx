"use client";

import { CreatePlatformDialog } from "@/components/shared/create-platform-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMe } from "@/hooks/use-me";
import { platformApi } from "@/http/platform";
import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  Plus,
  Calendar,
  ArrowRight,
  Edit,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TPlatform } from "@/types/platform";
import { BASE_URL } from "@/constant";
import { useRouter } from "next/navigation";

const DashboardPageComponent = () => {
  const { data } = useMe();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // === fetch user platforms ===
  const { data: platformsData, isLoading } = useQuery({
    queryKey: ["platforms"],
    queryFn: platformApi.getAllPlatforms,
  });

  // === handle naviagte edit platform page ===
  const handleNavigate = (id: string) => {
    router.push(`/dashboard/builder/${id}`);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-4 space-y-6">
        <h1 className="text-xl font-medium border-b pb-4 border-dashed">
          Welcome Back {data?.user?.name} 👋
        </h1>

        <h2 className="text-sm text-center font-medium bg-muted h-9 flex items-center justify-center">
          Manage Your Platforms
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-60">
            <Loader className="size-4 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Create New Platform Button */}
            <Card
              onClick={() => setOpen(true)}
              className="min-h-72 hover:shadow-lg transition cursor-pointer group grid place-items-center border-dashed hover:border-blue-500"
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <Plus className="size-4" />
                <p>Create New Platform</p>
              </div>
            </Card>

            {/* Platform Cards */}
            {platformsData?.data?.map((platform: TPlatform) => (
              <div
                key={platform?._id}
                onClick={() => handleNavigate(platform?._id)}
                className="block"
              >
                <Card className="min-h-72 hover:shadow-lg transition cursor-pointer group border-dashed hover:border-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold truncate">
                        {platform?.name}
                      </h3>
                      {platform?.isPublished ? (
                        <Badge variant="blue">Published</Badge>
                      ) : (
                        <Badge variant="orange">Un Published</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      <p>Domain:</p>
                      <p className="text-foreground">{`${BASE_URL}/platform/${platform?.slug}`}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                      {platform?.thumbnail ? (
                        <img
                          src={platform?.thumbnail}
                          alt={platform?.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No preview available
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 pt-2">
                      <p>Created At: </p>
                      <Calendar className="size-3" />
                      {format(
                        new Date(platform?.createdAt as Date),
                        "MMM dd, yyyy"
                      )}
                    </div>

                    <a
                      href={`${BASE_URL}/platform/${platform?.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      className="bg-muted px-4 rounded-md h-9 flex items-center justify-between text-muted-foreground border border-dashed border-transparent hover:border-blue-500"
                    >
                      <p className="text-xs font-medium">Visit Live Url</p>
                      <ArrowUpRight className="size-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreatePlatformDialog open={open} setOpen={setOpen} />
    </>
  );
};

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-60">
          <Loader className="size-x animate-spin" />
        </div>
      }
    >
      <DashboardPageComponent />
    </Suspense>
  );
};

export default DashboardPage;
