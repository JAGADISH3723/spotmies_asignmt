
import React, { useState } from 'react';
import { Artwork, Exhibition } from '../types';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';

interface CuratorDashboardProps {
  artworks: Artwork[];
  exhibitions: Exhibition[];
  onUpdate: () => void;
}

const CuratorDashboard: React.FC<CuratorDashboardProps> = ({ artworks, exhibitions, onUpdate }) => {
  const [isCurating, setIsCurating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCurate = async () => {
    if (artworks.length < 3) {
      setError("At least 3 artworks are required for AI curation.");
      return;
    }

    setIsCurating(true);
    setError(null);
    try {
      const suggestions = await geminiService.curateExhibitions(artworks);
      if (suggestions.length === 0) {
        throw new Error("AI returned empty suggestions.");
      }
      suggestions.forEach(s => storageService.addExhibition(s as Exhibition));
      onUpdate();
    } catch (err) {
      setError("Curation failed. Ensure your Gemini API Key is set.");
    } finally {
      setIsCurating(false);
    }
  };

  const publishExhibition = (ex: Exhibition) => {
    storageService.updateExhibition({ ...ex, status: 'published' });
    onUpdate();
  };

  const deleteExhibition = (id: string) => {
    const updated = exhibitions.filter(e => e.id !== id);
    storageService.saveExhibitions(updated);
    onUpdate();
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold serif">Curator Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage AI-suggested exhibitions and publish to public gallery.</p>
        </div>
        <button 
          onClick={handleCurate}
          disabled={isCurating}
          className="bg-black text-white px-8 py-3 font-medium tracking-wide uppercase hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:bg-gray-400"
        >
          {isCurating ? 'AI Curating...' : 'Generate New Themes'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-8 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-100 pb-2">Pending AI Suggestions</h2>
          <div className="grid gap-6">
            {exhibitions.filter(ex => ex.status === 'draft').map(ex => (
              <div key={ex.id} className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Draft Suggestion</span>
                  <h3 className="text-2xl font-bold serif mb-2">{ex.title}</h3>
                  <p className="text-gray-600 italic mb-4 leading-relaxed font-light">{ex.themeDescription}</p>
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {ex.artworkIds.map(aid => {
                      const art = artworks.find(a => a.id === aid);
                      return art ? (
                        <div key={aid} className="text-xs bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-500">
                          {art.title}
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => publishExhibition(ex)}
                      className="px-6 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition-colors"
                    >
                      Approve & Publish
                    </button>
                    <button 
                      onClick={() => deleteExhibition(ex.id)}
                      className="px-6 py-2 border border-gray-200 text-gray-500 text-sm font-semibold rounded hover:bg-gray-50 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-64 flex gap-2 overflow-x-auto">
                    {ex.artworkIds.slice(0, 3).map(aid => {
                        const art = artworks.find(a => a.id === aid);
                        return art ? <img key={aid} src={art.imageUrl} className="w-20 h-20 object-cover rounded shadow-sm" alt="" /> : null;
                    })}
                </div>
              </div>
            ))}
            {exhibitions.filter(ex => ex.status === 'draft').length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-400 text-sm italic">
                No pending suggestions. Click "Generate New Themes" to start AI analysis.
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-100 pb-2">Active Exhibitions</h2>
          <div className="grid gap-4">
            {exhibitions.filter(ex => ex.status === 'published').map(ex => (
              <div key={ex.id} className="flex justify-between items-center bg-white px-6 py-4 border border-gray-100 rounded-lg">
                <div>
                  <h4 className="font-bold serif text-lg">{ex.title}</h4>
                  <p className="text-sm text-gray-400">{ex.artworkIds.length} Artworks • Published {new Date(ex.curatedAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => deleteExhibition(ex.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
             {exhibitions.filter(ex => ex.status === 'published').length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                No active exhibitions.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CuratorDashboard;
