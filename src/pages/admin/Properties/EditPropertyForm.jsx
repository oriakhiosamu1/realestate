// EditPropertyForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';

export default function EditPropertyForm({ item, onSave, onCancel }) {
  // Use existing item as initial state (passed down from AdminApp)
  const [house, setHouse] = useState(item);

  const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure numerical fields are numbers before saving
    const updatedHouse = {
      ...house,
      price: Number(house.price) || 0,
      beds: Number(house.beds) || 0,
      baths: Number(house.baths) || 0,
      sqft: Number(house.sqft) || 0,
    };
    onSave('houses', updatedHouse);
  };

  return (
    <Modal title={`Edit Property: ${item.title}`} onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          <ImageUploadPreview 
            label="Property Photo"
            currentImage={house.imageUrl}
            onImageChange={(url) => setField('imageUrl', url)}
            placeholderText="Property"
            previewClass="w-full h-32"
          />
          {/* Key will be used as the field name */}
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
            <i className="fas fa-save mr-2"></i> Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}