
import React from 'react';
import { Artwork, Exhibition } from '../types';

interface ExhibitionViewProps {
  exhibitions: Exhibition[];
  artworks: Artwork[];
}

const ExhibitionView: React.FC<ExhibitionViewProps> = ({ exhibitions, artworks }) => {
  const publishedExhibitions = exhibitions.filter(ex => ex.status === 'published');

  return (
    <div className="animate-fade-in">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold serif mb-4">Curated Exhibitions</h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Thematic deep-dives powered by Gemini AI, grouping our collection into narrative journeys.
        </p>
      </div>

      <div className="space-y-32">
        {publishedExhibitions.map((ex) => (
          <div key={ex.id} className="group">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold serif mb-4 italic tracking-tight">{ex.title}</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto italic border-l-2 border-gray-200 pl-6 text-left">
                "{ex.themeDescription}"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ex.artworkIds.map((aid) => {
                const art = artworks.find(a => a.id === aid);
                if (!art) return null;
                return (
                  <div key={art.id} className="bg-white p-4 border border-gray-50 shadow-sm transition-transform duration-500 hover:-translate-y-2">
                    <div className="aspect-square mb-4 overflow-hidden">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-center serif">{art.title}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest text-center mt-1">{art.artist}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {publishedExhibitions.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-xl">
            <p className="text-gray-400 font-light italic">No public exhibitions have been curated yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionView;
