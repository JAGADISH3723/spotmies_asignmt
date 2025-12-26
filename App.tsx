
import React, { useState, useEffect, useCallback } from 'react';
import { View, Artwork, Exhibition } from './types';
import { storageService } from './services/storageService';
import Layout from './components/Layout';
import Gallery from './components/Gallery';
import ArtUpload from './components/ArtUpload';
import CuratorDashboard from './components/CuratorDashboard';
import ExhibitionView from './components/ExhibitionView';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

  const refreshData = useCallback(() => {
    setArtworks(storageService.getArtworks());
    setExhibitions(storageService.getExhibitions());
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Gallery artworks={artworks} />;
      case 'upload':
        return <ArtUpload setView={setView} onSuccess={refreshData} />;
      case 'dashboard':
        return <CuratorDashboard artworks={artworks} exhibitions={exhibitions} onUpdate={refreshData} />;
      case 'exhibitions':
        return <ExhibitionView exhibitions={exhibitions} artworks={artworks} />;
      default:
        return <Gallery artworks={artworks} />;
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
      {renderView()}
    </Layout>
  );
};

export default App;
