import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StudioElement, ElementType } from '@/lib/types';
interface StudioState {
  elements: StudioElement[];
  selectedElementId: string | null;
  nextZIndex: number;
}
interface StudioActions {
  addElement: (type: ElementType) => void;
  updateElementPosition: (id: string, delta: { x: number; y: number }) => void;
  selectElement: (id: string | null) => void;
  deleteSelectedElement: () => void;
  updateElementProps: (id: string, props: Partial<StudioElement['props']>) => void;
  updateElementSize: (id: string, size: { width: number; height: number }) => void;
  updateElementRotation: (id: string, rotation: number) => void;
  bringForward: () => void;
  sendBackward: () => void;
  getElementById: (id: string) => StudioElement | undefined;
}
export const useStudioStore = create<StudioState & StudioActions>()(
  immer((set, get) => ({
    elements: [],
    selectedElementId: null,
    nextZIndex: 1,
    addElement: (type) => {
      set((state) => {
        const newElement: StudioElement = {
          id: `el-${Date.now()}`,
          type,
          position: { x: 50, y: 50 },
          size: type === 'text' ? { width: 200, height: 50 } : { width: 100, height: 100 },
          rotation: 0,
          zIndex: state.nextZIndex,
          content: type === 'text' ? 'Hello World' : undefined,
          props: {
            backgroundColor: type === 'rectangle' ? '#3b82f6' : 'transparent',
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'normal',
            textAlign: 'center',
          },
        };
        state.elements.push(newElement);
        state.selectedElementId = newElement.id;
        state.nextZIndex += 1;
      });
    },
    updateElementPosition: (id, delta) => {
      set((state) => {
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          element.position.x += delta.x;
          element.position.y += delta.y;
        }
      });
    },
    selectElement: (id) => {
      set((state) => {
        state.selectedElementId = id;
      });
    },
    deleteSelectedElement: () => {
      const { selectedElementId } = get();
      if (!selectedElementId) return;
      set((state) => {
        state.elements = state.elements.filter((el) => el.id !== selectedElementId);
        state.selectedElementId = null;
      });
    },
    updateElementProps: (id, props) => {
      set((state) => {
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          element.props = { ...element.props, ...props };
        }
      });
    },
    updateElementSize: (id, size) => {
      set((state) => {
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          element.size = size;
        }
      });
    },
    updateElementRotation: (id, rotation) => {
      set((state) => {
        const element = state.elements.find((el) => el.id === id);
        if (element) {
          element.rotation = rotation;
        }
      });
    },
    bringForward: () => {
      const { selectedElementId } = get();
      if (!selectedElementId) return;
      set((state) => {
        const element = state.elements.find((el) => el.id === selectedElementId);
        if (element) {
          element.zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        }
      });
    },
    sendBackward: () => {
      const { selectedElementId, elements } = get();
      if (!selectedElementId) return;
      const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
      const currentIndex = sortedElements.findIndex(el => el.id === selectedElementId);
      if (currentIndex > 0) {
        const elementToSwapWith = sortedElements[currentIndex - 1];
        set(state => {
          const currentElement = state.elements.find(el => el.id === selectedElementId);
          const swapElement = state.elements.find(el => el.id === elementToSwapWith.id);
          if (currentElement && swapElement) {
            const tempZ = currentElement.zIndex;
            currentElement.zIndex = swapElement.zIndex;
            swapElement.zIndex = tempZ;
          }
        });
      }
    },
    getElementById: (id) => {
      return get().elements.find((el) => el.id === id);
    },
  }))
);