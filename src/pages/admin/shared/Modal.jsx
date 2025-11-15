// Modal.jsx
import React from 'react';

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3 sm:p-4 z-[9999]">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all p-4 sm:p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
        {children}
      </div>
    </div>
  );
}