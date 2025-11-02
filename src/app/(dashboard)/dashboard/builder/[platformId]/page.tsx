"use client";

import { Button } from "@/components/ui/button";
import { componentRegistry } from "@/components/registry";
import { useBuilderStore } from "@/store/builder-store";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentList } from "@/components/builder/component-list";
import { PreviewArea } from "@/components/builder/preview-area";
import { useState, useEffect, Suspense } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { platformApi } from "@/http/platform";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

const BuilderPageComponent = () => {
  const params = useParams();
  const platformId = params.platformId as string;

  const {
    pageStructure,
    hasChanges,
    addComponent,
    reorderComponents,
    setInitialPageStructure,
  } = useBuilderStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // === fetch platform data ===
  const { data: platformData, isLoading } = useQuery({
    queryKey: ["platform", platformId],
    queryFn: () => platformApi.getPlatformById(platformId),
    enabled: !!platformId,
  });

  // === load platform data into state on mount ===
  useEffect(() => {
    if (platformData?.platform?.pageStructure) {
      setInitialPageStructure(platformData.platform.pageStructure);
    }
  }, [platformData, setInitialPageStructure]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Check if dragging from registry to preview area
    if (active.id.toString().startsWith("registry-")) {
      const componentId = active.id.toString().replace("registry-", "");
      const allComponents = Object.values(componentRegistry).flat();
      const component = allComponents.find((c) => c.id === componentId);

      if (component) {
        addComponent(component.id, component.type, component.defaultProps);
      }
      return;
    }

    // Reordering within preview
    if (active.id !== over.id && !over.id.toString().startsWith("registry-")) {
      reorderComponents(active.id.toString(), over.id.toString());
    }
  };

  // === update platform mutation ===
  const updateMutation = useMutation({
    mutationFn: (payload: any) =>
      platformApi.updatePlatform(platformId, payload),
    onSuccess: (response) => {
      setInitialPageStructure(response.platform.pageStructure);
      toast.success("Platform updated successfully!");
    },
    onError: (error: any) => {
      console.log("err", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to update platform! Try again."
      );
    },
  });

  // === handle save platform ===
  const handleSave = () => {
    const payload = {
      pageStructure: pageStructure.map(({ _id, ...rest }) => ({
        ...rest,
      })),
    };

    updateMutation.mutate(payload);
  };

  const isPending = updateMutation.isPending || isLoading;

  if (isLoading) {
    return (
      <div className="bg-muted h-full w-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="bg-muted">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="h-full w-full grid lg:grid-cols-2 gap-4 px-4 py-4">
          {/* left part */}
          <div className="h-full px-4 py-2 rounded-lg bg-background border overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <ComponentList />
          </div>

          {/* right part */}
          <div className="h-full rounded-lg bg-background border flex flex-col">
            <div className="px-4 py-2 border-b flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Preview</p>
                <p className="text-xs text-muted-foreground">
                  {platformData?.platform?.name}
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasChanges || isPending}
              >
                {isPending ? (
                  <>
                    <Loader className="size-4 animate-spin" /> Saving..
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SortableContext
                items={pageStructure.map((c) => c._id as string)}
                strategy={verticalListSortingStrategy}
              >
                <PreviewArea />
              </SortableContext>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId && activeId.startsWith("registry-") && (
            <div className="border rounded-lg p-3 bg-background shadow-lg">
              <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  Dragging...
                </span>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const BuilderPage = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-muted h-full w-full flex items-center justify-center">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <BuilderPageComponent />
    </Suspense>
  );
};

export default BuilderPage;
