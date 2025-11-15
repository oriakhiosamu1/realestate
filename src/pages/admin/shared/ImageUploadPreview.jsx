// ImageUploadPreview.jsx
import React from 'react';
import { DEFAULT_AGENT_IMAGE, DEFAULT_BLOG_IMAGE, DEFAULT_HOUSE_IMAGE } from './constants';

export default function ImageUploadPreview({ label, currentImage, onImageChange, placeholderText, previewClass }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size is too large (max 2MB)");
        onImageChange(null);
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => onImageChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const displayImage = currentImage && currentImage.startsWith('data:image') ? currentImage : 
    (currentImage || (placeholderText === 'Agent' ? DEFAULT_AGENT_IMAGE : placeholderText === 'Blog' ? DEFAULT_BLOG_IMAGE : DEFAULT_HOUSE_IMAGE));

  return (
    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center hover:border-blue-400 transition duration-200">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center">
        <img 
          src={displayImage} 
          alt="Preview" 
          className={`object-cover rounded-lg mb-2 sm:mb-3 shadow-md ${previewClass}`}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = placeholderText === 'Agent' ? DEFAULT_AGENT_IMAGE : 
                          placeholderText === 'Blog' ? DEFAULT_BLOG_IMAGE : DEFAULT_HOUSE_IMAGE;
          }}
        />
        <p className="text-xs sm:text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500 mt-1">Click to select image</p>
      </div>
    </div>
  );
}