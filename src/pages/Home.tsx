import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit, Eye, Download, Moon, Sun, Code, List, Heart, Save, Share2, Import, Utensils } from 'lucide-react';
import Header from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
            {/* Product Hunt Badge */}
            <div className="flex justify-center mt-6">
              <a 
                href="https://www.producthunt.com/posts/markdown-preview-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-markdown-preview-2" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=939729&theme=light&t=1741462763647" 
                  alt="Markdown Preview - Type in Markdown, Watch It Come Alive | Product Hunt" 
                  style={{ width: '250px', height: '54px' }} 
                  width="250" 
                  height="54" 
                />
              </a>
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

        <section
          id="support"
          className="container mx-auto px-6 py-20 bg-[#12131e] rounded-2xl border border-gray-800 my-20 max-w-4xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Support the Developer</h2>
              <p className="text-gray-400 mb-6">
                This Markdown editor is completely free, but if you find it useful, consider buying me a Chipotle bowl to fuel
                future development.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <Utensils className="h-6 w-6 text-red-500" />
                <p className="text-gray-300">Each burrito bowl helps keep the code spicy!</p>
              </div>
              <a
                href="https://buymeacoffee.com/yash9657"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#8D0E00] hover:bg-[#A81000] text-white font-bold py-3 px-6 rounded-full transition-all"
              >
                <Utensils className="h-5 w-5" />
                <span>Buy Me Chipotle</span>
              </a>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-[#1a1b2e] p-6 rounded-xl border border-gray-800 max-w-xs w-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                    <img
                      src="https://i.ibb.co/709DNRv/IMG-7164-2.jpg"
                      alt="Developer"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Yash Bhalgat</h3>
                    <p className="text-sm text-gray-400">Developer</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  "I love to build new things and I'm just trying to be better at it :)"
                </p>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <span className="text-red-500 font-bold">$2</span>
                    <span className="text-xs text-gray-500">Drink</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-red-500 font-bold">$5</span>
                    <span className="text-xs text-gray-500">+ Chips</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-red-500 font-bold">$10</span>
                    <span className="text-xs text-gray-500">+ Bowl</span>
                  </div>
                </div>
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
