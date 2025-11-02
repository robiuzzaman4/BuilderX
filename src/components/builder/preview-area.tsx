import { useBuilderStore } from "@/store/builder-store";
import { componentRegistry } from "@/components/registry";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDroppable } from "@dnd-kit/core";

export function PreviewArea() {
  const { pageStructure, removeComponent } = useBuilderStore();
  const { setNodeRef } = useDroppable({
    id: "preview-area",
  });

  if (pageStructure.length === 0) {
    return (
      <div
        ref={setNodeRef}
        className="h-full flex items-center justify-center text-muted-foreground min-h-[400px]"
      >
        <p>Drag components here to start building</p>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} className="space-y-2 p-4 min-h-[400px]">
      {pageStructure.map((instance) => (
        <SortableComponentInstance
          key={instance._id}
          instance={instance}
          onRemove={removeComponent}
        />
      ))}
    </div>
  );
}

function SortableComponentInstance({ instance, onRemove }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: instance._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Find component from registry
  const allComponents = Object.values(componentRegistry).flat();
  const registryComponent = allComponents.find(
    (c) => c.id === instance.componentId
  );

  if (!registryComponent) return null;

  const Component = registryComponent.component;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group border rounded-lg overflow-hidden"
    >
      {/* Control Bar */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 cursor-grab active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          className="h-8 w-8"
          onClick={() => onRemove(instance._id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Component Preview */}
      <div className="pointer-events-none">
        <Component {...instance.props} />
      </div>
    </div>
  );
}