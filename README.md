# AI Image Generator

## Description
This project is an AI-powered image generation web application built with React. It allows users to generate images based on text descriptions using various AI models from Hugging Face.

## Features
- Text-to-image generation
- Multiple AI model selection
- Real-time loading progress bar
- Image download functionality
- Responsive design for mobile and desktop

## Technologies Used
- React
- JavaScript (ES6+)
- CSS Modules
- Hugging Face API

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdallaNassar/image-generator.git
    ```
2. Navigate to the project directory:

   ```bash
   cd ai-image-generator
    ```    
3. Install dependencies:


   ```bash
   npm install
    ```

4. Put Hugging Face API in config.json:
   ```bash
   {
    "huggingface_token": your_api_key_here
   }
    ```


5. Start the development server:

   ```bash
   npm start
    ```

## How to Use
1. Enter a text description of the image you want to generate in the input field.
2. Select an AI model from the dropdown menu.
3. Click the "Generate" button to create the image.
4. Once the image is generated, you can download it by clicking the "Download" button.

## Components

### ImageGenerator
The main component that renders the user interface and manages the image generation process.

### useImageGenerator
A custom React hook that encapsulates the logic for image generation, including:
- API calls to Hugging Face
- State management for loading, progress, and generating images
- Image download functionality

## Styling
The application uses CSS Modules for styling and responsive design for desktop and mobile views.

## API Integration
The application integrates with the Hugging Face API to access various image generation models. The available models include:
- Dreamlike Diffusion
- Stable Diffusion XL
- Stable Diffusion V1.5
- Midjourney-style
- DFLUX.1 Schnell

## Future Improvements
- Add user authentication
- Implement image history and saving
- Optimize for faster loading times
- Add more customization options for image generation

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
