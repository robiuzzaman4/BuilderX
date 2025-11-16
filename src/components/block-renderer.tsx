import { componentRegistry } from "@/utils/component-registry";
import { Suspense } from "react";

interface BlockRendererProps {
  name: string;
  props?: Record<string, any>;
}

const BlockSkeleton = ({ name }: { name: string }) => (
  <div className="w-full h-32 flex items-center justify-center bg-zinc-50 animate-pulse">
    <span className="text-zinc-500">Loading {name}...</span>
  </div>
);

export const BlockRenderer = ({ name, props = {} }: BlockRendererProps) => {
  const Component = componentRegistry[name];

  if (!Component) {
    console.warn(`Component "${name}" not found in registry`);
    return (
      <div className="w-full text-center p-4 bg-orange-50 text-orange-500 border-b border-b-zinc-200">
        Warning: Component "{name}" not found in registry
      </div>
    );
  }

  return (
    <Suspense fallback={<BlockSkeleton name={name} />}>
      <Component {...props} />
    </Suspense>
  );
};
