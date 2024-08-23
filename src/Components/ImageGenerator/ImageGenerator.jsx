import React, { useRef } from "react";
import styles from "./ImageGenerator.module.css";
import defult_image from "../../assets/image3.jpg";
import { useImageGenerator } from "../imageGeneratorLogic/imageGeneratorLogic";

function ImageGenerator() {
  const {
    image_url,
    isLoading,
    loadingProgress,
    generateImage,
    downloadImage,
    selectedModel,
    setSelectedModel,
    models,
  } = useImageGenerator();

  let inputRef = useRef(null);

  const handleGenerate = () => {
    generateImage(inputRef.current.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateImage(inputRef.current.value);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        AI Image <span>Generator</span>
      </h1>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={image_url === "/" ? defult_image : image_url}
          alt="image generated"
        />
      </div>
      {isLoading && (
        <div className={styles.loadingBar}>
          <div
            className={styles.loadingBarFill}
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      )}

      <div className={styles.serchBox}>
        <input
          type="text"
          ref={inputRef}
          className={styles.serchInput}
          placeholder="Describe What you want to see"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.modelSelect}>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className={styles.modelDropdown}
        >
          {Object.entries(models).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonGen}
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <button
          className={styles.buttonDawnload}
          onClick={downloadImage}
          disabled={image_url === "/"}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default ImageGenerator;