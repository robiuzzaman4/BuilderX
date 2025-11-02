import { componentRegistry, TRegistryComponent } from "@/components/registry";

export const getComponentMap = (): Record<string, TRegistryComponent> => {
  const map: Record<string, TRegistryComponent> = {};
  Object.values(componentRegistry || {})?.forEach((category) => {
    category?.forEach((comp) => {
      map[comp?.id] = comp;
    });
  });
  return map;
};

// create the map once
const componentMap = getComponentMap();

// main lookup function
export const getComponentFromRegistry = (componentId: string) => {
  return componentMap[componentId]?.component;
};
