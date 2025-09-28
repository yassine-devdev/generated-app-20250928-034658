import React from 'react';
import { useStudioStore } from '@/store/studioStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { ColorInput } from './ColorInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
export function StudioPropertyInspector() {
  const { selectedElementId, elements, updateElementProps, updateElementRotation, deleteSelectedElement, bringForward, sendBackward } = useStudioStore(
    useShallow(state => ({
      selectedElementId: state.selectedElementId,
      elements: state.elements,
      updateElementProps: state.updateElementProps,
      updateElementRotation: state.updateElementRotation,
      deleteSelectedElement: state.deleteSelectedElement,
      bringForward: state.bringForward,
      sendBackward: state.sendBackward,
    }))
  );
  const selectedElement = elements.find(el => el.id === selectedElementId);
  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        Select an element to edit its properties.
      </div>
    );
  }
  const handlePropChange = (prop: string, value: any) => {
    updateElementProps(selectedElement.id, { [prop]: value });
  };
  return (
    <div className="p-4 space-y-6 bg-zinc-900 h-full overflow-y-auto">
      <div>
        <h3 className="font-semibold mb-2">Transform</h3>
        <div className="space-y-2">
          <Label>Rotation</Label>
          <div className="flex items-center gap-2">
            <Slider
              value={[selectedElement.rotation]}
              onValueChange={([val]) => updateElementRotation(selectedElement.id, val)}
              min={-180}
              max={180}
              step={1}
            />
            <Input
              type="number"
              value={Math.round(selectedElement.rotation)}
              onChange={e => updateElementRotation(selectedElement.id, parseInt(e.target.value))}
              className="h-8 w-20 bg-zinc-800"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Layer</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={bringForward}><ArrowUp className="w-4 h-4 mr-2" /> Forward</Button>
          <Button variant="outline" size="sm" onClick={sendBackward}><ArrowDown className="w-4 h-4 mr-2" /> Backward</Button>
        </div>
      </div>
      {selectedElement.type === 'text' && (
        <div>
          <h3 className="font-semibold mb-2">Text</h3>
          <Textarea
            value={selectedElement.content}
            onChange={(e) => handlePropChange('content', e.target.value)}
            className="bg-zinc-800"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Font Size</Label>
              <Input type="number" value={selectedElement.props?.fontSize} onChange={e => handlePropChange('fontSize', parseInt(e.target.value))} className="h-8 bg-zinc-800" />
            </div>
            <div>
              <Label>Color</Label>
              <ColorInput value={selectedElement.props?.color || '#ffffff'} onChange={v => handlePropChange('color', v)} />
            </div>
          </div>
          <div className="mt-4">
            <Label>Style</Label>
            <div className="flex gap-2 mt-1">
              <Select value={selectedElement.props?.fontWeight} onValueChange={v => handlePropChange('fontWeight', v)}>
                <SelectTrigger className="h-8 bg-zinc-800"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="normal">Normal</SelectItem><SelectItem value="bold">Bold</SelectItem></SelectContent>
              </Select>
              <Select value={selectedElement.props?.textAlign} onValueChange={v => handlePropChange('textAlign', v)}>
                <SelectTrigger className="h-8 bg-zinc-800"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
      {selectedElement.type === 'rectangle' && (
        <div>
          <h3 className="font-semibold mb-2">Rectangle</h3>
          <div>
            <Label>Background Color</Label>
            <ColorInput value={selectedElement.props?.backgroundColor || '#3b82f6'} onChange={v => handlePropChange('backgroundColor', v)} />
          </div>
        </div>
      )}
      <div className="pt-4 border-t border-white/10">
        <Button variant="destructive" size="sm" className="w-full" onClick={deleteSelectedElement}>
          <Trash2 className="w-4 h-4 mr-2" /> Delete Element
        </Button>
      </div>
    </div>
  );
}