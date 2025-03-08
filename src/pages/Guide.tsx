
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MarkdownGuide from '../components/MarkdownGuide';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full py-4 px-6 border-b">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Markdown Syntax Guide</h1>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <MarkdownGuide />
          
          <div className="mt-8 text-center">
            <Button asChild className="gap-2">
              <Link to="/editor">
                Open Editor
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>Your changes are automatically saved to local storage.</p>
      </footer>
    </div>
  );
};

export default Guide;
