import { useState } from "react";
import config from '../../../config.json';

export function useImageGenerator() {
  const huggingfaceToken = config.huggingface_token;
  const [image_url, setImageUrl] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    "dreamlike-art/dreamlike-diffusion-1.0"
  );

  const models = {
    "dreamlike-art/dreamlike-diffusion-1.0": "Dreamlike Diffusion",
    "stabilityai/stable-diffusion-xl-base-1.0": "Stable Diffusion XL",
    "runwayml/stable-diffusion-v1-5": "Stable Diffusion V1.5",
    "black-forest-labs/FLUX.1-schnell": "FLUX.1 Schnell",
  };

  async function query(data) {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${selectedModel}`,
      {
        headers: {
          Authorization: `Bearer ${huggingfaceToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  const generateImage = async (inputValue) => {
    if (inputValue === "") {
      alert("Please Enter a value");
      return;
    }
    setCurrentInput(inputValue);
    setIsLoading(true);
    setLoadingProgress(0);
    try {
      const progressInterval = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(progressInterval);
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 500);

      const result = await query({ inputs: inputValue });
      clearInterval(progressInterval);
      setLoadingProgress(100);

      const imageUrl = URL.createObjectURL(result);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    } finally {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  const downloadImage = () => {
    if (image_url === "/") {
      alert("No image to download");
      return;
    }
    const link = document.createElement("a");
    link.href = image_url;

    const fileName = currentInput.trim().replace(/\s+/g, "_").toLowerCase();
    link.download = `${fileName}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    image_url,
    isLoading,
    loadingProgress,
    generateImage,
    downloadImage,
    currentInput,
    selectedModel,
    setSelectedModel,
    models,
  };
}
