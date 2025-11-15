// CreatePropertyForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import { EMPTY_HOUSE } from '../shared/constants';

export default function CreatePropertyForm({ onSave, onCancel }) {
  const [house, setHouse] = useState(EMPTY_HOUSE);

  const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Laravel expects numerical values for these fields
    const newHouse = {
      ...house,
      price: Number(house.price) || 0,
      beds: Number(house.beds) || 0,
      baths: Number(house.baths) || 0,
      sqft: Number(house.sqft) || 0,
    };
    onSave('houses', newHouse);
  };

  return (
    <Modal title="Create New Property" onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          <ImageUploadPreview 
            label="Property Photo"
            currentImage={house.imageUrl}
            onImageChange={(url) => setField('imageUrl', url)}
            placeholderText="Property"
            previewClass="w-full h-32"
          />
          {['title', 'price', 'beds', 'baths', 'sqft', 'location'].map(key => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium capitalize">{key}</span>
              <input
                type={['price', 'beds', 'baths', 'sqft'].includes(key) ? 'number' : 'text'}
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
          >
            <i className="fas fa-save mr-2"></i> Create Property
          </button>
        </div>
      </form>
    </Modal>
  );
}