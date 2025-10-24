import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Creative Suite AI</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/image-generation" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image Generation</h2>
          <p className="text-gray-600 dark:text-gray-400">Create stunning images with Imagen.</p>
        </Link>
        <Link to="/image-editing" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Image Editing</h2>
          <p className="text-gray-600 dark:text-gray-400">Edit your photos with Gemini Flash.</p>
        </Link>
        <Link to="/video-generation" className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Video Generation</h2>
          <p className="text-gray-600 dark:text-gray-400">Generate videos with Veo.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
