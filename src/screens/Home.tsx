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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
        {diseaseResult && (
          <div className="mt-4 p-4 bg-green-100 rounded-lg shadow-md w-full text-center">
            <h3 className="text-xl font-semibold text-green-800">Detected Disease:</h3>
            <p className="text-green-700">{diseaseResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
