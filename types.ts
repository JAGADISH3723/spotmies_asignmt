
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  description: string;
  imageUrl: string;
  createdAt: number;
}

export interface Exhibition {
  id: string;
  title: string;
  themeDescription: string;
  artworkIds: string[];
  status: 'draft' | 'published';
  curatedAt: number;
}

export type View = 'home' | 'exhibitions' | 'upload' | 'dashboard';
