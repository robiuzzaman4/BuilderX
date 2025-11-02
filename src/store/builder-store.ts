import { create } from "zustand";
import { TComponentInstance } from "@/types/platform";

type BuilderStore = {
  pageStructure: TComponentInstance[];
  addComponent: (
    componentId: string,
    type: string,
    defaultProps: Record<string, any>
  ) => void;
  removeComponent: (id: string) => void;
  updateComponentProps: (id: string, props: Record<string, any>) => void;
  reorderComponents: (activeId: string, overId: string) => void;
  clearAll: () => void;
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  pageStructure: [],

  addComponent: (componentId, type, defaultProps) =>
    set((state) => ({
      pageStructure: [
        ...state.pageStructure,
        {
          _id: `temp-${Date.now()}`, // Temporary ID
          type,
          componentId,
          order: state.pageStructure.length,
          props: defaultProps,
        },
      ],
    })),

  removeComponent: (id) =>
    set((state) => ({
      pageStructure: state.pageStructure
        .filter((comp) => comp._id !== id)
        .map((comp, index) => ({ ...comp, order: index })),
    })),

  updateComponentProps: (id, props) =>
    set((state) => ({
      pageStructure: state.pageStructure.map((comp) =>
        comp._id === id ? { ...comp, props: { ...comp.props, ...props } } : comp
      ),
    })),

  reorderComponents: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.pageStructure.findIndex((c) => c._id === activeId);
      const newIndex = state.pageStructure.findIndex((c) => c._id === overId);

      const newPageStructure = [...state.pageStructure];
      const [movedItem] = newPageStructure.splice(oldIndex, 1);
      newPageStructure.splice(newIndex, 0, movedItem);

      return {
        pageStructure: newPageStructure.map((comp, index) => ({
          ...comp,
          order: index,
        })),
      };
    }),

  clearAll: () => set({ pageStructure: [] }),
}));
