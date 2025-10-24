import React, { useState, useEffect } from 'react';

const ApiKeyManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('apiKey'));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    } else {
      localStorage.removeItem('apiKey');
    }
  }, [apiKey]);

  const handleSaveKey = () => {
    if (inputValue) {
      setApiKey(inputValue);
    }
  };

  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Key Required</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please enter your API key to use the Creative Suite AI.
          </p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mb-4"
            placeholder="Enter your API key"
          />
          <button
            onClick={handleSaveKey}
            className="w-full p-2 rounded-lg bg-primary text-white font-bold"
          >
            Save Key
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApiKeyManager;
