"use client";

import { CreatePlatformDialog } from "@/components/shared/create-platform-dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMe } from "@/hooks/use-me";
import { platformApi } from "@/http/platform";
import { useQuery } from "@tanstack/react-query";
import { Loader, Plus, Calendar } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TPlatform } from "@/types/platform";

const DashboardPageComponent = () => {
  const { data } = useMe();
  const [open, setOpen] = useState(false);

  // === fetch user platforms ===
  const { data: platformsData, isLoading } = useQuery({
    queryKey: ["platforms"],
    queryFn: platformApi.getAllPlatforms,
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-4 space-y-6">
        <h1 className="text-xl font-medium border-b pb-4">
          Welcome Back {data?.user?.name}!
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-60">
            <Loader className="size-4 animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Create New Platform Button */}
            <Card
              onClick={() => setOpen(true)}
              className="h-60 hover:shadow-lg transition cursor-pointer group grid place-items-center border-dashed"
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <Plus className="size-4" />
                <p>Create New Platform</p>
              </div>
            </Card>

            {/* Platform Cards */}
            {platformsData?.data?.map((platform: TPlatform) => (
              <Link
                key={platform?._id}
                href={`/dashboard/builder/${platform?._id}`}
                className="block"
              >
                <Card className="h-60 hover:shadow-lg transition cursor-pointer group border-dashed">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold truncate">
                        {platform?.name}
                      </h3>
                      {platform?.isPublished ? (
                        <Badge variant="emerald">Published</Badge>
                      ) : (
                        <Badge variant="orange">Un Published</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      /{platform?.slug}
                    </p>
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
                          No preview
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
                  </CardContent>
                </Card>
              </Link>
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
