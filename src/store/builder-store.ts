import { create } from "zustand";
import { TComponentInstance } from "@/types/platform";

type BuilderStore = {
  initialPageStructure: TComponentInstance[];
  pageStructure: TComponentInstance[];
  hasChanges: boolean;
  setInitialPageStructure: (structure: TComponentInstance[]) => void;
  setPageStructure: (structure: TComponentInstance[]) => void;
  addComponent: (
    componentId: string,
    type: string,
    defaultProps: Record<string, any>
  ) => void;
  removeComponent: (id: string) => void;
  updateComponentProps: (id: string, props: Record<string, any>) => void;
  reorderComponents: (activeId: string, overId: string) => void;
  resetToInitial: () => void;
  clearAll: () => void;
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  initialPageStructure: [],
  pageStructure: [],
  hasChanges: false,

  setInitialPageStructure: (structure) =>
    set({
      initialPageStructure: structure,
      pageStructure: structure,
      hasChanges: false,
    }),

  setPageStructure: (structure) =>
    set((state) => ({
      pageStructure: structure,
      hasChanges:
        JSON.stringify(structure) !==
        JSON.stringify(state.initialPageStructure),
    })),

  addComponent: (componentId, type, defaultProps) =>
    set((state) => {
      const newStructure = [
        ...state.pageStructure,
        {
          _id: `temp-${Date.now()}`,
          type,
          componentId,
          order: state.pageStructure.length,
          props: defaultProps,
        },
      ];
      return {
        pageStructure: newStructure,
        hasChanges:
          JSON.stringify(newStructure) !==
          JSON.stringify(state.initialPageStructure),
      };
    }),

  removeComponent: (id) =>
    set((state) => {
      const newStructure = state.pageStructure
        .filter((comp) => comp._id !== id)
        .map((comp, index) => ({ ...comp, order: index }));
      return {
        pageStructure: newStructure,
        hasChanges:
          JSON.stringify(newStructure) !==
          JSON.stringify(state.initialPageStructure),
      };
    }),

  updateComponentProps: (id, props) =>
    set((state) => {
      const newStructure = state.pageStructure.map((comp) =>
        comp._id === id ? { ...comp, props: { ...comp.props, ...props } } : comp
      );
      return {
        pageStructure: newStructure,
        hasChanges:
          JSON.stringify(newStructure) !==
          JSON.stringify(state.initialPageStructure),
      };
    }),

  reorderComponents: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.pageStructure.findIndex((c) => c._id === activeId);
      const newIndex = state.pageStructure.findIndex((c) => c._id === overId);

      const newPageStructure = [...state.pageStructure];
      const [movedItem] = newPageStructure.splice(oldIndex, 1);
      newPageStructure.splice(newIndex, 0, movedItem);

      const newStructure = newPageStructure.map((comp, index) => ({
        ...comp,
        order: index,
      }));

      return {
        pageStructure: newStructure,
        hasChanges:
          JSON.stringify(newStructure) !==
          JSON.stringify(state.initialPageStructure),
      };
    }),

  resetToInitial: () =>
    set((state) => ({
      pageStructure: state.initialPageStructure,
      hasChanges: false,
    })),

  clearAll: () =>
    set({
      initialPageStructure: [],
      pageStructure: [],
      hasChanges: false,
    }),
}));
