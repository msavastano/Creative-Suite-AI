import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ImageGeneration from './pages/ImageGeneration';
import ImageEditing from './pages/ImageEditing';
import VideoGeneration from './pages/VideoGeneration';
import VideoPlayer from './pages/VideoPlayer';
import PromptImprovement from './pages/PromptImprovement';
import ApiKeyManager from './components/ApiKeyManager';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <ApiKeyManager>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/image-generation" element={<ImageGeneration />} />
            <Route path="/image-editing" element={<ImageEditing />} />
            <Route path="/video-generation" element={<VideoGeneration />} />
            <Route path="/video-player" element={<VideoPlayer />} />
            <Route path="/prompt-improvement" element={<PromptImprovement />} />
          </Routes>
        </Layout>
      </Router>
    </ApiKeyManager>
  );
}

export default App;
