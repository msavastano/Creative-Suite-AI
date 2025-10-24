import React, { useState } from 'react';
import { generateImageWithImagen } from '../services/ai';
import { AspectRatio } from '../types';

const ImageGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [recentCreations, setRecentCreations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      setError('API Key not found. Please set it in the API Key Manager.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const imageBytes = await generateImageWithImagen(prompt, aspectRatio, apiKey);
      const imageUrl = `data:image/png;base64,${imageBytes}`;
      setGeneratedImage(imageUrl);
      setRecentCreations([imageUrl, ...recentCreations]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold">Image Generation</h1>
      </header>
      <main className="flex-1 flex flex-col p-4 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="prompt" className="font-medium">Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            placeholder="e.g., 'a futuristic cityscape at sunset, synthwave style'"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="aspect-ratio" className="font-medium">Aspect Ratio</label>
          <select
            id="aspect-ratio"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="1:1">1:1</option>
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          className="w-full p-2 rounded-lg bg-primary text-white font-bold"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {loading && <div className="text-center">Loading...</div>}
        {generatedImage && (
          <div className="flex-1 flex items-center justify-center">
            <img src={generatedImage} alt="Generated" className="max-w-full max-h-full rounded-lg" />
          </div>
        )}
      </main>
      <footer className="p-4 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-2">Recent Creations</h2>
        <div className="flex overflow-x-auto gap-4">
          {recentCreations.map((image, index) => (
            <img key={index} src={image} alt={`Recent Creation ${index + 1}`} className="w-32 h-32 rounded-lg" />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ImageGeneration;
