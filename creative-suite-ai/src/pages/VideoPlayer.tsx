import React from 'react';
import { Link } from 'react-router-dom';

const VideoPlayer: React.FC = () => {
  // Placeholder data
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
  const prompt = "A majestic drone shot of a futuristic city at sunset, with flying cars weaving between skyscrapers.";
  const duration = "15s";
  const resolution = "1080p";

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
            <video src={videoUrl} controls className="w-full h-full rounded-lg" />
        </div>
        <div className="flex flex-col gap-2">
            <p className="text-base font-normal text-gray-900 dark:text-white">{prompt}</p>
            <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Duration: {duration}</span>
                <span>Resolution: {resolution}</span>
            </div>
        </div>
        <div className="flex mt-auto pt-4">
            <a href={videoUrl} download className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Download Video</span>
            </a>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;
