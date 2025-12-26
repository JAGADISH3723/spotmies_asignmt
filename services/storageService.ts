
import { Artwork, Exhibition } from '../types';

const ARTWORKS_KEY = 'artpulse_artworks';
const EXHIBITIONS_KEY = 'artpulse_exhibitions';

const DEFAULT_ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Neon Solitude',
    artist: 'Elena Vance',
    description: 'A digital painting exploring the isolation of modern urban life through vibrant cyberpunk hues.',
    imageUrl: 'https://picsum.photos/seed/art1/800/600',
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    title: 'Fractured Echo',
    artist: 'Marcus Thorne',
    description: 'Abstract geometry representing the way memories distort over time.',
    imageUrl: 'https://picsum.photos/seed/art2/800/600',
    createdAt: Date.now() - 2000000,
  },
  {
    id: '3',
    title: 'Golden Horizon',
    artist: 'Sophia Chen',
    description: 'A minimalist oil painting focusing on the calming gradients of a summer sunset.',
    imageUrl: 'https://picsum.photos/seed/art3/800/600',
    createdAt: Date.now() - 3000000,
  },
  {
    id: '4',
    title: 'The Silent Gear',
    artist: 'Julian Vane',
    description: 'Steampunk-inspired concept art detailing the internal mechanism of an ancient clock.',
    imageUrl: 'https://picsum.photos/seed/art4/800/600',
    createdAt: Date.now() - 4000000,
  }
];

export const storageService = {
  getArtworks: (): Artwork[] => {
    const data = localStorage.getItem(ARTWORKS_KEY);
    if (!data) {
      localStorage.setItem(ARTWORKS_KEY, JSON.stringify(DEFAULT_ARTWORKS));
      return DEFAULT_ARTWORKS;
    }
    return JSON.parse(data);
  },

  addArtwork: (artwork: Artwork) => {
    const artworks = storageService.getArtworks();
    const updated = [artwork, ...artworks];
    localStorage.setItem(ARTWORKS_KEY, JSON.stringify(updated));
  },

  getExhibitions: (): Exhibition[] => {
    const data = localStorage.getItem(EXHIBITIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveExhibitions: (exhibitions: Exhibition[]) => {
    localStorage.setItem(EXHIBITIONS_KEY, JSON.stringify(exhibitions));
  },

  addExhibition: (exhibition: Exhibition) => {
    const exhibitions = storageService.getExhibitions();
    const updated = [exhibition, ...exhibitions];
    localStorage.setItem(EXHIBITIONS_KEY, JSON.stringify(updated));
  },

  updateExhibition: (exhibition: Exhibition) => {
    const exhibitions = storageService.getExhibitions();
    const updated = exhibitions.map(e => e.id === exhibition.id ? exhibition : e);
    localStorage.setItem(EXHIBITIONS_KEY, JSON.stringify(updated));
  }
};
