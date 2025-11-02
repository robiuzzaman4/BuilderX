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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { platformApi } from "@/http/platform";
import { toast } from "sonner";
import { useMe } from "@/hooks/use-me";
import { Loader } from "lucide-react";

const BuilderPage = () => {
  // === get current user ===
  const { data } = useMe();

  const { pageStructure, addComponent, reorderComponents } = useBuilderStore();
  const [activeId, setActiveId] = useState<string | null>(null);

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

  // === create builder mutation ===
  const { mutate, isPending } = useMutation({
    mutationFn: platformApi.createPlatform,
    onSuccess: () => {
      toast.success("Saved changes!");
    },
    onError: (error: any) => {
      console.log("err", error);
      toast.error(
        error?.response?.data?.message || "Failed to saved! Try again."
      );
    },
  });

  // === handle save platform ===
  const handleSave = () => {
    const payload = {
      name: `${data?.user?.name}-projects`,
      pageStructure: pageStructure.map(({ _id, ...rest }) => ({
        ...rest,
      })),
    };

    console.log("payload: ", payload);

    mutate(payload);
  };

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
              <p className="text-sm font-medium">Preview</p>
              <Button size="sm" onClick={handleSave} disabled={isPending}>
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

export default BuilderPage;
