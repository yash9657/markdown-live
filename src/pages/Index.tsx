
import React, { useEffect, useState } from 'react';
import MarkdownEditor from '../components/MarkdownEditor';
import MarkdownPreview from '../components/MarkdownPreview';
import Header from '../components/Header';
import DocumentActions from '../components/DocumentActions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Copy, Download, Maximize, Minimize } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Default markdown content for first-time users
const DEFAULT_MARKDOWN = `# Welcome to Markdown Live Preview

## Getting Started

This is a **live preview** of your markdown. As you type in the editor on the left, the preview will update in real-time on the right.

### Basic Syntax

- **Bold text** is made with \`**asterisks**\`
- *Italic text* is made with \`*single asterisks*\`
- [Links](https://example.com) are created with \`[text](url)\`
- Lists are created with hyphens or numbers

### Code Blocks

\`\`\`javascript
// Here's some JavaScript code
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Enjoy writing with markdown!
`;

const Index: React.FC = () => {
  // State for markdown content, persisted in localStorage
  const [markdown, setMarkdown] = useLocalStorage<string>('markdown-content', DEFAULT_MARKDOWN);
  
  // State for dark mode, default to true
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('markdown-dark-mode', true);
  
  // State for maximized panels
  const [maximizedPanel, setMaximizedPanel] = useState<'editor' | 'preview' | null>(null);
  
  // Apply dark mode class to html element whenever component mounts or dark mode changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Copy markdown to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    toast({
      title: "Copied!",
      description: "Markdown content copied to clipboard",
    });
  };

  // Download markdown file
  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = 'document.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Downloaded!",
      description: "Markdown file downloaded successfully",
    });
  };

  // Toggle maximized panel
  const toggleMaximize = (panel: 'editor' | 'preview') => {
    if (maximizedPanel === panel) {
      setMaximizedPanel(null);
    } else {
      setMaximizedPanel(panel);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="py-4 px-6 border-b flex items-center justify-between">
        <h2 className="text-lg font-medium">Editor</h2>
        <DocumentActions markdown={markdown} setMarkdown={setMarkdown} />
      </div>
      
      <main className="flex flex-col md:flex-row flex-1 h-full overflow-hidden">
        {(!maximizedPanel || maximizedPanel === 'editor') && (
          <div className={`flex-1 p-4 h-[50vh] md:h-auto ${maximizedPanel === 'editor' ? 'w-full' : ''}`}>
            <div className="h-full flex flex-col rounded-md border overflow-hidden animate-scale-in">
              <div className="bg-muted px-4 py-2 text-sm font-medium border-b flex justify-between items-center">
                <span>Markdown</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={downloadMarkdown} title="Download markdown">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleMaximize('editor')}
                    title={maximizedPanel === 'editor' ? 'Minimize' : 'Maximize'}
                  >
                    {maximizedPanel === 'editor' ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>
          </div>
        )}
        
        {!maximizedPanel && (
          <>
            <div className="hidden md:flex items-center">
              <Separator orientation="vertical" className="h-[calc(100%-2rem)] mx-2" />
            </div>
            
            <div className="md:hidden flex justify-center my-2">
              <Separator className="w-[calc(100%-2rem)]" />
            </div>
          </>
        )}
        
        {(!maximizedPanel || maximizedPanel === 'preview') && (
          <div className={`flex-1 p-4 h-[50vh] md:h-auto ${maximizedPanel === 'preview' ? 'w-full' : ''}`}>
            <div className="h-full flex flex-col rounded-md border overflow-hidden animate-scale-in">
              <div className="bg-muted px-4 py-2 text-sm font-medium border-b flex justify-between items-center">
                <span>Preview</span>
                {maximizedPanel !== 'editor' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleMaximize('preview')}
                    title={maximizedPanel === 'preview' ? 'Minimize' : 'Maximize'}
                  >
                    {maximizedPanel === 'preview' ? (
                      <Minimize className="h-4 w-4" />
                    ) : (
                      <Maximize className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              <MarkdownPreview markdown={markdown} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>Your changes are automatically saved to local storage.</p>
      </footer>
    </div>
  );
};

export default Index;