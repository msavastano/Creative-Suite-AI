import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  generateImageWithImagen,
  generateLastFrameWithNano,
} from "../services/ai";
import { ImageData } from "../types";

const VideoGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [firstFrame, setFirstFrame] = useState<ImageData | null>(null);
  const [firstFrameUrl, setFirstFrameUrl] = useState<string | null>(null);
  const [lastFrame, setLastFrame] = useState<ImageData | null>(null);
  const [lastFrameUrl, setLastFrameUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    frameType: "first" | "last"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        const imageData = {
          base64: base64String,
          mimeType: file.type,
        };
        if (frameType === "first") {
          setFirstFrame(imageData);
          setFirstFrameUrl(URL.createObjectURL(file));
        } else {
          setLastFrame(imageData);
          setLastFrameUrl(URL.createObjectURL(file));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 font-display text-gray-800 dark:text-white">
      <header className="flex items-center bg-white dark:bg-gray-900 p-4 pb-2 justify-between sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <Link
            to="/"
            aria-label="Go back"
            className="inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-gray-900 dark:text-white"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </Link>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Create with Veo
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button
            type="button"
            onClick={() => {
              /* TODO: implement save action */
            }}
            className="text-gray-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em] shrink-0 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a3a]"
          >
            Save
          </button>
        </div>
      </header>
      <main className="flex flex-col flex-1 p-4 gap-6">
        <div className="flex flex-col gap-2">
          <label
            className="text-gray-900 dark:text-white text-base font-medium leading-normal"
            htmlFor="video-prompt"
          >
            Describe the video you want to create
          </label>
          <textarea
            id="video-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="form-textarea w-full resize-none overflow-hidden rounded-lg bg-gray-100 dark:bg-[#1c1c27] text-gray-900 dark:text-white border-gray-300 dark:border-[#3b3b54] focus:border-primary focus:ring-primary min-h-36 p-4 text-base font-normal leading-normal placeholder:text-gray-400 dark:placeholder:text-[#9d9db9]"
            placeholder="e.g., 'A majestic drone shot of a futuristic city at sunset, with flying cars weaving between skyscrapers.'"
          ></textarea>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Be descriptive for best results.
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {loading && <div className="text-center">Loading...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg bg-gray-200 dark:bg-[#282839] flex items-center justify-center"
              style={{ backgroundImage: `url(${firstFrameUrl})` }}
            >
              {!firstFrameUrl && (
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
                    image
                  </span>
                  <p className="text-white text-base font-medium leading-normal mt-2">
                    First Frame
                  </p>
                  <p className="text-gray-400 dark:text-[#9d9db9] text-sm font-normal leading-normal">
                    A preview of the first frame will appear here.
                  </p>
                </div>
              )}
            </div>
            <div className="flex">
              <input
                type="file"
                id="first-frame-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "first")}
              />
              <button
                onClick={() =>
                  document.getElementById("first-frame-upload")?.click()
                }
                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 dark:bg-[#282839] text-gray-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                Upload First Frame
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg bg-gray-200 dark:bg-[#282839] flex items-center justify-center"
              style={{ backgroundImage: `url(${lastFrameUrl})` }}
            >
              {!lastFrameUrl && (
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
                    image
                  </span>
                  <p className="text-white text-base font-medium leading-normal mt-2">
                    Last Frame
                  </p>
                  <p className="text-gray-400 dark:text-[#9d9db9] text-sm font-normal leading-normal">
                    A preview of the last frame will appear here.
                  </p>
                </div>
              )}
            </div>
            <div className="flex">
              <input
                type="file"
                id="last-frame-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "last")}
              />
              <button
                onClick={() =>
                  document.getElementById("last-frame-upload")?.click()
                }
                className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 dark:bg-[#282839] text-gray-900 dark:text-white text-base font-bold leading-normal tracking-[0.015em]"
              >
                Upload Last Frame
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-auto pt-4">
          <Link
            to="/video-player"
            state={{ firstFrame, lastFrame, prompt }}
            className={`flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-base font-bold leading-normal tracking-[0.015em] ${
              firstFrame && lastFrame
                ? "bg-primary text-white"
                : "bg-gray-300 dark:bg-[#282839] text-gray-500 dark:text-gray-400"
            }`}
          >
            <span className="truncate">Generate Video</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default VideoGeneration;
