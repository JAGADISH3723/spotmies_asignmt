
import React, { useState } from 'react';
import { Artwork, View } from '../types';
import { storageService } from '../services/storageService';

interface ArtUploadProps {
  onSuccess: () => void;
  setView: (view: View) => void;
}

const ArtUpload: React.FC<ArtUploadProps> = ({ onSuccess, setView }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    description: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newArtwork: Artwork = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        artist: formData.artist,
        description: formData.description,
        imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Math.random()}/800/600`,
        createdAt: Date.now()
      };

      storageService.addArtwork(newArtwork);
      setIsSubmitting(false);
      onSuccess();
      setView('home');
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold serif mb-8 text-center">Submit Your Vision</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Artwork Title</label>
          <input 
            required
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Whispers of the Void"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Artist Name</label>
          <input 
            required
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            value={formData.artist}
            onChange={e => setFormData(prev => ({ ...prev, artist: e.target.value }))}
            placeholder="Your name or pseudonym"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the inspiration and meaning behind this piece..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Art</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200"
          />
          {formData.imageUrl && (
            <div className="mt-4 aspect-video overflow-hidden bg-gray-50 border border-gray-100">
              <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
            </div>
          )}
        </div>

        <button 
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-black text-white py-3 font-medium tracking-wide uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Processing...' : 'Submit to Gallery'}
        </button>
      </form>
    </div>
  );
};

export default ArtUpload;
