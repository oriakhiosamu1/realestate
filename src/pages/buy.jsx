// import React, { useEffect, useState } from 'react';
// import { Search, Heart, Star, Map, Filter, X, ChevronLeft, Bath, Bed, Maximize, MapPin } from 'lucide-react';
// import axiosClient from '../axiosClient/axiosClient';

// // If you're using React Router, uncomment this:
// // import { useNavigate } from 'react-router-dom';

// const GOLD_COLOR = '#A38D66';
// const FILTER_BUTTON_CLASSES = 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition';

// const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Villa', 'Penthouse', 'Estate'];
// const PRICE_RANGES = [
//   { label: 'Any', min: 0, max: Infinity },
//   { label: '$1M - $5M', min: 1000000, max: 5000000 },
//   { label: '$5M - $10M', min: 5000000, max: 10000000 },
//   { label: '$10M - $50M', min: 10000000, max: 50000000 },
//   { label: '$50M+', min: 50000000, max: Infinity },
// ];
// const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+', '6+'];

// const MOCK_BUY_PROPERTIES = [
//   { 
//     id: 1, price: '126,000,000', beds: 22, baths: 30, sqft: '30,610', 
//     location: '16025 Gloaming, Beverly Hills, CA 90210', type: 'Estate',
//     imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
//     featured: true,
//     description: 'An unparalleled architectural masterpiece nestled in the hills of Beverly Hills, offering breathtaking panoramic views and world-class amenities.',
//     longDescription: 'This extraordinary estate represents the pinnacle of luxury living in Beverly Hills. Spanning over 30,000 square feet, the property features 22 elegantly appointed bedrooms and 30 bathrooms. The residence showcases exceptional craftsmanship with imported materials, soaring ceilings, and floor-to-ceiling windows that flood the interior with natural light.'
//   },
//   { 
//     id: 2, price: '61,420,899', beds: 7, baths: 8, sqft: '4,475', type: 'Condo',
//     location: 'Seaside Plaza, Fonteville, Monaco', 
//     imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
//     featured: false,
//     description: 'Elegant apartment in the heart of Monaco with stunning views of the Mediterranean.',
//     longDescription: 'Experience the epitome of Mediterranean luxury in this stunning Monaco residence. High-end finishes include marble flooring, custom cabinetry, and state-of-the-art appliances.'
//   },
//   { 
//     id: 3, price: '10,453,003', beds: 5, baths: 9, sqft: '20,311', type: 'Villa',
//     location: 'Luxury 5-Bedroom Seaview Villa In..', 
//     imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
//     featured: true,
//     description: 'Spacious villa offering direct access to the sea. Perfect for entertaining.',
//     longDescription: 'This magnificent villa offers the ultimate in coastal living with direct beach access. The expansive layout features multiple living areas, a gourmet kitchen, and seamless indoor-outdoor flow.'
//   },
//   { 
//     id: 4, price: 'Price available upon request', beds: 5, baths: 7, sqft: '4,698', type: 'Villa',
//     location: 'Playa Langosta, Playa Langosta...', 
//     imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
//     featured: false,
//     description: 'A secluded beach-front property in Costa Rica, offering ultimate privacy.',
//     longDescription: 'Escape to paradise in this exclusive beachfront villa. The property is designed for sustainable luxury with solar power, rainwater collection, and native landscaping.'
//   },
//   { 
//     id: 5, price: '45,800,000', beds: 8, baths: 10, sqft: '12,500', type: 'Estate',
//     location: 'Malibu Beach Estate, CA 90265', 
//     imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
//     featured: true,
//     description: 'Exquisite estate right on the sands of Malibu with unparalleled ocean views.',
//     longDescription: 'Wake up to the sound of waves in this extraordinary Malibu beach estate. The modern design features walls of glass, vaulted ceilings, and premium finishes throughout.'
//   },
//   { 
//     id: 6, price: '28,900,000', beds: 6, baths: 8, sqft: '8,900', type: 'Villa',
//     location: 'Modern Villa, Miami Beach, FL', 
//     imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
//     featured: false,
//     description: 'Cutting-edge modern design with smart-home systems and rooftop terrace.',
//     longDescription: 'This ultra-modern villa showcases contemporary design in prestigious Miami Beach. Smart home technology controls lighting, climate, security, and entertainment throughout.'
//   },
//   { 
//     id: 7, price: '89,500,000', beds: 12, baths: 15, sqft: '18,750', type: 'Estate',
//     location: 'Hampton Estate, New York', 
//     imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
//     featured: true,
//     description: 'A classic Hamptons masterpiece with expansive grounds and tennis court.',
//     longDescription: 'This magnificent Hamptons estate epitomizes East Coast elegance. The classic architecture features cedar shingle exterior with hardwood floors and custom millwork inside.'
//   },
//   { 
//     id: 8, price: '15,200,000', beds: 4, baths: 5, sqft: '6,200', type: 'Penthouse',
//     location: 'Penthouse Suite, Manhattan, NY', 
//     imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
//     featured: false,
//     description: 'Dazzling penthouse with 360-degree views of the NYC skyline.',
//     longDescription: 'Experience New York City from above in this spectacular penthouse. Floor-to-ceiling windows showcase iconic views including Central Park and the Empire State Building.'
//   },
// ];

// const FilterDropdown = ({ label, options, selected, onSelect, isOpen, onToggle }) => (
//     <div className="relative">
//         <button onClick={onToggle} className={`${FILTER_BUTTON_CLASSES} ${isOpen ? 'bg-gray-100' : ''}`}>
//             {label}
//         </button>
//         {isOpen && (
//             <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
//                 {options.map((option, idx) => (
//                     <button
//                         key={idx}
//                         onClick={() => { onSelect(option); onToggle(); }}
//                         className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
//                             selected === option ? 'bg-gray-50 font-semibold' : ''
//                         }`}
//                     >
//                         {typeof option === 'string' ? option : option.label}
//                     </button>
//                 ))}
//             </div>
//         )}
//     </div>
// );

// const PropertyCard = ({ property, onClick }) => (
//     <div 
//         className="relative text-left bg-white overflow-hidden flex flex-col group transition duration-300 cursor-pointer shadow-lg hover:shadow-xl rounded-lg"
//         onClick={() => onClick(property)}
//     >
//       <div className="relative">
//         <img 
//             src={property.imageUrl} 
//             alt={property.location} 
//             className="w-full h-48 object-cover rounded-t-lg transition duration-300 group-hover:scale-[1.03]" 
//         />
//         {property.featured && (
//           <div className="absolute bottom-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
//             <Star size={12} style={{ color: GOLD_COLOR }} className="mr-1" fill={GOLD_COLOR} /> Featured Listing
//           </div>
//         )}
//         <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
//           <button 
//                 className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-red-500 transition" 
//                 aria-label="Add to Favorites"
//                 onClick={(e) => e.stopPropagation()}
//             >
//             <Heart size={18} />
//           </button>
//         </div>
//       </div>
//       <div className="p-4 border-t border-gray-100 flex-grow">
//         <p className="text-xl font-light text-gray-900 mb-1 leading-snug">
//           {property.price.includes('Price') ? property.price : `$${Number(property.price.replace(/,/g, '')).toLocaleString()}`}
//         </p>
//         <p className="text-sm text-gray-600 mb-2">
//           {property.beds} Beds, {property.baths} Baths, {property.sqft} ft²
//         </p>
//         <p className="text-xs text-gray-600 truncate">{property.location}</p>
//       </div>
//     </div>
// );

// const Buy = () => {
//     // If using React Router, uncomment this:
//     // const navigate = useNavigate();
    
//     const [currentPage, setCurrentPage] = useState('listings');
//     const [selectedProperty, setSelectedProperty] = useState(null);
//     const [viewMode, setViewMode] = useState('list');
//     const [listingType, setListingType] = useState('buy');
//     const [selectedType, setSelectedType] = useState('Any');
//     const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
//     const [selectedBeds, setSelectedBeds] = useState('Any');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [openDropdown, setOpenDropdown] = useState(null);
    
//     const handleRentClick = () => {
//         // Option 1: If using React Router (recommended)
//         // navigate('/rent');
        
//         // Option 2: Simple page redirect
//         window.location.href = '/rent';
        
//         // Option 3: If rent.jsx is in the same folder and you want hash routing
//         // window.location.hash = '#/rent';
//     }; 
    
//     const filteredProperties = MOCK_BUY_PROPERTIES.filter(property => {
//         if (selectedType !== 'Any' && property.type !== selectedType) return false;
//         const price = parseFloat(property.price.replace(/,/g, ''));
//         if (!isNaN(price) && (price < selectedPrice.min || price > selectedPrice.max)) return false;
//         if (selectedBeds !== 'Any') {
//             const minBeds = parseInt(selectedBeds);
//             if (property.beds < minBeds) return false;
//         }
//         if (searchQuery && !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//         return true;
//     });
    
//     const openPropertyDetails = (property) => {
//         setSelectedProperty(property);
//         setCurrentPage('propertyDetail');
//         window.scrollTo(0, 0);
//     };

//     const closePropertyDetails = () => {
//         setSelectedProperty(null);
//         setCurrentPage('listings');
//         window.scrollTo(0, 0);
//     };
    
//     const toggleDropdown = (dropdownName) => {
//         setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
//     };

//     // Property Detail Page
//     if (currentPage === 'propertyDetail' && selectedProperty) {
//         const formattedPrice = selectedProperty.price.includes('Price') 
//             ? selectedProperty.price 
//             : `$${Number(selectedProperty.price.replace(/,/g, '')).toLocaleString()}`;
            
//         return (
//             <div className="min-h-screen bg-white">
//                 <div className="bg-white border-b sticky top-0 z-10">
//                     <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
//                         <button 
//                             onClick={closePropertyDetails}
//                             className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
//                         >
//                             <ChevronLeft size={20} className="mr-1" />
//                             Back to Listings
//                         </button>
//                     </div>
//                 </div>
                
//                 <div className="relative h-[60vh] bg-gray-900">
//                     <img 
//                         src={selectedProperty.imageUrl} 
//                         alt={selectedProperty.location}
//                         className="w-full h-full object-cover opacity-90"
//                     />
//                     <button 
//                         className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-red-500 transition"
//                         aria-label="Add to Favorites"
//                     >
//                         <Heart size={24} />
//                     </button>
//                 </div>
                
//                 <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
//                     <div className="grid md:grid-cols-3 gap-8">
//                         <div className="md:col-span-2">
//                             {selectedProperty.featured && (
//                                 <div className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
//                                     <Star size={16} style={{ color: GOLD_COLOR }} className="mr-2" fill={GOLD_COLOR} />
//                                     Featured Listing
//                                 </div>
//                             )}
                            
//                             <h1 className="text-5xl font-serif text-gray-900 mb-3">
//                                 {formattedPrice}
//                             </h1>
                            
//                             <p className="text-lg text-gray-600 mb-6 flex items-center">
//                                 <MapPin size={18} className="mr-2 text-gray-500" />
//                                 {selectedProperty.location}
//                             </p>
                            
//                             <div className="flex items-center space-x-8 mb-8 pb-8 border-b">
//                                 <div className="flex items-center">
//                                     <Bed size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedProperty.beds}</p>
//                                         <p className="text-sm text-gray-500">Bedrooms</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Bath size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedProperty.baths}</p>
//                                         <p className="text-sm text-gray-500">Bathrooms</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Maximize size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedProperty.sqft}</p>
//                                         <p className="text-sm text-gray-500">Square Feet</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-serif text-gray-900 mb-4">Property Overview</h2>
//                                 <p className="text-gray-700 leading-relaxed mb-4">
//                                     {selectedProperty.description}
//                                 </p>
//                                 <p className="text-gray-700 leading-relaxed">
//                                     {selectedProperty.longDescription}
//                                 </p>
//                             </div>
                            
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-serif text-gray-900 mb-4">Property Features</h2>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Property Type</p>
//                                             <p className="text-gray-600">{selectedProperty.type}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Year Built</p>
//                                             <p className="text-gray-600">2020</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Parking</p>
//                                             <p className="text-gray-600">4-Car Garage</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Lot Size</p>
//                                             <p className="text-gray-600">1.5 Acres</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         <div className="md:col-span-1">
//                             <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
//                                 <div className="space-y-4 mb-6">
//                                     <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400" />
//                                     <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400" />
//                                     <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400" />
//                                     <textarea placeholder="Message" rows="4" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400" defaultValue="I'm interested in this property and would like more information."></textarea>
//                                 </div>
//                                 <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition mb-3">
//                                     Request Information
//                                 </button>
//                                 <button className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition">
//                                     Schedule Tour
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Listings Page
//     return (
//         <div className="min-h-screen bg-white">
//             <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4">
//                 <div className="text-sm text-gray-500 mb-2">
//                     <span className="cursor-pointer hover:text-gray-700">Home</span> {' > '}
//                     <span className="font-semibold text-gray-700">Homes For Sale</span>
//                 </div>
//                 <h1 className="text-5xl font-serif text-gray-900 mb-6">Luxury Homes For Sale</h1>
                
//                 <div className="flex mb-6 max-w-3xl">
//                     <input
//                         type="text"
//                         placeholder="Search by Location (Country, State, or City)"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#A38D66] text-base"
//                     />
//                     <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r text-gray-600 hover:bg-gray-50 transition" aria-label="Search">
//                         <Search size={20} />
//                     </button>
//                 </div>
                
//                 <div className="flex flex-wrap items-center gap-2 mb-4">
//                     <button 
//                         onClick={() => setListingType('buy')}
//                         className={listingType === 'buy' ? 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-900 bg-gray-200 transition' : FILTER_BUTTON_CLASSES}
//                     >
//                         Buy
//                     </button>
//                     <button 
//                         onClick={handleRentClick}
//                         className={FILTER_BUTTON_CLASSES}
//                     >
//                         Rent
//                     </button>
                    
//                     <FilterDropdown 
//                         label={selectedType === 'Any' ? 'Type' : selectedType}
//                         options={['Any', ...PROPERTY_TYPES]}
//                         selected={selectedType}
//                         onSelect={setSelectedType}
//                         isOpen={openDropdown === 'type'}
//                         onToggle={() => toggleDropdown('type')}
//                     />
                    
//                     <FilterDropdown 
//                         label={selectedPrice.label}
//                         options={PRICE_RANGES}
//                         selected={selectedPrice}
//                         onSelect={setSelectedPrice}
//                         isOpen={openDropdown === 'price'}
//                         onToggle={() => toggleDropdown('price')}
//                     />
                    
//                     <FilterDropdown 
//                         label={selectedBeds === 'Any' ? 'Beds' : selectedBeds}
//                         options={BED_OPTIONS}
//                         selected={selectedBeds}
//                         onSelect={setSelectedBeds}
//                         isOpen={openDropdown === 'beds'}
//                         onToggle={() => toggleDropdown('beds')}
//                     />
                    
//                     <button className={FILTER_BUTTON_CLASSES}>
//                         <Filter size={16} className="inline mr-1" /> Filters
//                     </button>
//                     <button className={FILTER_BUTTON_CLASSES}>
//                         <Star size={16} style={{ color: GOLD_COLOR }} className="inline mr-1" fill={GOLD_COLOR} /> Save Search
//                     </button>
//                 </div>
                
//                 <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-6">
//                     {selectedPrice.label !== 'Any' && (
//                         <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
//                             {selectedPrice.label}
//                             <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => setSelectedPrice(PRICE_RANGES[0])} />
//                         </div>
//                     )}
//                     {selectedType !== 'Any' && (
//                         <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
//                             {selectedType}
//                             <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => setSelectedType('Any')} />
//                         </div>
//                     )}
//                     {selectedBeds !== 'Any' && (
//                         <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
//                             {selectedBeds} Beds
//                             <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => setSelectedBeds('Any')} />
//                         </div>
//                     )}
//                     <span className="text-gray-500">{filteredProperties.length} Listings</span>
//                 </div>
                
//                 <div className="flex justify-end items-center mb-6">
//                     <span className="text-sm text-gray-600 mr-4 hidden sm:inline">Sort: Featured</span>
//                     <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                         <button 
//                             onClick={() => setViewMode('list')} 
//                             className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
//                         >
//                             List
//                         </button>
//                         <button 
//                             onClick={() => setViewMode('map')} 
//                             className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
//                         >
//                             <Map size={16} className="inline mr-1" /> Map
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
//                 <div className="md:w-1/2 lg:w-2/5 pr-0 md:pr-6 space-y-6">
//                     {filteredProperties.length > 0 ? (
//                         filteredProperties.map((property) => (
//                             <PropertyCard key={property.id} property={property} onClick={openPropertyDetails} />
//                         ))
//                     ) : (
//                         <div className="text-center py-12">
//                             <p className="text-gray-500 text-lg">No properties match your filters.</p>
//                             <button 
//                                 onClick={() => {
//                                     setSelectedType('Any');
//                                     setSelectedPrice(PRICE_RANGES[0]);
//                                     setSelectedBeds('Any');
//                                     setSearchQuery('');
//                                 }}
//                                 className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
//                             >
//                                 Clear All Filters
//                             </button>
//                         </div>
//                     )}
                    
//                     {filteredProperties.length > 0 && (
//                         <div className="flex justify-center items-center space-x-2 pt-4 text-sm text-gray-700">
//                             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs px-3">&lt;</button>
//                             <button className="p-2 px-3 border border-gray-900 bg-gray-900 text-white rounded-lg text-xs font-semibold">1</button>
//                             <button className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">2</button>
//                             <button className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">3</button>
//                             <span className="text-gray-500 text-xs">...</span>
//                             <button className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">10</button>
//                             <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs px-3">&gt;</button>
//                         </div>
//                     )}
//                 </div>

//                 <div className={`md:w-1/2 lg:w-3/5 md:block mt-8 md:mt-0 ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
//                     <div className="h-[70vh] md:h-[calc(100vh-280px)] bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-xl sticky top-28 relative">
//                         <iframe 
//                             title="Interactive Property Map"
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105749.65997274095!2d-118.52837332766324!3d34.090623277028115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0473a21557%3A0x6a0c5c4f3462f43c!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
//                             width="100%" 
//                             height="100%" 
//                             style={{ border: 0 }} 
//                             allowFullScreen="" 
//                             loading="lazy" 
//                             referrerPolicy="no-referrer-when-downgrade">
//                         </iframe>
//                         <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg text-xs font-semibold text-gray-800">
//                              Map
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Buy;
































import React, { useEffect, useState } from 'react';
import { Search, Heart, Star, Map, Filter, X, ChevronLeft, Bath, Bed, Maximize, MapPin } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';

const GOLD_COLOR = '#A38D66';
const FILTER_BUTTON_CLASSES = 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition';

const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Villa', 'Penthouse', 'Estate'];
const PRICE_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '$1M - $5M', min: 1000000, max: 5000000 },
  { label: '$5M - $10M', min: 5000000, max: 10000000 },
  { label: '$10M - $50M', min: 10000000, max: 50000000 },
  { label: '$50M+', min: 50000000, max: Infinity },
];
const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+', '6+'];

const FilterDropdown = ({ label, options, selected, onSelect, isOpen, onToggle }) => (
  <div className="relative">
    <button onClick={onToggle} className={`${FILTER_BUTTON_CLASSES} ${isOpen ? 'bg-gray-100' : ''}`}>
      {label}
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => { onSelect(option); onToggle(); }}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
              selected === option ? 'bg-gray-50 font-semibold' : ''
            }`}
          >
            {typeof option === 'string' ? option : option.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

const PropertyCard = ({ property, onClick }) => (
  <div 
    className="relative text-left bg-white overflow-hidden flex flex-col group transition duration-300 cursor-pointer shadow-lg hover:shadow-xl rounded-lg"
    onClick={() => onClick(property)}
  >
    <div className="relative">
      <img 
        src={property.image_url} 
        alt={property.location} 
        className="w-full h-48 object-cover rounded-t-lg transition duration-300 group-hover:scale-[1.03]" 
      />
      {property.featured && (
        <div className="absolute bottom-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
          <Star size={12} style={{ color: GOLD_COLOR }} className="mr-1" fill={GOLD_COLOR} /> Featured Listing
        </div>
      )}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
        <button 
          className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-red-500 transition" 
          aria-label="Add to Favorites"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
    <div className="p-4 border-t border-gray-100 flex-grow">
        <p className="text-sm text-gray-600 mb-2">
            {property.name}
        </p>
      <p className="text-xl font-light text-gray-900 mb-1 leading-snug">
        {property.price.includes('Price') ? property.price : `$${Number(property.price.replace(/,/g, '')).toLocaleString()}`}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        {property.bedrooms} Beds, {property.bathrooms} Baths, {property.feets} ft²
      </p>
      <p className="text-xs text-gray-600 truncate">{property.location}</p>
    </div>
  </div>
);

const Buy = () => {
  const [currentPage, setCurrentPage] = useState('listings');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [listingType, setListingType] = useState('buy');
  const [selectedType, setSelectedType] = useState('Any');
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
  const [selectedBeds, setSelectedBeds] = useState('Any');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRentClick = () => {
    window.location.href = '/rent';
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get('/houses');
        let propertiesArray = Array.isArray(response.data) ? response.data : response.data.data || [];
        const filteredBuy = propertiesArray.filter(p => p.property_type === 'buy' || p.property_type === 'both');
        setProperties(filteredBuy);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property => {
    if (selectedType !== 'Any' && property.type !== selectedType) return false;
    const price = parseFloat(property.price.replace(/,/g, ''));
    if (!isNaN(price) && (price < selectedPrice.min || price > selectedPrice.max)) return false;
    if (selectedBeds !== 'Any') {
      const minBeds = parseInt(selectedBeds);
      if (property.beds < minBeds) return false;
    }
    if (searchQuery && !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
    setCurrentPage('propertyDetail');
    window.scrollTo(0, 0);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
    setCurrentPage('listings');
    window.scrollTo(0, 0);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Property Detail Page (can keep the previous JSX for details)
  if (currentPage === 'propertyDetail' && selectedProperty) {
    return <div>Property Detail Page Here</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4">
        <div className="text-sm text-gray-500 mb-2">
          <span className="cursor-pointer hover:text-gray-700">Home</span> {' > '}
          <span className="font-semibold text-gray-700">Homes For Sale</span>
        </div>
        <h1 className="text-5xl font-serif text-gray-900 mb-6">Luxury Homes For Sale</h1>

        {/* Search Bar */}
        <div className="flex mb-6 max-w-3xl">
          <input
            type="text"
            placeholder="Search by Location (Country, State, or City)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#A38D66] text-base"
          />
          <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r text-gray-600 hover:bg-gray-50 transition" aria-label="Search">
            <Search size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button 
            onClick={() => setListingType('buy')}
            className={listingType === 'buy' ? 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-900 bg-gray-200 transition' : FILTER_BUTTON_CLASSES}
          >
            Buy
          </button>
          <button onClick={handleRentClick} className={FILTER_BUTTON_CLASSES}>Rent</button>

          <FilterDropdown 
            label={selectedType === 'Any' ? 'Type' : selectedType}
            options={['Any', ...PROPERTY_TYPES]}
            selected={selectedType}
            onSelect={setSelectedType}
            isOpen={openDropdown === 'type'}
            onToggle={() => toggleDropdown('type')}
          />

          <FilterDropdown 
            label={selectedPrice.label}
            options={PRICE_RANGES}
            selected={selectedPrice}
            onSelect={setSelectedPrice}
            isOpen={openDropdown === 'price'}
            onToggle={() => toggleDropdown('price')}
          />

          <FilterDropdown 
            label={selectedBeds === 'Any' ? 'Beds' : selectedBeds}
            options={BED_OPTIONS}
            selected={selectedBeds}
            onSelect={setSelectedBeds}
            isOpen={openDropdown === 'beds'}
            onToggle={() => toggleDropdown('beds')}
          />

          <button className={FILTER_BUTTON_CLASSES}><Filter size={16} className="inline mr-1" /> Filters</button>
          <button className={FILTER_BUTTON_CLASSES}><Star size={16} style={{ color: GOLD_COLOR }} className="inline mr-1" fill={GOLD_COLOR} /> Save Search</button>
        </div>

        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-amber-700 focus:border-amber-700 bg-white">
                    <option>Featured</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                    <option>Newest</option>
                </select>
            </div>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button 
                    onClick={() => setViewMode('list')} 
                    className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                    List
                </button>
                <button 
                    onClick={() => setViewMode('map')} 
                    className={`px-4 py-2 text-sm font-medium transition ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                    <Map size={16} className="inline mr-1" /> Map
                </button>
            </div>
        </div>
      </div>

      {/* Listings and Map */}
      <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
        <div className="md:w-1/2 lg:w-2/5 pr-0 md:pr-6 space-y-6">
          {loading ? (
            <p className="text-center py-12 text-gray-500">Loading properties...</p>
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onClick={openPropertyDetails} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties match your filters.</p>
              <button 
                onClick={() => {
                  setSelectedType('Any');
                  setSelectedPrice(PRICE_RANGES[0]);
                  setSelectedBeds('Any');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        <div className={`md:w-1/2 lg:w-3/5 md:block mt-8 md:mt-0 ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
          <div className="h-[70vh] md:h-[calc(100vh-280px)] bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-xl sticky top-28 relative">
            <iframe 
              title="Interactive Property Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105749.65997274095!2d-118.52837332766324!3d34.090623277028115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc0473a21557%3A0x6a0c5c4f3462f43c!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg text-xs font-semibold text-gray-800">
                 Map
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;



