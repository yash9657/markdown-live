
export interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedDocument {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PublishedDocument {
  id: string;
  user_id: string;
  title: string;
  content: string;
  keywords: string[];
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface DocumentLike {
  id: string;
  user_id: string;
  document_id: string;
  created_at: string;
}
