// PropertiesComponent.jsx
import React from 'react';
import { DEFAULT_HOUSE_IMAGE } from '../shared/constants';

export default function PropertiesComponent({ houses, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Properties ({houses.length})</h3>
        <button 
          onClick={onAdd}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          <i className="fas fa-plus mr-1 sm:mr-2"></i> Add Property
        </button>
      </div>
      
      {houses.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {houses.map(house => (
            <div key={house.id} className="bg-gray-50 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl shadow-md flex flex-col sm:flex-row transition hover:shadow-lg">
              <img 
                src={house.image_url || DEFAULT_HOUSE_IMAGE} 
                alt={house.title} 
                className="w-full h-32 sm:w-32 sm:h-32 object-cover rounded-lg mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0 border"
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HOUSE_IMAGE; }}
              />
              <div className="flex-grow min-w-0">
                <p className="font-bold text-base sm:text-lg text-gray-900 truncate">{house.title}</p>
                <p className="text-lg sm:text-xl font-extrabold text-blue-600 my-0.5">${house.price.toLocaleString()}</p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{house.location}</p>
                <div className="flex space-x-2 sm:space-x-3 text-xs text-gray-600 mt-2">
                  <span><i className="fas fa-bed"></i> {house.beds}</span>
                  <span><i className="fas fa-bath"></i> {house.baths}</span>
                  <span><i className="fas fa-ruler-combined"></i> {house.sqft} sqft</span>
                </div>
                <div className="flex space-x-2 sm:space-x-3 mt-3 border-t pt-3">
                  <button 
                    onClick={() => onEdit(house)}
                    className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(house.id)}
                    className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}