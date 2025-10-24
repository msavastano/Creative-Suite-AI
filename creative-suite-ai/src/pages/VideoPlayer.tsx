import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateVideoWithVeo } from '../services/ai';
import { ImageData } from '../types';

const VideoPlayer: React.FC = () => {
  const location = useLocation();
  const { firstFrame, lastFrame, prompt } = location.state as { firstFrame: ImageData, lastFrame: ImageData, prompt: string };

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState('Initializing...');

  useEffect(() => {
    const generateVideo = async () => {
      const apiKey = localStorage.getItem('apiKey');
      if (!apiKey) {
        setError('API Key not found. Please set it in the API Key Manager.');
        setLoading(false);
        return;
      }
      try {
        const url = await generateVideoWithVeo(prompt, firstFrame, lastFrame, '16:9', setProgress, apiKey);
        setVideoUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (firstFrame && lastFrame && prompt) {
      generateVideo();
    }
  }, [firstFrame, lastFrame, prompt]);

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex size-12 shrink-0 items-center justify-start">
            <Link to="/video-generation"><span className="material-symbols-outlined text-gray-900 dark:text-white text-2xl">arrow_back</span></Link>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Video Preview</h2>
        <div className="flex w-12 items-center justify-end">
        <span className="material-symbols-outlined text-gray-900 dark:text-white text-2xl">share</span>
        </div>
      </header>
      <main className="flex flex-col flex-1 p-4 gap-6">
        <div className="w-full aspect-video rounded-lg bg-black">
            {loading && <div className="text-center p-4">{progress}</div>}
            {error && <p className="text-red-500">{error}</p>}
            {videoUrl && <video src={videoUrl} controls className="w-full h-full rounded-lg" />}
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-base font-normal text-gray-900 dark:text-white">{prompt}</p>
        </div>
        <div className="flex mt-auto pt-4">
            <a href={videoUrl || ''} download className={`flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] ${!videoUrl && 'opacity-50 cursor-not-allowed'}`}>
                <span className="truncate">Download Video</span>
            </a>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;
