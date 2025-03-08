
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { SavedDocument, PublishedDocument } from '@/types/database.types';
import { useToast } from '@/components/ui/use-toast';

export const useDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedDocuments, setSavedDocuments] = useState<SavedDocument[]>([]);
  const [publishedDocuments, setPublishedDocuments] = useState<PublishedDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedDocuments = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSavedDocuments(data as SavedDocument[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching documents',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async (content: string, title?: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to save documents',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_documents')
        .insert({
          user_id: user.id,
          title: title || null,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Document saved',
        description: 'Your document has been saved successfully',
      });
      
      return data as SavedDocument;
    } catch (error: any) {
      toast({
        title: 'Error saving document',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (id: string, content: string, title?: string) => {
    if (!user) return null;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_documents')
        .update({
          title: title || null,
          content,
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Document updated',
        description: 'Your document has been updated successfully',
      });
      
      return data as SavedDocument;
    } catch (error: any) {
      toast({
        title: 'Error updating document',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!user) return false;
    
    try {
      setLoading(true);
      const { error } = await supabase
        .from('saved_documents')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: 'Document deleted',
        description: 'Your document has been deleted successfully',
      });
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error deleting document',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const publishDocument = async (content: string, title: string, keywords: string[]) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to publish documents',
        variant: 'destructive',
      });
      return null;
    }

    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please provide a title for your document',
        variant: 'destructive',
      });
      return null;
    }

    if (!keywords.length) {
      toast({
        title: 'Keywords required',
        description: 'Please provide at least one keyword',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('published_documents')
        .insert({
          user_id: user.id,
          title,
          content,
          keywords,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: 'Document published',
        description: 'Your document has been published successfully',
      });
      
      return data as PublishedDocument;
    } catch (error: any) {
      toast({
        title: 'Error publishing document',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedDocuments = async (searchTerm?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('published_documents')
        .select('*')
        .order('likes_count', { ascending: false });
      
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,keywords.cs.{${searchTerm}}`);
      }
      
      const { data, error } = await query;

      if (error) throw error;
      setPublishedDocuments(data as PublishedDocument[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching published documents',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const likeDocument = async (documentId: string) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to like documents',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setLoading(true);
      
      // Check if already liked
      const { data: existingLike, error: checkError } = await supabase
        .from('document_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('document_id', documentId)
        .maybeSingle();
      
      if (checkError) throw checkError;
      
      if (existingLike) {
        // Unlike
        const { error: unlikeError } = await supabase
          .from('document_likes')
          .delete()
          .eq('id', existingLike.id);
        
        if (unlikeError) throw unlikeError;
        
        toast({
          title: 'Like removed',
          description: 'You have removed your like from this document',
        });
      } else {
        // Like
        const { error: likeError } = await supabase
          .from('document_likes')
          .insert({
            user_id: user.id,
            document_id: documentId,
          });
        
        if (likeError) throw likeError;
        
        toast({
          title: 'Document liked',
          description: 'You have liked this document',
        });
      }
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error toggling like',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkIfLiked = async (documentId: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('document_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('document_id', documentId)
        .maybeSingle();
      
      if (error) throw error;
      
      return !!data;
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  };

  return {
    savedDocuments,
    publishedDocuments,
    loading,
    fetchSavedDocuments,
    saveDocument,
    updateDocument,
    deleteDocument,
    publishDocument,
    fetchPublishedDocuments,
    likeDocument,
    checkIfLiked,
  };
};
