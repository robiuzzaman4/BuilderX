import { componentRegistry } from "@/components/registry";
import { useDraggable } from "@dnd-kit/core";

export function ComponentList() {
  return (
    <div className="space-y-6">
      {Object.entries(componentRegistry).map(([category, components]) => (
        <div key={category}>
          <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {components.map((component) => (
              <DraggableComponent key={component.id} component={component} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DraggableComponent({ component }: { component: any }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `registry-${component.id}`,
    data: {
      type: "registry-component",
      component,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-cyan-500 transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
        <span className="text-xs text-muted-foreground">{component.name}</span>
      </div>
      <p className="text-xs font-medium text-center">{component.name}</p>
    </div>
  );
}