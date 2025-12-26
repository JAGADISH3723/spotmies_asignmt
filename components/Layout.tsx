
import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <span className="text-2xl font-bold serif tracking-tight">ART<span className="text-gray-400">PULSE</span></span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setView('home')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${currentView === 'home' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => setView('exhibitions')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${currentView === 'exhibitions' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Exhibitions
              </button>
              <button 
                onClick={() => setView('upload')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${currentView === 'upload' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Submit Art
              </button>
              <button 
                onClick={() => setView('dashboard')}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${currentView === 'dashboard' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Curator Panel
              </button>
            </nav>
            <div className="md:hidden">
              {/* Simple Mobile Menu could go here */}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400 font-light">© 2024 ArtPulse Gallery. Curated by Gemini AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
