"use client";

import { CreatePlatformDialog } from "@/components/shared/create-platform-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMe } from "@/hooks/use-me";
import { platformApi } from "@/http/platform";
import { useQuery } from "@tanstack/react-query";
import { Loader, Plus, Globe, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";

const DashboardPage = () => {
  const { data } = useMe();
  const [open, setOpen] = useState(false);

  // === fetch user platforms ===
  const { data: platformsData, isLoading } = useQuery({
    queryKey: ["platforms"],
    queryFn: platformApi.getAllPlatforms,
  });

  console.log("platformsData", platformsData);
  

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-4 space-y-6">
        <h1 className="text-xl font-medium border-b pb-4">
          Welcome Back {data?.user?.name}!
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-60">
            <Loader className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Create New Platform Button */}
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="h-60 group hover:border-cyan-500"
            >
              <Plus className="size-4 group-hover:text-cyan-500" />
              <p className="group-hover:text-cyan-500">Create New Platform</p>
            </Button>

            {/* Platform Cards */}
            {platformsData?.data?.map((platform: any) => (
              <Link
                key={platform._id}
                href={`/app/builder/${platform._id}`}
                className="block"
              >
                <Card className="h-60 hover:shadow-lg transition cursor-pointer group">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate group-hover:text-cyan-600 transition">
                        {platform.name}
                      </h3>
                      {platform.isPublished && (
                        <Globe className="size-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      /{platform.slug}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                      {platform.thumbnail ? (
                        <img
                          src={platform.thumbnail}
                          alt={platform.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No preview
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {platform.pageStructure?.length || 0} components
                    </p>
                  </CardContent>

                  <CardFooter className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {format(new Date(platform.createdAt), "MMM dd, yyyy")}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && platformsData?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <p className="text-muted-foreground mb-4">
              No platforms yet. Create your first one!
            </p>
            <Button onClick={() => setOpen(true)}>
              <Plus className="size-4 mr-2" /> Create Platform
            </Button>
          </div>
        )}
      </div>

      <CreatePlatformDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default DashboardPage;
