
import React, { useMemo } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

interface MarkdownPreviewProps {
  markdown: string;
  className?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ 
  markdown, 
  className = "" 
}) => {
  // Parse markdown to HTML
  const { html, error } = useMemo(() => {
    return parseMarkdown(markdown);
  }, [markdown]);

  return (
    <div className={`w-full h-full overflow-auto p-4 ${className}`}>
      {error && (
        <div className="p-4 mb-4 rounded-md bg-destructive/10 text-destructive animate-fade-in">
          <p className="font-medium">Error parsing markdown</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}
      <div 
        className="prose dark:prose-invert max-w-none preview-transition"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {!markdown && (
        <div className="text-muted-foreground italic animate-fade-in">
          Preview will appear here...
        </div>
      )}
    </div>
  );
};

export default MarkdownPreview;
