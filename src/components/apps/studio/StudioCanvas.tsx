import React from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useStudioStore } from '@/store/studioStore';
import { CanvasElement } from './CanvasElement';
import { useShallow } from 'zustand/react/shallow';
export function StudioCanvas() {
  const { elements, updateElementPosition, selectElement } = useStudioStore(
    useShallow((state) => ({
      elements: state.elements,
      updateElementPosition: state.updateElementPosition,
      selectElement: state.selectElement,
    }))
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    updateElementPosition(active.id, delta);
  };
  // Sort elements by zIndex to ensure correct stacking order
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  return (
    <div
      className="w-full h-full bg-zinc-800/50 relative overflow-hidden"
      onClick={() => selectElement(null)}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {sortedElements.map((element) => (
          <CanvasElement key={element.id} element={element} />
        ))}
      </DndContext>
    </div>
  );
}