"use client";

import { platformApi } from "@/http/platform";
import { getComponentFromRegistry } from "@/lib/get-components-from-registry";
import { TPlatform } from "@/types/platform";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

const PageContentRenderer: React.FC<{ platform: TPlatform }> = ({
  platform,
}) => {
  if (!platform || platform?.pageStructure?.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>This page is empty or not yet published.</p>
      </div>
    );
  }

  const sortedStructure = platform.pageStructure.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    // The main container for the rendered website
    <div className="min-h-screen">
      {sortedStructure.map((componentData, index) => {
        const componentId = componentData.componentId;

        // get the actual react component from the registry
        const Component = getComponentFromRegistry(componentId);

        if (!Component) {
          console.error(
            `Component not found in registry for ID: ${componentId}`
          );
          return (
            <div
              key={componentData._id || index}
              className="text-center p-4 bg-red-100 text-red-700"
            >
              Error: Component '{componentId}' is missing.
            </div>
          );
        }

        // render the Component, passing the saved props and a unique key
        return (
          <Component
            key={componentData?._id || index}
            {...componentData.props}
          />
        );
      })}
    </div>
  );
};

// === dynamic platform page ===
const DynamicPlatformPage = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // === fetch platform data ===
  const { data: platformData, isLoading } = useQuery({
    queryKey: ["platform", slug],
    queryFn: () => platformApi.getPlatformBySlug(slug as string),
    enabled: !!slug,
  });

  const platform: TPlatform = platformData?.platform;

  if (isLoading || !slug) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!platform || platform?.pageStructure?.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p>This page is empty or not yet published.</p>
      </div>
    );
  }

  // Render the page content using the fetched structure
  return <PageContentRenderer platform={platform} />;
};

export default DynamicPlatformPage;
