
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MarkdownGuide: React.FC = () => {
  return (
    <Card className="w-full shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Markdown Syntax Guide</CardTitle>
        <CardDescription>A quick reference for formatting your markdown text</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Text Styling</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Italic</h4>
              <div className="flex flex-col gap-1.5">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">*italic text*</code>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">_italic text_</code>
                <p>Renders as: <em>italic text</em></p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Bold</h4>
              <div className="flex flex-col gap-1.5">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">**bold text**</code>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">__bold text__</code>
                <p>Renders as: <strong>bold text</strong></p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Code</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Inline Code</h4>
              <div className="flex flex-col gap-1.5">
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">`code text`</code>
                <p>Renders as: <code>code text</code></p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Code Blocks</h4>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm">Use triple backticks to create code blocks:</p>
                <pre className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                  ```{'\n'}function example() {'{'}
                  {'\n'}  return "hello world";
                  {'\n'}{'}'}
                  {'\n'}```
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Headers</h3>
          <Separator className="my-2" />
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded"># Heading 1</code>
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">## Heading 2</code>
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">### Heading 3</code>
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">#### Heading 4</code>
            </div>
            <p className="text-sm">The number of # symbols determines the heading level (1-6).</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Links</h3>
          <Separator className="my-2" />
          <div className="space-y-3">
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">[Link text](https://example.com)</code>
            <p>Renders as: <a href="#" className="text-primary underline">Link text</a></p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Lists</h3>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Unordered Lists</h4>
              <div className="flex flex-col gap-1.5">
                <pre className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                  - Item 1{'\n'}- Item 2{'\n'}- Item 3
                </pre>
                <p className="text-sm">You can also use * or + instead of -</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Ordered Lists</h4>
              <div className="flex flex-col gap-1.5">
                <pre className="text-sm bg-muted p-2 rounded whitespace-pre-wrap">
                  1. First item{'\n'}2. Second item{'\n'}3. Third item
                </pre>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarkdownGuide;
