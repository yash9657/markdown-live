
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDocuments } from '@/hooks/useDocuments';
import Header from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Edit, PenLine, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { parseMarkdown } from '@/utils/markdownParser';
import { toast } from '@/components/ui/use-toast';

const Profile: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const { savedDocuments, fetchSavedDocuments, loading, deleteDocument } = useDocuments();
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('markdown-dark-mode', true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchSavedDocuments();
    } else {
      navigate('/auth');
    }
  }, [user]);

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

  const handleEdit = (content: string) => {
    localStorage.setItem('markdown-content', content);
    navigate('/editor');
  };

  const handleDelete = async (id: string) => {
    const success = await deleteDocument(id);
    if (success) {
      fetchSavedDocuments();
      toast({
        title: "Document deleted",
        description: "Your document has been deleted successfully",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <p className="text-muted-foreground">
                Manage your saved documents
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{profile?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Saved Documents</h2>
              <Button 
                variant="default" 
                onClick={() => navigate('/editor')}
                className="gap-2"
              >
                <PenLine className="h-4 w-4" />
                New Document
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : savedDocuments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You don't have any saved documents yet</p>
                  <Button 
                    variant="default" 
                    onClick={() => navigate('/editor')}
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Create New Document
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {savedDocuments.map((doc) => {
                  const { html } = parseMarkdown(doc.content.slice(0, 300) + (doc.content.length > 300 ? '...' : ''));
                  
                  return (
                    <Card key={doc.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle>{doc.title || 'Untitled Document'}</CardTitle>
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
                          Last updated: {new Date(doc.updated_at).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(doc.content)}
                            className="gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(doc.id)}
                            className="gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>All your documents are securely stored in your account</p>
      </footer>
    </div>
  );
};

export default Profile;