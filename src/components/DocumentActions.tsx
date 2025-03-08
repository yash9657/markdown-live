
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDocuments } from '@/hooks/useDocuments';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SavedDocument } from '@/types/database.types';
import { File, Save, Share2, Loader2, PlusCircle, Trash2, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DocumentActionsProps {
  markdown: string;
  setMarkdown: (markdown: string) => void;
}

const DocumentActions: React.FC<DocumentActionsProps> = ({ markdown, setMarkdown }) => {
  const { user, signOut } = useAuth();
  const { saveDocument, fetchSavedDocuments, savedDocuments, loading, publishDocument } = useDocuments();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    await saveDocument(markdown, title);
    setShowSaveDialog(false);
    setTitle('');
  };

  const handlePublish = async () => {
    const keywordsArray = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '');
      
    await publishDocument(markdown, title, keywordsArray);
    setShowPublishDialog(false);
    setTitle('');
    setKeywords('');
  };

  const handleLoadDocuments = async () => {
    await fetchSavedDocuments();
    setShowLoadDialog(true);
  };

  const loadDocument = (doc: SavedDocument) => {
    setMarkdown(doc.content);
    setShowLoadDialog(false);
    toast({
      title: 'Document loaded',
      description: `${doc.title || 'Untitled document'} has been loaded successfully`,
    });
  };

  const handleAuth = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Button variant="outline" size="sm" onClick={() => setShowSaveDialog(true)} disabled={loading}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>

          <Button variant="outline" size="sm" onClick={() => setShowPublishDialog(true)} disabled={loading}>
            <Share2 className="h-4 w-4 mr-1" /> Publish
          </Button>

          <Button variant="outline" size="sm" onClick={handleLoadDocuments} disabled={loading}>
            <File className="h-4 w-4 mr-1" /> Load
          </Button>

          <Button variant="ghost" size="sm" onClick={handleAuth}>
            <LogOut className="h-4 w-4 mr-1" /> Sign Out
          </Button>
        </>
      ) : (
        <Button variant="default" size="sm" onClick={handleAuth}>
          <LogIn className="h-4 w-4 mr-1" /> Sign In
        </Button>
      )}

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Document</DialogTitle>
            <DialogDescription>
              Give your document a title (optional)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Document"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSaveDialog(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Document</DialogTitle>
            <DialogDescription>
              Make your document available in the community feed
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="publish-title">Title</Label>
              <Input
                id="publish-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="markdown, guide, tutorial (comma separated)"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPublishDialog(false)} variant="outline">
              Cancel
            </Button>
            <Button 
              onClick={handlePublish} 
              disabled={loading || !title.trim() || !keywords.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Documents Dialog */}
      <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Your Saved Documents</DialogTitle>
            <DialogDescription>
              Select a document to load into the editor
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : savedDocuments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>You don't have any saved documents yet.</p>
              </div>
            ) : (
              <div className="grid gap-2 py-4">
                {savedDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-3 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => loadDocument(doc)}
                  >
                    <div className="flex items-center">
                      <File className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{doc.title || 'Untitled Document'}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(doc.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowLoadDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentActions;
