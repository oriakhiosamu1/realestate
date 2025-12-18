// OfficesComponent.jsx
import React from 'react';
import Errors from '../../../components/Errors';

export default function OfficesComponent({ errors, offices, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Offices ({offices.length})</h3>
        <button 
          onClick={onAdd}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          <i className="fas fa-building mr-1 sm:mr-2"></i> Add Office
        </button>
      </div>
      
      {Object.keys(errors || {}).length > 0 && <Errors errors={errors} />}

      {offices.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No offices found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {offices.map(office => (
            <div key={office.id} className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl shadow-md transition hover:shadow-lg">
              <div className="text-center mb-4">
                <i className="fas fa-building text-4xl text-blue-600 mb-2"></i>
                <p className="font-extrabold text-base sm:text-lg text-gray-900">{office.name}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-xs sm:text-sm text-gray-600">
                  <i className="fas fa-map-pin mr-2 text-gray-500"></i>
                  {office.location}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  <i className="fas fa-phone mr-2 text-gray-500"></i>
                  {office.phone}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  <i className="fas fa-language mr-2 text-gray-500"></i>
                  {office.languages || 'N/A'}
                </p>
              </div>
              
              <div className="flex justify-center space-x-3 mt-4 border-t pt-4">
                <button 
                  onClick={() => onEdit(office)}
                  className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
                >
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
                <button 
                  onClick={() => onDelete(office.id)}
                  className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
                >
                  <i className="fas fa-trash-alt mr-1"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
