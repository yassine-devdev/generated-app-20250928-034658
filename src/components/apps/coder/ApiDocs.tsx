import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
const apiFunctions = [
  {
    name: 'studio.addElement(type)',
    description: 'Adds a new element to the canvas.',
    params: [
      { name: 'type', type: "'rectangle' | 'text'", description: 'The type of element to add.' },
    ],
    example: `studio.addElement('rectangle');`,
  },
  {
    name: 'studio.updateElementProps(id, props)',
    description: 'Updates the properties of an existing element.',
    params: [
      { name: 'id', type: 'string', description: 'The ID of the element to update.' },
      { name: 'props', type: 'object', description: 'An object with properties to update (e.g., { backgroundColor: "#ff0000" }).' },
    ],
    example: `// Note: You need an element's ID first.
const element = studio.getElementById('el-12345');
if (element) {
  studio.updateElementProps(element.id, { 
    backgroundColor: '#14B8A6' 
  });
}`,
  },
  {
    name: 'studio.getElementById(id)',
    description: 'Retrieves an element from the canvas by its ID.',
    params: [
      { name: 'id', type: 'string', description: 'The ID of the element to find.' },
    ],
    returns: 'StudioElement | undefined',
    example: `const myElement = studio.getElementById('el-12345');
studio.log(myElement);`,
  },
  {
    name: 'studio.selectElement(id)',
    description: 'Selects an element on the canvas.',
    params: [
      { name: 'id', type: 'string | null', description: 'The ID of the element to select, or null to deselect all.' },
    ],
    example: `studio.selectElement('el-12345');`,
  },
  {
    name: 'studio.deleteSelectedElement()',
    description: 'Deletes the currently selected element.',
    params: [],
    example: `// First, select an element
studio.selectElement('el-12345');
// Then delete it
studio.deleteSelectedElement();`,
  },
  {
    name: 'studio.log(...args)',
    description: 'Logs messages to the Coder app console.',
    params: [
      { name: '...args', type: 'any', description: 'Values to log, similar to console.log().' },
    ],
    example: `studio.log('Hello from the script!', { a: 1 });`,
  },
];
export function ApiDocs() {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Studio API Documentation</h2>
          <p className="text-muted-foreground">Use the global `studio` object to control the Studio canvas from your scripts.</p>
        </div>
        {apiFunctions.map(func => (
          <Card key={func.name} className="glass-pane">
            <CardHeader>
              <CardTitle className="font-mono text-lg text-primary">{func.name}</CardTitle>
              <CardDescription>{func.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {func.params.length > 0 && (
                <>
                  <h4 className="font-semibold mb-2">Parameters</h4>
                  <ul className="space-y-2 text-sm">
                    {func.params.map(p => (
                      <li key={p.name}>
                        <code className="font-mono bg-muted p-1 rounded-sm">{p.name}</code>: <code className="font-mono text-amber-400">{p.type}</code> - {p.description}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {func.returns && (
                <>
                  <h4 className="font-semibold mt-4 mb-2">Returns</h4>
                  <p className="text-sm"><code className="font-mono text-amber-400">{func.returns}</code></p>
                </>
              )}
              <h4 className="font-semibold mt-4 mb-2">Example</h4>
              <pre className="bg-zinc-950/50 p-3 rounded-md text-sm font-mono overflow-x-auto">
                <code>{func.example}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}