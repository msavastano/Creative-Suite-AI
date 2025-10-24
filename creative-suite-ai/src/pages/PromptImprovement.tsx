import React, { useState } from 'react';
import { improvePrompt } from '../services/ai';

const PromptImprovement: React.FC = () => {
  const [promptType, setPromptType] = useState<'video' | 'image'>('video');
  const [userPrompt, setUserPrompt] = useState('');
  const [improvedPrompt, setImprovedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImprovePrompt = async () => {
    if (!userPrompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await improvePrompt(userPrompt, promptType);
      setImprovedPrompt(result);
    } catch (err) {
      setError('Failed to improve prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(improvedPrompt);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prompt Improvement</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="prompt-type" className="block mb-2 text-sm font-medium text-gray-900">
            Select Prompt Type
          </label>
          <select
            id="prompt-type"
            value={promptType}
            onChange={(e) => setPromptType(e.target.value as 'video' | 'image')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="video">Video Prompt</option>
            <option value="image">Image Prompt</option>
          </select>
        </div>
        <div>
          <label htmlFor="user-prompt" className="block mb-2 text-sm font-medium text-gray-900">
            Your Prompt
          </label>
          <textarea
            id="user-prompt"
            rows={4}
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your prompt here..."
          ></textarea>
        </div>
        <button
          onClick={handleImprovePrompt}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Improving...' : 'Improve Prompt'}
        </button>
        {improvedPrompt && (
          <div>
            <label htmlFor="improved-prompt" className="block mb-2 text-sm font-medium text-gray-900">
              Improved Prompt
            </label>
            <div className="relative">
              <textarea
                id="improved-prompt"
                rows={4}
                value={improvedPrompt}
                readOnly
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <button
                onClick={handleCopyPrompt}
                className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptImprovement;
