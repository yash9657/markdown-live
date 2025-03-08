
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Header from '@/components/Header';
import { ArrowRight, Edit, Eye, Download, Moon, Sun, Code, List, Heart, Save, Share2, Import } from 'lucide-react';

const Home: React.FC = () => {
  // Use the same dark mode state from localStorage, but default to true (dark mode)
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('markdown-dark-mode', true);
  
  // Apply dark mode class to html element
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

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1">
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Write Markdown.</span>
              <span className="text-primary dark:text-blue-400">See it Live.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, fast, and intuitive Markdown editor with real-time preview, automatic saving,
              and responsive design for all your documentation needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="text-base px-8 py-6 h-auto">
                <Link to="/editor">
                  Start Writing <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 h-auto">
                <Link to="/guide">
                  View Markdown Guide
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Edit className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Real-time Preview</h3>
                <p className="text-muted-foreground">
                  See your formatted document instantly as you type with our split-screen view.
                </p>
              </div>
              
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Share2 className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Publish & Share</h3>
                <p className="text-muted-foreground">
                  Publish your documents to the community and discover content created by others.
                </p>
              </div>
              
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Save className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Auto-Saving</h3>
                <p className="text-muted-foreground">
                  Your content is automatically saved as you type, so you never lose your work.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Moon className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Dark & Light Modes</h3>
                <p className="text-muted-foreground">
                  Customize your writing environment with dark and light themes.
                </p>
              </div>
              
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Heart className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Community Likes</h3>
                <p className="text-muted-foreground">
                  Like documents from the community and see what's trending.
                </p>
              </div>
              
              <div className="bg-card dark:bg-gray-800 p-8 rounded-xl border shadow-sm dark:shadow-gray-800/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 dark:bg-blue-500/10 flex items-center justify-center mb-6">
                  <Import className="h-7 w-7 text-primary dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Import & Export</h3>
                <p className="text-muted-foreground">
                  Import published documents, download as markdown files, or copy to clipboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Ready to start writing?</h2>
            <p className="text-xl text-muted-foreground">
              Jump right into our editor and begin creating beautifully formatted content with Markdown.
            </p>
            <Button asChild size="lg" className="mt-4 text-base px-8 py-6 h-auto">
              <Link to="/editor">
                Open Editor <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-6 px-6 border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Markdown Live Preview Editor — A simple way to write and preview Markdown.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;