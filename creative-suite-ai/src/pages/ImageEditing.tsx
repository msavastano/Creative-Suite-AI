import React, { useState, useRef } from 'react';

const ImageEditing: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (originalImage) {
      // Placeholder for image editing logic
      setEditedImage(`https://via.placeholder.com/512x512.png?text=Edited%20Image`);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold">Image Editing</h1>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Original</h2>
          {originalImage ? (
            <img src={originalImage} alt="Original" className="max-w-full max-h-full rounded-lg" />
          ) : (
            <div className="text-center">
                <p>Upload an image to start editing.</p>
                <button onClick={() => fileInputRef.current?.click()} className="mt-2 p-2 rounded-lg bg-primary text-white font-bold">
                    Upload Image
                </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Edited</h2>
          {editedImage && <img src={editedImage} alt="Edited" className="max-w-full max-h-full rounded-lg" />}
        </div>
      </main>
      <footer className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-4">
        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            placeholder="e.g., 'add a pair of sunglasses to the cat'"
        />
        <div className="flex gap-4">
            <button onClick={handleGenerate} className="flex-1 p-2 rounded-lg bg-primary text-white font-bold">Generate</button>
            <button onClick={() => {}} className="flex-1 p-2 rounded-lg bg-gray-500 text-white font-bold">Download</button>
            <button onClick={() => fileInputRef.current?.click()} className="flex-1 p-2 rounded-lg bg-gray-500 text-white font-bold">Upload Image</button>
            <button onClick={handleReset} className="flex-1 p-2 rounded-lg bg-red-500 text-white font-bold">Reset</button>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
        />
      </footer>
    </div>
  );
};

export default ImageEditing;
