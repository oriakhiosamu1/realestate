// // // EditPropertyForm.jsx
// // import React, { useState } from 'react';
// // import Modal from '../shared/Modal';
// // import ImageUploadPreview from '../shared/ImageUploadPreview';

// // export default function EditPropertyForm({ item, onSave, onCancel }) {
// //   // Use existing item as initial state (passed down from AdminApp)
// //   const [house, setHouse] = useState(item);

// //   const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Ensure numerical fields are numbers before saving
// //     const updatedHouse = {
// //       ...house,
// //       price: Number(house.price) || 0,
// //       beds: Number(house.beds) || 0,
// //       baths: Number(house.baths) || 0,
// //       sqft: Number(house.sqft) || 0,
// //     };
// //     onSave('houses', updatedHouse);
// //   };

// //   return (
// //     <Modal title={`Edit Property: ${item.title}`} onClose={onCancel}>
// //       <form onSubmit={handleSubmit}>
// //         <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
// //           <ImageUploadPreview 
// //             label="Property Photo"
// //             currentImage={house.imageUrl}
// //             onImageChange={(url) => setField('imageUrl', url)}
// //             placeholderText="Property"
// //             previewClass="w-full h-32"
// //           />
// //           {/* Key will be used as the field name */}
// //           {['title', 'price', 'beds', 'baths', 'sqft', 'location'].map(key => (
// //             <label key={key} className="block">
// //               <span className="text-xs sm:text-sm text-gray-700 font-medium capitalize">{key}</span>
// //               <input
// //                 type={['price', 'beds', 'baths', 'sqft'].includes(key) ? 'number' : 'text'}
// //                 value={house[key]}
// //                 onChange={(e) => setField(key, e.target.value)}
// //                 required
// //                 className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </label>
// //           ))}
// //         </div>
// //         <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
// //           <button 
// //             type="button" 
// //             onClick={onCancel} 
// //             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold shadow-sm"
// //           >
// //             Cancel
// //           </button>
// //           <button 
// //             type="submit" 
// //             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
// //           >
// //             <i className="fas fa-save mr-2"></i> Save Changes
// //           </button>
// //         </div>
// //       </form>
// //     </Modal>
// //   );
// // }







// // EditPropertyForm.jsx
// import React, { useState } from 'react';
// import Modal from '../shared/Modal';
// import ImageUploadPreview from '../shared/ImageUploadPreview';

// export default function EditPropertyForm({ item, onSave, onCancel }) {
//   const [house, setHouse] = useState(item);

//   const setField = (field, value) => setHouse(prev => ({ ...prev, [field]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       ...house,
//       id: house.id,

//       // numeric fields
//       bedrooms: house.bedrooms ? Number(house.bedrooms) : null,
//       bathrooms: house.bathrooms ? Number(house.bathrooms) : null,
//       latitude: house.latitude ? parseFloat(house.latitude) : null,
//       longitude: house.longitude ? parseFloat(house.longitude) : null,
//       // feets & acres remain strings
//       feets: house.feets || null,
//       acres: house.acres || null,
//     };

//     console.log("SUBMIT PAYLOAD:", payload); // debug
//     onSave('houses', payload);
//   };

//   return (
//     <Modal title={`Edit Property: ${house.name}`} onClose={onCancel}>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          
//           {/* Cover Image Preview */}
//           <ImageUploadPreview 
//             label="Property Cover Image"
//             currentImage={house.temp_cover_preview}
//             onImageChange={(url) => setField('temp_cover_preview', url)}
//             placeholderText="Property"
//             previewClass="w-full h-32"
//           />

//           {/* Image URL from backend */}
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">
//               Image URL (from backend or CDN)
//             </span>
//             <input
//               type="text"
//               placeholder="https://example.com/property.jpg"
//               value={house.image_url || ''}
//               onChange={(e) => setField('image_url', e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
//             />
//           </label>

//           {/* Images gallery (JSON array) */}
//           {/* FIELD: Additional Gallery URLs */}
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Gallery Images URL</span>
//             <input
//               type="text"
//               placeholder="Paste URL and press Enter"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   const value = e.target.value.trim();
//                   if (value) {
//                     setField("images_url", [...(house.images_url || []), value]);
//                     e.target.value = "";
//                   }
//                 }
//               }}
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
//             />
//           </label>

//           {house.images_url?.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-2">
//               {house.images_url.map((url, idx) => (
//                 <div
//                   key={idx}
//                   className="relative border rounded-lg p-1 flex items-center gap-2 text-xs"
//                 >
//                   <img
//                     src={url}
//                     alt=""
//                     className="w-12 h-12 rounded-md object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const updated = house.images_url.filter((_, i) => i !== idx);
//                       setField("images_url", updated);
//                     }}
//                     className="text-red-500 font-bold"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">
//               Gallery Images (JSON Array)
//             </span>
//             <textarea
//               placeholder='["https://img1.jpg","https://img2.jpg"]'
//               value={house.images_url ? JSON.stringify(house.images_url) : ''}
//               onChange={(e) => {
//                 try {
//                   const arr = JSON.parse(e.target.value);
//                   setField('images_url', Array.isArray(arr) ? arr : []);
//                 } catch {
//                   setField('images_url', []);
//                 }
//               }}
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 h-24"
//             />
//           </label> */}

//           {/* Main fields */}
//           {[
//             { key: 'name', label: 'Name of Property', type: 'text' },
//             { key: 'location', label: 'Property Address', type: 'text' },
//             { key: 'description', label: 'Description', type: 'text' },
//             { key: 'status', label: 'Status', type: 'text' },
//             { key: 'price', label: 'Price', type: 'text' },
//             { key: 'features', label: 'Features', type: 'text' },
//             { key: 'feets', label: 'Size (sq ft)', type: 'text' },
//             { key: 'acres', label: 'Land Size (acres)', type: 'text' },
//             { key: 'listing_type', label: 'Listing Type', type: 'text' },
//             { key: 'listing_reference', label: 'Listing Reference', type: 'text' },
//             { key: 'provider', label: 'Provider', type: 'text' },
//             { key: 'agent_image_url', label: 'Agent Image URL', type: 'text' },
//             { key: 'agent_name', label: 'Agent Name', type: 'text' },
//             { key: 'agent_phone', label: 'Agent Phone', type: 'text' },
//             { key: 'agent_email', label: 'Agent Email', type: 'text' },
//             { key: 'agent_license', label: 'Agent License', type: 'text' },
//             { key: 'latitude', label: 'Latitude', type: 'number' },
//             { key: 'longitude', label: 'Longitude', type: 'number' },
//             { key: 'country', label: 'Country', type: 'text' },
//             { key: 'state', label: 'State', type: 'text' },
//             { key: 'city', label: 'City', type: 'text', placeholder: 'Optional' },
//           ].map(({ key, label, type, placeholder }) => (
//             <label key={key} className="block">
//               <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
//               <input
//                 type={type}
//                 value={house[key] || ''}
//                 onChange={(e) => setField(key, e.target.value)}
//                 placeholder={placeholder || ''}
//                 className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//               />
//             </label>
//           ))}

//           {/* Property Type Dropdown */}
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Property Type</span>
//             <select
//               value={house.property_type || ''}
//               onChange={(e) => setField('property_type', e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select</option>
//               <option value="Rent">Rent</option>
//               <option value="Buy">Buy</option>
//               <option value="Both">Both</option>
//             </select>
//           </label>

//           {/* Bedrooms & Bathrooms */}
//           {[
//             { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
//             { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
//           ].map(({ key, label, type }) => (
//             <label key={key} className="block">
//               <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
//               <input
//                 type={type}
//                 value={house[key] || ''}
//                 onChange={(e) => setField(key, e.target.value)}
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
//             <i className="fas fa-save mr-2"></i> Save Changes
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }





import React, { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

export default function EditPropertyForm({ isLoading, item, onSave, onCancel }) {
  const [house, setHouse] = useState(item);

  // Convert backend string JSON gallery into array
  useEffect(() => {
    if (typeof item.images_url === "string") {
      try {
        const parsed = JSON.parse(item.images_url);
        setHouse(prev => ({ ...prev, images_url: parsed }));
      } catch {
        setHouse(prev => ({ ...prev, images_url: [] }));
      }
    }
  }, [item]);

  const setField = (field, value) =>
    setHouse(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...house,
      id: house.id,
      bedrooms: house.bedrooms ? Number(house.bedrooms) : null,
      bathrooms: house.bathrooms ? Number(house.bathrooms) : null,
      latitude: house.latitude ? parseFloat(house.latitude) : null,
      longitude: house.longitude ? parseFloat(house.longitude) : null,
      feets: house.feets || null,
      acres: house.acres || null,
    };

    console.log("SUBMIT PAYLOAD:", payload);
    onSave("houses", payload);
  };

  return (
    <Modal title={`Edit Property: ${house.name}`} onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">

          {/* ======= COVER IMAGE ======= */}
          <ImageUploadPreview 
            label="Property Cover Image"
            currentImage={house.temp_cover_preview}
            onImageChange={(url) => setField('temp_cover_preview', url)}
            placeholderText="Property"
            previewClass="w-full h-32"
          />

          {/* ======= MAIN IMAGE URL ======= */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              Image URL (Backend / CDN)
            </span>
            <input
              type="text"
              placeholder="https://example.com/property.jpg"
              value={house.image_url || ""}
              onChange={(e) => setField("image_url", e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* ======= UPDATED GALLERY INPUT SECTION ======= */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              Gallery Images URL
            </span>
            <input
              type="text"
              placeholder="Paste URL & press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value) {
                    setField("images_url", [...(house.images_url || []), value]);
                    e.target.value = "";
                  }
                }
              }}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3"
            />
          </label>

          {/* Thumbnails */}
          {house.images_url?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {house.images_url.map((url, idx) => (
                <div
                  key={idx}
                  className="relative border rounded-lg p-1 flex items-center gap-2 text-xs"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = house.images_url.filter((_, i) => i !== idx);
                      setField("images_url", updated);
                    }}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* ======= END GALLERY SECTION ======= */}

          {/* ======= MAIN FIELDS ======= */}
          {[
            { key: 'name', label: 'Name of Property', type: 'text' },
            { key: 'location', label: 'Property Address', type: 'text' },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'status', label: 'Status', type: 'text' },
            { key: 'price', label: 'Price', type: 'text' },
            { key: 'features', label: 'Features', type: 'text' },
            { key: 'feets', label: 'Size (sq ft)', type: 'text' },
            { key: 'acres', label: 'Land Size (acres)', type: 'text' },
            { key: 'listing_type', label: 'Listing Type', type: 'text' },
            { key: 'listing_reference', label: 'Listing Reference', type: 'text' },
            { key: 'provider', label: 'Provider', type: 'text' },
            { key: 'agent_image_url', label: 'Agent Image URL', type: 'text' },
            { key: 'agent_name', label: 'Agent Name', type: 'text' },
            { key: 'agent_phone', label: 'Agent Phone', type: 'text' },
            { key: 'agent_email', label: 'Agent Email', type: 'text' },
            { key: 'agent_license', label: 'Agent License', type: 'text' },
            { key: 'latitude', label: 'Latitude', type: 'number' },
            { key: 'longitude', label: 'Longitude', type: 'number' },
            { key: 'country', label: 'Country', type: 'text' },
            { key: 'state', label: 'State', type: 'text' },
            { key: 'city', label: 'City', type: 'text' },
          ].map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type={type}
                value={house[key] || ''}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          ))}

          {/* Property Type Dropdown */}
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Property Type</span>
            <select
              value={house.property_type || ''}
              onChange={(e) => setField('property_type', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="Rent">Rent</option>
              <option value="Buy">Buy</option>
              <option value="Both">Both</option>
            </select>
          </label>

          {/* Bedrooms & Bathrooms */}
          {[
            { key: 'bedrooms', label: 'Bedrooms', type: 'number' },
            { key: 'bathrooms', label: 'Bathrooms', type: 'number' },
          ].map(({ key, label, type }) => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium">{label}</span>
              <input
                type={type}
                value={house[key] || ''}
                onChange={(e) => setField(key, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          ))}
        </div>

        {/* ======= FOOTER BUTTONS ======= */}
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
            {/* <i className="fas fa-save mr-2"></i> Save Changes */}
            {isLoading ? (<ClipLoader size={20} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Save Changes</>)}
          </button>
        </div>
      </form>
    </Modal>
  );
}
