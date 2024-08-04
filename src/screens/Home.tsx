'use client'
import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/process_input', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.result);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>
        <input 
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <div className="mt-4 w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          {selectedImage ? (
            <img src={selectedImage} alt="Selected" className="rounded-lg max-w-full max-h-full" />
          ) : (
            <span className="text-gray-400">No image selected</span>
          )}
        </div>
        <button 
          onClick={handleSubmit} 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
