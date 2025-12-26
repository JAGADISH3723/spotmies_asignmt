
import React from 'react';
import { Artwork } from '../types';

interface GalleryProps {
  artworks: Artwork[];
}

const Gallery: React.FC<GalleryProps> = ({ artworks }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold serif mb-4">The Collection</h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Exploring the boundaries of digital and traditional art through a diverse range of styles and perspectives.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {artworks.map((art) => (
          <div key={art.id} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative">
              <img 
                src={art.imageUrl} 
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold serif mb-0.5">{art.title}</h3>
              <p className="text-sm text-gray-500 font-light uppercase tracking-widest">{art.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-400">No artworks found in the collection.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
