
import { marked } from 'marked';

interface ParseOptions {
  sanitize?: boolean;
}

interface ParseResult {
  html: string;
  error: Error | null;
}

/**
 * Parses markdown text to HTML
 * @param markdown The markdown text to parse
 * @param options Parsing options
 * @returns The parsed HTML and any error that occurred
 */
export const parseMarkdown = (markdown: string, options: ParseOptions = {}): ParseResult => {
  try {
    // Configure marked options
    marked.setOptions({
      gfm: true, // GitHub flavored markdown
      breaks: true, // Convert line breaks to <br>
      // Removed the 'mangle' option as it's not part of MarkedOptions type
      ...options,
    });

    // Parse the markdown
    const html = marked.parse(markdown) as string;
    return { html, error: null };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return { 
      html: '<div class="text-destructive">Error parsing markdown</div>', 
      error: error instanceof Error ? error : new Error('Unknown error parsing markdown') 
    };
  }
};
