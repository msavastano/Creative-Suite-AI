import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio, ImageData } from '../types';

const getAiClient = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide a valid API key.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateImageWithImagen = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio,
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image && response.generatedImages[0].image.imageBytes) {
    return response.generatedImages[0].image.imageBytes;
  }
  throw new Error("Image generation failed or returned no images.");
};

export const editImageWithNano = async (prompt: string, originalImage: ImageData): Promise<string> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: originalImage.base64,
            mimeType: originalImage.mimeType,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }
  }
  throw new Error("Image editing failed or returned no image data.");
};

export const generateLastFrameWithNano = async (prompt: string, firstFrame: ImageData): Promise<string> => {
    const ai = getAiClient();
    const fullPrompt = `Based on the provided image and the description "${prompt}", generate a logical final frame for a short video. The generated image should represent the end of the story or action.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: firstFrame.base64,
              mimeType: firstFrame.mimeType,
            },
          },
          { text: fullPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                return part.inlineData.data;
            }
        }
    }
    throw new Error("Last frame generation failed.");
  };

export const improvePrompt = async (prompt: string, type: 'video' | 'image'): Promise<string> => {
  const ai = getAiClient();
  const fullPrompt = `Improve the following ${type} prompt: "${prompt}"`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: {
      parts: [
        { text: fullPrompt },
      ],
    },
  });

  if (response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        return part.text;
      }
    }
  }
  throw new Error("Prompt improvement failed.");
}

export const generateVideoWithVeo = async (
  prompt: string,
  firstFrame: ImageData,
  lastFrame: ImageData,
  aspectRatio: AspectRatio,
  onProgress: (status: string) => void
): Promise<string> => {
  // Re-create client to ensure it uses the latest key from the dialog
  const ai = getAiClient();

  onProgress("Initializing video generation...");
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: {
      imageBytes: firstFrame.base64,
      mimeType: firstFrame.mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio,
      lastFrame: {
        imageBytes: lastFrame.base64,
        mimeType: lastFrame.mimeType,
      },
    }
  });

  const progressMessages = [
    "Warming up the digital director...",
    "Setting up the scene...",
    "Action! Cameras are rolling...",
    "Processing dailies...",
    "In the editing room, adding final touches...",
    "Rendering the final cut..."
  ];
  let messageIndex = 0;

  while (!operation.done) {
    onProgress(progressMessages[messageIndex % progressMessages.length]);
    messageIndex++;
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  if (operation.error) {
      throw new Error(`Video generation failed: ${operation.error.message}`);
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error("Video generation completed but no download link was found.");
  }

  onProgress("Fetching your masterpiece...");
  const videoResponse = await fetch(`${downloadLink}&key=${process.env.REACT_APP_API_KEY}`);
  if (!videoResponse.ok) {
    throw new Error(`Failed to download video: ${videoResponse.statusText}`);
  }
  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};