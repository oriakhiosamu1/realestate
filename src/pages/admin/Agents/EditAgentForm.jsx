// EditAgentForm.jsx
import React, { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import axiosClient from '../../../axiosClient/axiosClient';

export default function EditAgentForm({ item, onSave, onCancel }) {
  const [agent, setAgent] = useState(item || {});

  // Fetch agent data when item.id changes
  useEffect(() => {
    if (!item?.id) return;

    axiosClient
      .get(`agents/${item.id}`)
      .then(({ data }) => {
        setAgent(data.data || {});
      })
      .catch(console.error);
  }, [item?.id]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (field, value) =>
    setAgent((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave('agents', agent);
  };

  // Form fields configuration
  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g., Sophia Williams' },
    { name: 'office', label: 'Office', type: 'text', placeholder: 'e.g., Head Office - Lagos' },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Lagos, Nigeria' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g., +234 812 345 6789' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., agent@christesrealestate.com' },
    { name: 'license', label: 'License Number', type: 'text', placeholder: 'e.g., REA-987654' },
    { name: 'languages', label: 'Language', type: 'text', placeholder: 'e.g., English, Yoruba' },
  ];

  return (
    <Modal title={`Edit Agent: ${item?.name || ''}`} onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          <ImageUploadPreview
            label="Agent Photo"
            currentImage={agent.image}
            onImageChange={(url) => setField('image', url)}
            placeholderText="Agent"
            previewClass="w-20 h-20 rounded-full"
          />

          {fields.map(({ name, label, type, placeholder }) => (
            <label key={name} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                name={name}
                type={type}
                value={agent[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                required={['name', 'email', 'phone'].includes(name)}
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
