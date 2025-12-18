// CreateOfficeForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { EMPTY_OFFICE } from "../shared/constants";
import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

export default function CreateOfficeForm({ isLoading, onSave, onCancel }) {
  const [office, setOffice] = useState(EMPTY_OFFICE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffice({ ...office, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!office.name.trim()) return alert("Office name is required.");
    console.log('office submitted :', office);
    onSave("offices", office);
  };

  // Form fields configuration
  const fields = [
    { name: 'name', label: 'Office Name', type: 'text', placeholder: 'e.g., Main Office' },
    { name: 'location', label: 'Address', type: 'textarea', placeholder: 'e.g., 123 Main St, City, State' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'e.g., +1 (555) 123-4567' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'e.g., office@christies.com' },
    { name: 'languages', label: 'Languages', type: 'text', placeholder: 'e.g., English, Spanish' },
  ];

  return (
    <Modal title="Create New Office" onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          {fields.map(({ name, label, type, placeholder }) => (
            <label key={name} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              {type === 'textarea' ? (
                <textarea
                  name={name}
                  value={office[name] || ''}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={name === 'name'}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              ) : (
                <input
                  name={name}
                  type={type}
                  value={office[name] || ''}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={name === 'name'}
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
                />
              )}
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
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
          >
            {isLoading ? (<BeatLoader size={10} color="#ffffff" />) : (<><i className="fas fa-plus mr-2"></i>Create Office</>)}
          </button>
        </div>
      </form>
    </Modal>
  );
}
