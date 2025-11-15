// CreateAgentForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import { EMPTY_AGENT } from '../shared/constants';

export default function CreateAgentForm({ onSave, onCancel }) {
  const [agent, setAgent] = useState(EMPTY_AGENT);

  // --- Handle Field Updates ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  // --- Handle Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (optional)
    if (!agent.name || !agent.phone || !agent.email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Pass data back to parent component
    onSave('agents', agent);
  };

  return (
    <Modal title="Create New Agent" onClose={onCancel}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <ImageUploadPreview 
          label="Agent Photo"
          currentImage={agent.image}
          onImageChange={(url) => setAgent((prev) => ({ ...prev, image: url }))}
          placeholderText="Agent"
          previewClass="w-20 h-20 rounded-full"
        />

        {/* Input Fields */}
        {[
          { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g., Sophia Williams' },
          { name: 'office', label: 'Office', type: 'text', placeholder: 'e.g., Head Office - Lagos' },
          { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Lagos, Nigeria' },
          { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g., +234 812 345 6789' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., agent@christesrealestate.com' },
          { name: 'license', label: 'License Number', type: 'text', placeholder: 'e.g., REA-987654' },
          { name: 'languages', label: 'Language', type: 'text', placeholder: 'e.g., English, Yoruba' },
        ].map(({ name, label, type, placeholder }) => (
          <label key={name} className="block">
            <span className="text-sm text-gray-700 font-medium">{label}</span>
            <input
              name={name}
              type={type}
              value={agent[name] || ''}
              onChange={handleChange}
              placeholder={placeholder}
              required={['name', 'email', 'phone'].includes(name)} // Mark important ones required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        ))}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            <i className="fas fa-user-plus mr-2"></i> Create Agent
          </button>
        </div>
      </form>
    </Modal>
  );
}
