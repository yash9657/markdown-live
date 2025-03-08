
import React, { useEffect, useState, useCallback } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { parseMarkdown } from '@/utils/markdownParser';
import Header from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, ThumbsUp, Import, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { publishedDocuments, fetchPublishedDocuments, loading, likeDocument } = useDocuments();
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('markdown-dark-mode', true);
  const [likedDocuments, setLikedDocuments] = useState<Set<string>>(new Set());
  const [localDocuments, setLocalDocuments] = useState<Array<any>>([]);
  const navigate = useNavigate();

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch documents whenever debounced search term changes
  useEffect(() => {
    fetchPublishedDocuments(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Update local documents when published documents change
  useEffect(() => {
    setLocalDocuments(publishedDocuments);
  }, [publishedDocuments]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchPublishedDocuments();
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleLike = async (documentId: string) => {
    const success = await likeDocument(documentId);
    if (success) {
      // Update liked documents state
      setLikedDocuments(prev => {
        const newSet = new Set(prev);
        if (newSet.has(documentId)) {
          newSet.delete(documentId);
        } else {
          newSet.add(documentId);
        }
        return newSet;
      });
      
      // Update the local documents array to reflect the like/unlike
      setLocalDocuments(currentDocs => 
        currentDocs.map(doc => {
          if (doc.id === documentId) {
            const isNowLiked = !likedDocuments.has(documentId);
            return {
              ...doc,
              likes_count: isNowLiked ? doc.likes_count + 1 : doc.likes_count - 1
            };
          }
          return doc;
        })
      );
    }
  };

  const handleImport = (content: string, title: string) => {
    try {
      // Directly set the content in localStorage (same way as "Load" functionality)
      localStorage.setItem('markdown-content', content);
      
      toast({
        title: "Document imported",
        description: `"${title}" has been imported to the editor`,
      });
      
      // Navigate to the editor page
      navigate('/editor');
    } catch (error) {
      console.error("Error importing document:", error);
      toast({
        title: "Import failed",
        description: "There was an error importing the document",
        variant: "destructive",
      });
    }
  };

  const handleCopyContent = (content: string, title: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({
          title: "Content copied",
          description: `"${title}" has been copied to clipboard`,
        });
      })
      .catch((error) => {
        console.error("Error copying content:", error);
        toast({
          title: "Copy failed",
          description: "There was an error copying the content",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Community Documents</h1>
            <p className="text-muted-foreground">
              Explore and discover markdown documents shared by the community
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title or keywords..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : localDocuments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No documents found</p>
              <p className="text-sm text-muted-foreground">Try a different search term or check back later</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {localDocuments.map((doc) => {
                // Display the first 300 characters of content for the preview
                const { html } = parseMarkdown(doc.content.slice(0, 300) + (doc.content.length > 300 ? '...' : ''));
                const isLiked = likedDocuments.has(doc.id);
                
                return (
                  <Card key={doc.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle>{doc.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {doc.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div 
                        className="prose dark:prose-invert max-w-none text-sm overflow-hidden"
                        style={{ maxHeight: '200px' }}
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="text-sm text-muted-foreground">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyContent(doc.content, doc.title)}
                          title="Copy markdown"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        {/* <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleImport(doc.content, doc.title)}
                          title="Import to editor"
                        >
                          <Import className="h-4 w-4 mr-1" />
                          Import
                        </Button> */}
                        <Button 
                          variant={isLiked ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleLike(doc.id)}
                          disabled={!user}
                          title={user ? "Like this document" : "Sign in to like documents"}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {doc.likes_count}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>Sign in to publish your own documents and like others.</p>
      </footer>
    </div>
  );
};

export default Community;