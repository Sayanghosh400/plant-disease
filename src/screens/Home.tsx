'use client'
import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://leaf-disease-detection-backend.onrender.com/process_input', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setDiseaseResult(result.result);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-green-500 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Left side: Image input */}
        <div className="flex flex-col items-center w-1/2 pr-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-green-800">Upload an Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors"
          />
          <div className="mt-4 w-full h-64 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="rounded-lg max-w-full max-h-full shadow-md" />
            ) : (
              <span className="text-green-700">No image selected</span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>

        {/* Right side: Disease result and solution */}
        <div className="flex flex-col items-center w-1/2 pl-4">
          <h3 className="text-xl font-semibold text-green-800">The result will appear here</h3>
          {loading && (
            <div className="mt-10 p-4 bg-green-100 rounded-lg shadow-md w-full text-center">
              <p className="text-green-700">Analyzing your image. Please wait...</p>
            </div>
          )}

          {loading && (<div role="status" className="w-full mt-5 animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-green-500 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-green-300"></div>
            <span className="sr-only">Loading...</span>
          </div>)}


          {diseaseResult && !loading && (
            <div className="mt-10 p-4 bg-green-100 rounded-lg shadow-md w-full text-center">
              <h3 className="text-xl font-semibold text-green-800">Detected Disease:</h3>
              <p className="text-green-700 mb-4">{diseaseResult}</p>
              <h4 className="text-lg font-semibold text-green-800">Possible Solutions:</h4>
              <p className="text-green-700">
                Here are some potential solutions to address the detected disease:
                <ul className="list-disc list-inside mt-2">
                  <li>Ensure proper watering and avoid overwatering.</li>
                  <li>Remove and dispose of infected leaves.</li>
                  <li>Apply organic fungicide if necessary.</li>
                  <li>Maintain good air circulation around the plants.</li>
                </ul>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
