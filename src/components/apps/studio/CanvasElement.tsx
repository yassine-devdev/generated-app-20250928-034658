import React, { useRef, useCallback } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { StudioElement } from '@/lib/types';
import { useStudioStore } from '@/store/studioStore';
import { cn } from '@/lib/utils';
import { ResizeHandle } from './ResizeHandle';
import { RotationHandle } from './RotationHandle';
interface CanvasElementProps {
  element: StudioElement;
}
export function CanvasElement({ element }: CanvasElementProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });
  const { selectElement, selectedElementId, updateElementSize, updateElementRotation } = useStudioStore();
  const isSelected = selectedElementId === element.id;
  const elementRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);
  const rotateRef = useRef<{ startAngle: number; startRotation: number } | null>(null);
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeRef.current) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    const newWidth = Math.max(20, resizeRef.current.startWidth + dx);
    const newHeight = Math.max(20, resizeRef.current.startHeight + dy);
    updateElementSize(element.id, { width: newWidth, height: newHeight });
  }, [element.id, updateElementSize]);
  const handleResizeEnd = useCallback(() => {
    resizeRef.current = null;
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
  }, [handleResizeMove]);
  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: element.size.width,
      startHeight: element.size.height,
    };
    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
  }, [element.size.width, element.size.height, handleResizeMove, handleResizeEnd]);
  const handleRotateMove = useCallback((e: MouseEvent) => {
    if (!rotateRef.current || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const rotation = angle - rotateRef.current.startAngle + rotateRef.current.startRotation;
    updateElementRotation(element.id, rotation);
  }, [element.id, updateElementRotation]);
  const handleRotateEnd = useCallback(() => {
    rotateRef.current = null;
    window.removeEventListener('mousemove', handleRotateMove);
    window.removeEventListener('mouseup', handleRotateEnd);
  }, [handleRotateMove]);
  const handleRotateStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    rotateRef.current = { startAngle, startRotation: element.rotation };
    window.addEventListener('mousemove', handleRotateMove);
    window.addEventListener('mouseup', handleRotateEnd);
  }, [element.rotation, handleRotateMove, handleRotateEnd]);
  const style = {
    position: 'absolute' as const,
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    width: `${element.size.width}px`,
    height: `${element.size.height}px`,
    transform: `
      translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)
      rotate(${element.rotation}deg)
    `,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  const renderContent = () => {
    switch (element.type) {
      case 'rectangle':
        return <div className="w-full h-full" style={{ backgroundColor: element.props?.backgroundColor }} />;
      case 'text':
        return (
          <div
            className="w-full h-full flex items-center justify-center p-2 overflow-hidden"
            style={{
              color: element.props?.color,
              fontSize: `${element.props?.fontSize}px`,
              fontWeight: element.props?.fontWeight,
              textAlign: element.props?.textAlign,
            }}
          >
            {element.content}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={cn('cursor-grab active:cursor-grabbing')}
    >
      <div
        ref={elementRef}
        className={cn(
          'w-full h-full relative',
          isSelected && 'outline outline-2 outline-offset-2 outline-primary'
        )}
      >
        {renderContent()}
        {isSelected && (
          <>
            <RotationHandle onMouseDown={handleRotateStart} />
            <ResizeHandle position="top-left" onMouseDown={handleResizeStart} />
            <ResizeHandle position="top-right" onMouseDown={handleResizeStart} />
            <ResizeHandle position="bottom-left" onMouseDown={handleResizeStart} />
            <ResizeHandle position="bottom-right" onMouseDown={handleResizeStart} />
          </>
        )}
      </div>
    </div>
  );
}