
import React, { useRef, useEffect } from 'react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange,
  className = ""
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className="w-full h-full p-4 bg-editor-background text-editor-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none font-mono text-sm editor-transition"
        placeholder="Type some markdown here..."
        aria-label="Markdown editor"
        spellCheck="false"
      />
    </div>
  );
};

export default MarkdownEditor;
