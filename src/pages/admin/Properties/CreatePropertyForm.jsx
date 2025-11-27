// // CreatePropertyForm.jsx
// import React, { useState } from 'react';
// import Modal from '../shared/Modal';
// import ImageUploadPreview from '../shared/ImageUploadPreview';
// import { EMPTY_HOUSE } from '../shared/constants';

// export default function CreatePropertyForm({ onSave, onCancel }) {
//   const [house, setHouse] = useState(EMPTY_HOUSE);

//   const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Laravel expects numerical values for these fields
//     const newHouse = {
//       ...house,
//       price: Number(house.price) || 0,
//       beds: Number(house.beds) || 0,
//       baths: Number(house.baths) || 0,
//       sqft: Number(house.sqft) || 0,
//     };
//     onSave('houses', newHouse);
//   };

//   return (
//     <Modal title="Create New Property" onClose={onCancel}>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
//           <ImageUploadPreview 
//             label="Property Photo"
//             currentImage={house.imageUrl}
//             onImageChange={(url) => setField('imageUrl', url)}
//             placeholderText="Property"
//             previewClass="w-full h-32"
//           />
//           {['title', 'price', 'beds', 'baths', 'sqft', 'location'].map(key => (
//             <label key={key} className="block">
//               <span className="text-xs sm:text-sm text-gray-700 font-medium capitalize">{key}</span>
//               <input
//                 type={['price', 'beds', 'baths', 'sqft'].includes(key) ? 'number' : 'text'}
//                 value={house[key]}
//                 onChange={(e) => setField(key, e.target.value)}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//               />
//             </label>
//           ))}
//         </div>
//         <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
//           <button 
//             type="button" 
//             onClick={onCancel} 
//             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold shadow-sm"
//           >
//             Cancel
//           </button>
//           <button 
//             type="submit" 
//             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
//           >
//             <i className="fas fa-save mr-2"></i> Create Property
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }



// CreatePropertyForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import { EMPTY_HOUSE } from '../shared/constants';
import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

export default function CreatePropertyForm({ isLoading, onSave, onCancel }) {
  const [house, setHouse] = useState(EMPTY_HOUSE);

  const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...house,
      // Keep feets & acres as strings
      feets: house.feets || null,
      acres: house.acres || null,
      // Convert bedrooms & bathrooms to numbers
      bedrooms: house.bedrooms ? Number(house.bedrooms) : null,
      bathrooms: house.bathrooms ? Number(house.bathrooms) : null,
      // latitude & longitude as floats
      latitude: house.latitude ? parseFloat(house.latitude) : null,
      longitude: house.longitude ? parseFloat(house.longitude) : null,
    };

    onSave('houses', payload);
  };



  return (
    <Modal title="Create New Property" onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">

          {/* Cover Image Preview (Not from backend) */}
          <ImageUploadPreview 
            label="Property Cover Image"
            currentImage={house.temp_cover_preview}
            onImageChange={(url) => setField('image', url)}
            placeholderText="Property Cover"
            previewClass="w-full h-32"
          />

          {/* FIELD #1: Manual URL input */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              Image URL
            </span>
            <input
              type="text"
              placeholder="https://example.com/property.jpg"
              value={house.image_url}
              onChange={(e) => setField('image_url', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* FIELD: Additional Gallery URLs */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Gallery Images URL</span>
            <input
              type="text"
              placeholder="Paste URL and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value) {
                    setField('images_url', [...(house.images_url || []), value]);
                    e.target.value = "";
                  }
                }
              }}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {house.images_url?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {house.images_url.map((url, idx) => (
                <div key={idx} className="relative border rounded-lg p-1 flex items-center gap-2 text-xs">
                  <img src={url} alt="" className="w-12 h-12 rounded-md object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      const list = [...house.images_url];
                      list.splice(idx, 1);
                      setField("images_url", list);
                    }}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PROPERTY NAME */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Name of Property</span>
            <input
              type="text"
              value={house.name}
              onChange={(e) => setField('name', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* PRICE (string allowed) */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Price</span>
            <input
              type="text"
              placeholder='e.g "$120,000" or "provided upon request"'
              value={house.price}
              onChange={(e) => setField('price', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* LOCATION (string allowed) */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Address</span>
            <input
              type="text"
              placeholder='e.g "England, UK" or "123 Main St, Springfield"'
              value={house.location}
              onChange={(e) => setField('location', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>


          {/* FEATURES */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Features</span>
            <textarea
              value={house.features}
              onChange={(e) => setField('features', e.target.value)}
              placeholder="Fully fenced • Pool • Modern bathroom"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* DESCRIPTION */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Description</span>
            <textarea
              value={house.description}
              onChange={(e) => setField('description', e.target.value)}
              placeholder="Detailed Description of Property"
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* DIMENSIONS */}
          {[
            { key: 'feets', label: 'Size (sq ft)', type: 'text' },
            { key: 'acres', label: 'Land Size (acres)', type: 'text' },
            { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
            { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
          ].map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type={type}
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
              />
            </label>
          ))}


          {/* LISTING META */}
          {[
            { key: 'listing_type', label: 'Listing Type' },
            { key: 'listing_reference', label: 'Listing Reference' },
            { key: 'provider', label: 'Provider' },
          ].map(({ key, label }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type="text"
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
              />
            </label>
          ))}

          {/* AGENT — TEXT INPUT ONLY */}
          {[
            { key: 'agent_image_url', label: 'Agent Image URL' },
            { key: 'agent_name', label: 'Agent Name' },
            { key: 'agent_phone', label: 'Agent Phone' },
            { key: 'agent_email', label: 'Agent Email' },
            { key: 'agent_license', label: 'Agent License' },
          ].map(({ key, label }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type="text"
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
              />
            </label>
          ))}

          {/* MAP LOCATION */}
          {[
            { key: 'latitude', label: 'Latitude' },
            { key: 'longitude', label: 'Longitude' },
          ].map(({ key, label }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type="number"
                step="0.000001"
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
              />
            </label>
          ))}

          {/* LOCATION */}
          {[
            { key: 'country', label: 'Country' },
            { key: 'state', label: 'State (optional)' },
            { key: 'city', label: 'City (optional)' },
          ].map(({ key, label }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type="text"
                placeholder={label}
                value={house[key]}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
              />
            </label>
          ))}

          {/* PROPERTY STATUS */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Property Status</span>
            <select
              value={house.status}
              onChange={(e) => setField('status', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            >
              <option value="">Select Type</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

          {/* PROPERTY TYPE */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Property Type</span>
            <select
              value={house.property_type}
              onChange={(e) => setField('property_type', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            >
              <option value="">Select Type</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              <option value="both">Both</option>
            </select>
          </label>
        </div>

        {/* ACTION BUTTONS */}
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
            {/* <i className="fas fa-save mr-2"></i> Create Property */}
            {isLoading ? (<BeatLoader size={10} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Create Property</>)}
          </button>
        </div>
      </form>
    </Modal>
  );
}
