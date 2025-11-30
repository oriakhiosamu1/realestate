// import React, { useState } from 'react';
// import { Search, Heart, Star, Map, Filter, X, ChevronLeft, Bath, Bed, Maximize, MapPin } from 'lucide-react';

// const GOLD_COLOR = '#A38D66';
// const FILTER_BUTTON_CLASSES = 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition';

// const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Villa', 'Penthouse', 'Estate'];
// const PRICE_RANGES = [
//   { label: 'Any', min: 0, max: Infinity },
//   { label: '$50K - $100K', min: 50000, max: 100000 },
//   { label: '$100K - $200K', min: 100000, max: 200000 },
//   { label: '$200K - $300K', min: 200000, max: 300000 },
//   { label: '$300K+', min: 300000, max: Infinity },
// ];
// const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+', '6+'];

// const mockListings = [
//   { 
//     id: 1, 
//     price: '400,000',
//     priceDisplay: '$400,000 /Monthly',
//     beds: 8, 
//     baths: 10, 
//     sqft: '9,780', 
//     address: '970 Powder Lopes, Aspen, CO 81611',
//     type: 'Estate',
//     isFeatured: true, 
//     imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
//     description: 'A magnificent Aspen retreat offering unparalleled luxury and slope-side access.',
//     longDescription: 'This extraordinary mountain estate offers the ultimate ski-in/ski-out experience in Aspen. Featuring 8 bedrooms and 10 bathrooms across nearly 10,000 square feet, the property includes a private spa, home theater, wine cellar, and stunning mountain views. The great room features soaring ceilings and floor-to-ceiling windows. Perfect for entertaining with multiple living areas and a gourmet kitchen.'
//   },
//   { 
//     id: 2, 
//     price: '230,000',
//     priceDisplay: '$230,000 /Monthly',
//     beds: 9, 
//     baths: 13, 
//     sqft: '14,037', 
//     address: '10250 Chalon Rd, Los Angeles, CA...',
//     type: 'Estate',
//     isFeatured: true, 
//     imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
//     description: 'The ultimate modern compound in Bel Air. Boasting vast entertaining spaces.',
//     longDescription: 'An architectural masterpiece in prestigious Bel Air. This modern compound spans over 14,000 square feet with 9 bedrooms and 13 bathrooms. Features include an infinity pool, home gym, private theater, and extensive outdoor entertaining areas. Privacy hedges ensure complete seclusion while being minutes from Beverly Hills and the Sunset Strip.'
//   },
//   { 
//     id: 3, 
//     price: '220,000',
//     priceDisplay: '$220,000 /Monthly',
//     beds: 9, 
//     baths: 13, 
//     sqft: '14,037', 
//     address: '1890 Winding Way, Las Vegas, NV...',
//     type: 'Villa',
//     isFeatured: true, 
//     imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
//     description: 'An architectural marvel overlooking the Las Vegas strip.',
//     longDescription: 'Perched high above the Las Vegas Strip, this contemporary villa offers unparalleled views of the city lights. The 14,000+ square foot property features 9 bedrooms, a professional gaming room, outdoor kitchen with pizza oven, resort-style pool, and a temperature-controlled wine room. Floor-to-ceiling windows showcase the spectacular night views.'
//   },
//   { 
//     id: 4, 
//     price: '200,000',
//     priceDisplay: '$200,000 /Monthly',
//     beds: 5, 
//     baths: 9, 
//     sqft: '5,376', 
//     address: '900 Waters Avenue, Aspen, CO 81611',
//     type: 'Villa',
//     isFeatured: true, 
//     imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
//     description: 'Prime waterside property in a secure community.',
//     longDescription: 'This stunning waterside villa offers exclusive boat access and pristine landscaped gardens. The 5-bedroom, 9-bathroom residence features open-concept living spaces, a gourmet kitchen, and expansive terraces overlooking the water. Located in a secure gated community with 24/7 security and concierge services.'
//   },
//   { 
//     id: 5, 
//     price: '200,000',
//     priceDisplay: '$200,000 /Monthly',
//     beds: 6, 
//     baths: 8, 
//     sqft: '9,376', 
//     address: '88 Robin Way, Aspen, CO 81611',
//     type: 'House',
//     isFeatured: true, 
//     imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
//     description: 'Charming modern farmhouse design with open-plan living.',
//     longDescription: 'A beautifully designed modern farmhouse offering the perfect blend of rustic charm and contemporary luxury. This 6-bedroom home features high ceilings, custom millwork, and premium finishes throughout. The open-plan design is ideal for families, with multiple gathering spaces and a chef\'s kitchen with top-of-the-line appliances.'
//   },
//   { 
//     id: 6, 
//     price: '180,000',
//     priceDisplay: '$180,000 /Monthly',
//     beds: 7, 
//     baths: 9, 
//     sqft: '8,500', 
//     address: 'Beverly Hills Estate, CA 90210',
//     type: 'Estate',
//     isFeatured: false, 
//     imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
//     description: 'Classic Beverly Hills elegance with a Mediterranean flair.',
//     longDescription: 'Experience timeless elegance in this Mediterranean-style estate. Features include large marble entryways, a staff wing, formal living and dining rooms, and a resort-style pool with cabana. The property sits on meticulously manicured grounds in the heart of Beverly Hills, moments from Rodeo Drive.'
//   },
//   { 
//     id: 7, 
//     price: '175,000',
//     priceDisplay: '$175,000 /Monthly',
//     beds: 5, 
//     baths: 7, 
//     sqft: '7,200', 
//     address: 'Malibu Beach House, CA 90265',
//     type: 'House',
//     isFeatured: false, 
//     imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
//     description: 'Direct beachfront access in exclusive Malibu.',
//     longDescription: 'Wake up to the sound of waves in this stunning Malibu beach house. Direct sand access, massive deck for entertaining, and floor-to-ceiling windows throughout. The open-concept design maximizes ocean views from every room. Enjoy spectacular Pacific sunsets from your private beachfront paradise.'
//   },
//   { 
//     id: 8, 
//     price: '150,000',
//     priceDisplay: '$150,000 /Monthly',
//     beds: 4, 
//     baths: 6, 
//     sqft: '6,000', 
//     address: 'Miami Beach Penthouse, FL',
//     type: 'Penthouse',
//     isFeatured: false, 
//     imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
//     description: 'A luxurious top-floor suite with a private plunge pool.',
//     longDescription: 'This Miami Beach penthouse offers the ultimate in luxury living. The top-floor suite features a private plunge pool, expansive terraces with city and ocean views, and high-end finishes throughout. Building amenities include 24/7 concierge, spa, fitness center, and direct beach access.'
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

// const ListingCard = ({ listing, onClick }) => (
//   <div 
//     className="group bg-white flex flex-col shadow-md hover:shadow-xl transition duration-300 relative rounded-xl overflow-hidden cursor-pointer"
//     onClick={() => onClick(listing)}
//   >
//     <div className="h-60 overflow-hidden relative">
//       <img src={listing.imageUrl} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      
//       <div className="absolute top-3 right-3 flex space-x-2">
//         {listing.isFeatured && (
//           <span className="bg-white text-xs text-gray-800 font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
//             <Star size={12} className="text-amber-600 fill-current mr-1" />
//             Featured
//           </span>
//         )}
//         <button 
//             className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transform transition duration-150"
//             onClick={(e) => e.stopPropagation()}
//         >
//           <Heart size={18} className="text-gray-700 hover:text-red-500" />
//         </button>
//       </div>
//     </div>
    
//     <div className="p-5 flex flex-col justify-between flex-grow">
//       <p className="text-2xl font-light text-gray-900 mb-2">{listing.priceDisplay}</p>
//       <p className="text-sm text-gray-600 mb-2">{listing.beds} Beds · {listing.baths} Baths · {listing.sqft} ft²</p>
//       <p className="text-sm text-gray-500 truncate">{listing.address}</p>
//     </div>
//   </div>
// );

// const RentPage = () => {
//     const [currentPage, setCurrentPage] = useState('listings');
//     const [selectedListing, setSelectedListing] = useState(null);
//     const [viewMode, setViewMode] = useState('list');
//     const [listingType, setListingType] = useState('rent');
//     const [selectedType, setSelectedType] = useState('Any');
//     const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
//     const [selectedBeds, setSelectedBeds] = useState('Any');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [openDropdown, setOpenDropdown] = useState(null);
    
//     const handleBuyClick = () => {
//         window.location.href = '/buy';
//     };
    
//     const filteredListings = mockListings.filter(listing => {
//         if (selectedType !== 'Any' && listing.type !== selectedType) return false;
//         const price = parseFloat(listing.price.replace(/,/g, ''));
//         if (!isNaN(price) && (price < selectedPrice.min || price > selectedPrice.max)) return false;
//         if (selectedBeds !== 'Any') {
//             const minBeds = parseInt(selectedBeds);
//             if (listing.beds < minBeds) return false;
//         }
//         if (searchQuery && !listing.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//         return true;
//     });
    
//     const openListingDetails = (listing) => {
//         setSelectedListing(listing);
//         setCurrentPage('propertyDetail');
//         window.scrollTo(0, 0);
//     };

//     const closeListingDetails = () => {
//         setSelectedListing(null);
//         setCurrentPage('listings');
//         window.scrollTo(0, 0);
//     };
    
//     const toggleDropdown = (dropdownName) => {
//         setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
//     };

//     // Property Detail Page
//     if (currentPage === 'propertyDetail' && selectedListing) {
//         return (
//             <div className="min-h-screen bg-white">
//                 <div className="bg-white border-b sticky top-0 z-10">
//                     <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
//                         <button 
//                             onClick={closeListingDetails}
//                             className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
//                         >
//                             <ChevronLeft size={20} className="mr-1" />
//                             Back to Listings
//                         </button>
//                     </div>
//                 </div>
                
//                 <div className="relative h-[60vh] bg-gray-900">
//                     <img 
//                         src={selectedListing.imageUrl} 
//                         alt={selectedListing.address}
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
//                             {selectedListing.isFeatured && (
//                                 <div className="inline-flex items-center bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-amber-200">
//                                     <Star size={16} className="mr-2 fill-current" />
//                                     Featured Listing
//                                 </div>
//                             )}
                            
//                             <h1 className="text-5xl font-serif text-gray-900 mb-3">
//                                 {selectedListing.priceDisplay}
//                             </h1>
                            
//                             <p className="text-lg text-gray-600 mb-6 flex items-center">
//                                 <MapPin size={18} className="mr-2 text-gray-500" />
//                                 {selectedListing.address}
//                             </p>
                            
//                             <div className="flex items-center space-x-8 mb-8 pb-8 border-b">
//                                 <div className="flex items-center">
//                                     <Bed size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedListing.beds}</p>
//                                         <p className="text-sm text-gray-500">Bedrooms</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Bath size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedListing.baths}</p>
//                                         <p className="text-sm text-gray-500">Bathrooms</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Maximize size={24} className="mr-3 text-gray-600" />
//                                     <div>
//                                         <p className="text-2xl font-semibold text-gray-900">{selectedListing.sqft}</p>
//                                         <p className="text-sm text-gray-500">Square Feet</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-serif text-gray-900 mb-4">Property Overview</h2>
//                                 <p className="text-gray-700 leading-relaxed mb-4">
//                                     {selectedListing.description}
//                                 </p>
//                                 <p className="text-gray-700 leading-relaxed">
//                                     {selectedListing.longDescription}
//                                 </p>
//                             </div>
                            
//                             <div className="mb-8">
//                                 <h2 className="text-2xl font-serif text-gray-900 mb-4">Rental Terms</h2>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Property Type</p>
//                                             <p className="text-gray-600">{selectedListing.type}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Lease Term</p>
//                                             <p className="text-gray-600">12 Months Minimum</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Available</p>
//                                             <p className="text-gray-600">Immediately</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-start">
//                                         <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
//                                         <div>
//                                             <p className="font-semibold text-gray-900">Furnishing</p>
//                                             <p className="text-gray-600">Fully Furnished</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
                        
//                         <div className="md:col-span-1">
//                             <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
//                                 <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule a Viewing</h3>
//                                 <div className="space-y-4 mb-6">
//                                     <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
//                                     <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
//                                     <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
//                                     <textarea placeholder="Message" rows="4" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" defaultValue="I'm interested in scheduling a viewing for this property."></textarea>
//                                 </div>
//                                 <button className="w-full py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-600 transition mb-3">
//                                     Request Viewing
//                                 </button>
//                                 <button className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition">
//                                     Contact Agent
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
//         <div className="min-h-screen bg-white font-sans">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="text-sm text-gray-500 mb-2">
//                     <span className="cursor-pointer hover:text-gray-900 transition">Home</span>
//                     {' > '}
//                     <span className="text-gray-900 font-medium">Homes For Rent</span>
//                 </div>

//                 <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Luxury Homes For Rent</h1>

//                 <div className="flex mb-6 max-w-3xl">
//                     <input
//                         type="text"
//                         placeholder="Search by Location (Country, State, or City)"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-amber-700 text-base"
//                     />
//                     <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r text-gray-600 hover:bg-gray-50 transition" aria-label="Search">
//                         <Search size={20} />
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2 mb-4">
//                     <button 
//                         onClick={handleBuyClick}
//                         className={FILTER_BUTTON_CLASSES}
//                     >
//                         Buy
//                     </button>
//                     <button 
//                         onClick={() => setListingType('rent')}
//                         className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-900 bg-amber-100 border-amber-300 transition"
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
//                         <Star size={16} className="inline mr-1 text-amber-600 fill-current" /> Save Search
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
//                     <span className="text-gray-500">{filteredListings.length} Listings</span>
//                 </div>

//                 <div className="flex justify-between items-center mb-6 border-b pb-4">
//                     <div className="flex items-center space-x-4">
//                         <span className="text-sm text-gray-600">Sort:</span>
//                         <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-amber-700 focus:border-amber-700 bg-white">
//                             <option>Featured</option>
//                             <option>Price (Low to High)</option>
//                             <option>Price (High to Low)</option>
//                             <option>Newest</option>
//                         </select>
//                     </div>
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

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2 space-y-6">
//                         {filteredListings.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {filteredListings.map(listing => (
//                                     <ListingCard key={listing.id} listing={listing} onClick={openListingDetails} />
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-12">
//                                 <p className="text-gray-500 text-lg">No properties match your filters.</p>
//                                 <button 
//                                     onClick={() => {
//                                         setSelectedType('Any');
//                                         setSelectedPrice(PRICE_RANGES[0]);
//                                         setSelectedBeds('Any');
//                                         setSearchQuery('');
//                                     }}
//                                     className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition"
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         )}

//                         {filteredListings.length > 0 && (
//                             <div className="flex justify-center items-center space-x-2 pt-6">
//                                 <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition">
//                                     <ChevronLeft size={20} />
//                                 </button>
//                                 {[1, 2, 3, 4, 5, '...', 73].map((page, index) => (
//                                     <button 
//                                         key={index}
//                                         className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${page === 1 ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
//                                     >
//                                         {page}
//                                     </button>
//                                 ))}
//                                 <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition">
//                                     <ChevronLeft size={20} className="rotate-180" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>

//                     <div className={`lg:col-span-1 sticky top-20 h-screen ${viewMode === 'list' ? 'hidden lg:block' : 'block'}`}>
//                         <div className="h-full min-h-[600px] lg:min-h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 relative">
//                             <iframe 
//                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11342686.06941427!2d-114.61864147047717!3d36.31976092049175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80b27b409749171f%3A0xc3f8e5d0f1712a32!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1678886000000!5m2!1sen!2s" 
//                                 width="100%" 
//                                 height="100%" 
//                                 style={{ border: 0 }} 
//                                 allowFullScreen="" 
//                                 loading="lazy" 
//                                 referrerPolicy="no-referrer-when-downgrade"
//                                 title="Listing Map View"
//                             ></iframe>
//                             <div className="absolute top-4 left-4 bg-white px-3 py-2 text-xs font-medium rounded-lg shadow-lg">
//                                 Map View
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RentPage;









import React, { useState, useEffect } from 'react';
import { Search, Heart, Star, Map, Filter, X, ChevronLeft, Bath, Bed, Maximize, MapPin } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';

const GOLD_COLOR = '#A38D66';
const FILTER_BUTTON_CLASSES = 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition';

const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Villa', 'Penthouse', 'Estate'];
const PRICE_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '$50K - $100K', min: 50000, max: 100000 },
  { label: '$100K - $200K', min: 100000, max: 200000 },
  { label: '$200K - $300K', min: 200000, max: 300000 },
  { label: '$300K+', min: 300000, max: Infinity },
];
const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+', '6+'];

const ListingCard = ({ listing, onClick }) => (
  <div 
    className="group bg-white flex flex-col shadow-md hover:shadow-xl transition duration-300 relative rounded-xl overflow-hidden cursor-pointer"
    onClick={() => onClick(listing)}
  >
    <div className="h-60 overflow-hidden relative">
      <img src={listing.imageUrl} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      
      <div className="absolute top-3 right-3 flex space-x-2">
        {listing.isFeatured && (
          <span className="bg-white text-xs text-gray-800 font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
            <Star size={12} className="text-amber-600 fill-current mr-1" />
            Featured
          </span>
        )}
        <button 
            className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transform transition duration-150"
            onClick={(e) => e.stopPropagation()}
        >
          <Heart size={18} className="text-gray-700 hover:text-red-500" />
        </button>
      </div>
    </div>
    
    <div className="p-5 flex flex-col justify-between flex-grow">
        <p className="text-sm text-gray-600 mb-2">{listing.name}</p>
      <p className="text-2xl font-light text-gray-900 mb-2">{listing.priceDisplay}</p>
      <p className="text-sm text-gray-600 mb-2">{listing.beds} Beds · {listing.baths} Baths · {listing.sqft} ft²</p>
      <p className="text-sm text-gray-500 truncate">{listing.address}</p>
    </div>
  </div>
);

const RentPage = () => {
    const [currentPage, setCurrentPage] = useState('listings');
    const [selectedListing, setSelectedListing] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [listingType, setListingType] = useState('rent');
    const [selectedType, setSelectedType] = useState('Any');
    const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0]);
    const [selectedBeds, setSelectedBeds] = useState('Any');
    const [searchQuery, setSearchQuery] = useState('');
    const [openDropdown, setOpenDropdown] = useState(null);

    // Data states
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination meta
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [total, setTotal] = useState(0);

    // Helper: map backend item to UI-friendly listing shape
    const normalizeListing = (item) => {
        // Try common backend keys and fall back to mock-friendly keys
        const priceRaw = item.price ?? item.amount ?? item.rent ?? 0;
        const priceNumber = typeof priceRaw === 'string' ? parseFloat(priceRaw.replace(/[^0-9.-]+/g, '')) : Number(priceRaw);
        const priceDisplay = item.price_display || item.priceDisplay || (priceNumber ? `$${priceNumber.toLocaleString()} /Monthly` : item.priceDisplay || '$0');

        return {
            id: item.id ?? item._id ?? Math.random(),
            price: priceNumber || 0,
            name: item.name,
            priceDisplay,
            beds: item.beds ?? item.bedrooms ?? item.no_of_bedrooms ?? 0,
            baths: item.baths ?? item.bathrooms ?? item.no_of_bathrooms ?? 0,
            sqft: item.sqft ?? item.size ?? item.area ?? item.square_feet ?? item.feets ?? '—',
            address: item.address ?? item.location ?? item.title ?? 'Unknown address',
            type: item.type ?? item.property_type ?? 'House',
            isFeatured: !!(item.isFeatured || item.featured || item.featured === 1),
            imageUrl: item.image_url ?? item.imageUrl ?? item.image ?? 'https://via.placeholder.com/800x600?text=No+Image',
            description: item.description ?? item.short_description ?? item.summary ?? '',
            longDescription: item.long_description ?? item.details ?? item.description ?? '',
            raw: item,
        };
    };

    const buildParams = () => {
        const params = { page };

        // Always include only rent or both properties
        // params.listing_for = ['rent', 'both']; // Assuming backend understands this filter
        params.property_type = ['rent', 'both'];
        // params.property_type = 'rent';

        if (selectedType && selectedType !== 'Any') params.property_type = selectedType;

        if (selectedPrice && selectedPrice.label !== 'Any') {
            if (isFinite(selectedPrice.min)) params.price_min = selectedPrice.min;
            if (isFinite(selectedPrice.max)) params.price_max = selectedPrice.max;
        }

        if (selectedBeds && selectedBeds !== 'Any') {
            const minBeds = parseInt(selectedBeds.replace('+', ''), 10);
            if (!isNaN(minBeds)) params.beds_min = minBeds;
        }

        if (searchQuery) params.search = searchQuery;

        return params;
    };


    // Fetch listings from backend
    const fetchListings = async () => {
        setLoading(true);
        setError(null);

        console.log('Fetching listings with params:', buildParams());
        
        try {
            const params = buildParams();
            const response = await axiosClient.get('/houses', { params });

            // Flexible handling for various backend formats
            const payload = response.data ?? response;

            // Extract listings array
            let items = [];
            if (Array.isArray(payload)) items = payload;
            else if (Array.isArray(payload.data)) items = payload.data;
            else if (Array.isArray(payload.results)) items = payload.results;
            else items = [];

            const normalized = items.map(normalizeListing);
            setListings(normalized);

            // Pagination meta: try common shapes (Laravel, API Platform, custom)
            const meta = payload.meta ?? payload.pagination ?? {};
            const currentPage = payload.current_page ?? meta.current_page ?? meta.page ?? params.page ?? page;
            const last = payload.last_page ?? meta.last_page ?? meta.last ?? meta.total_pages ?? 1;
            const pPerPage = payload.per_page ?? meta.per_page ?? meta.limit ?? perPage;
            const tot = payload.total ?? meta.total ?? meta.count ?? (Array.isArray(items) ? items.length : 0);

            setPage(Number(currentPage) || 1);
            setLastPage(Number(last) || 1);
            setPerPage(Number(pPerPage) || perPage);
            setTotal(Number(tot) || (normalized.length));

        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to fetch listings');
            // keep existing listings in UI rather than clearing
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch when filters or page changes
    useEffect(() => {
        fetchListings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedType, selectedPrice, selectedBeds, searchQuery, listingType]);

    const openListingDetails = (listing) => {
        setSelectedListing(listing);
        setCurrentPage('propertyDetail');
        window.scrollTo(0, 0);
    };

    const closeListingDetails = () => {
        setSelectedListing(null);
        setCurrentPage('listings');
        window.scrollTo(0, 0);
    };

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Pagination helpers
    const goToPage = (p) => {
        if (p < 1 || p > lastPage || p === page) return;
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPageButtons = () => {
        const arr = [];
        const left = Math.max(1, page - 2);
        const right = Math.min(lastPage, page + 2);
        if (left > 1) arr.push(1);
        if (left > 2) arr.push('...');
        for (let i = left; i <= right; i++) arr.push(i);
        if (right < lastPage - 1) arr.push('...');
        if (right < lastPage) arr.push(lastPage);
        return arr;
    };

    // Property Detail Page
    if (currentPage === 'propertyDetail' && selectedListing) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-white border-b sticky top-0 z-10">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
                        <button 
                            onClick={closeListingDetails}
                            className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
                        >
                            <ChevronLeft size={20} className="mr-1" />
                            Back to Listings
                        </button>
                    </div>
                </div>
                
                <div className="relative h-[60vh] bg-gray-900">
                    <img 
                        src={selectedListing.imageUrl} 
                        alt={selectedListing.address}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <button 
                        className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg text-gray-700 hover:text-red-500 transition"
                        aria-label="Add to Favorites"
                    >
                        <Heart size={24} />
                    </button>
                </div>
                
                <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {selectedListing.isFeatured && (
                                <div className="inline-flex items-center bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-amber-200">
                                    <Star size={16} className="mr-2 fill-current" />
                                    Featured Listing
                                </div>
                            )}
                            
                            <h1 className="text-5xl font-serif text-gray-900 mb-3">
                                {selectedListing.priceDisplay}
                            </h1>
                            
                            <p className="text-lg text-gray-600 mb-6 flex items-center">
                                <MapPin size={18} className="mr-2 text-gray-500" />
                                {selectedListing.address}
                            </p>
                            
                            <div className="flex items-center space-x-8 mb-8 pb-8 border-b">
                                <div className="flex items-center">
                                    <Bed size={24} className="mr-3 text-gray-600" />
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900">{selectedListing.beds}</p>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Bath size={24} className="mr-3 text-gray-600" />
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900">{selectedListing.baths}</p>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Maximize size={24} className="mr-3 text-gray-600" />
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-900">{selectedListing.sqft}</p>
                                        <p className="text-sm text-gray-500">Square Feet</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif text-gray-900 mb-4">Property Overview</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {selectedListing.description}
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedListing.longDescription}
                                </p>
                            </div>
                            
                            <div className="mb-8">
                                <h2 className="text-2xl font-serif text-gray-900 mb-4">Rental Terms</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Property Type</p>
                                            <p className="text-gray-600">{selectedListing.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Lease Term</p>
                                            <p className="text-gray-600">12 Months Minimum</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Available</p>
                                            <p className="text-gray-600">Immediately</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3"></div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Furnishing</p>
                                            <p className="text-gray-600">Fully Furnished</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="md:col-span-1">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Schedule a Viewing</h3>
                                <div className="space-y-4 mb-6">
                                    <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
                                    <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
                                    <input type="tel" placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" />
                                    <textarea placeholder="Message" rows="4" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-600" defaultValue="I'm interested in scheduling a viewing for this property."></textarea>
                                </div>
                                <button className="w-full py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-600 transition mb-3">
                                    Request Viewing
                                </button>
                                <button className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition">
                                    Contact Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Listings Page
    return (
        <div className="min-h-screen bg-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-sm text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-gray-900 transition">Home</span>
                    {' > '}
                    <span className="text-gray-900 font-medium">Homes For Rent</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Luxury Homes For Rent</h1>

                <div className="flex mb-6 max-w-3xl">
                    <input
                        type="text"
                        placeholder="Search by Location (Country, State, or City)"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                        className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-amber-700 text-base"
                    />
                    <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r text-gray-600 hover:bg-gray-50 transition" aria-label="Search">
                        <Search size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button 
                        onClick={() => window.location.href = '/buy'}
                        className={FILTER_BUTTON_CLASSES}
                    >
                        Buy
                    </button>
                    <button 
                        onClick={() => setListingType('rent')}
                        className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-900 bg-amber-100 border-amber-300 transition"
                    >
                        Rent
                    </button>
                    
                    <div className="relative">
                        <button onClick={() => toggleDropdown('type')} className={`${FILTER_BUTTON_CLASSES} ${openDropdown === 'type' ? 'bg-gray-100' : ''}`}>
                            {selectedType === 'Any' ? 'Type' : selectedType}
                        </button>
                        {openDropdown === 'type' && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
                                {['Any', ...PROPERTY_TYPES].map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedType(option); setOpenDropdown(null); setPage(1); }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${selectedType === option ? 'bg-gray-50 font-semibold' : ''}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="relative">
                        <button onClick={() => toggleDropdown('price')} className={`${FILTER_BUTTON_CLASSES} ${openDropdown === 'price' ? 'bg-gray-100' : ''}`}>
                            {selectedPrice.label}
                        </button>
                        {openDropdown === 'price' && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
                                {PRICE_RANGES.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedPrice(option); setOpenDropdown(null); setPage(1); }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${selectedPrice === option ? 'bg-gray-50 font-semibold' : ''}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="relative">
                        <button onClick={() => toggleDropdown('beds')} className={`${FILTER_BUTTON_CLASSES} ${openDropdown === 'beds' ? 'bg-gray-100' : ''}`}>
                            {selectedBeds === 'Any' ? 'Beds' : selectedBeds}
                        </button>
                        {openDropdown === 'beds' && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 min-w-[160px]">
                                {BED_OPTIONS.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { setSelectedBeds(option); setOpenDropdown(null); setPage(1); }}
                                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${selectedBeds === option ? 'bg-gray-50 font-semibold' : ''}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button className={FILTER_BUTTON_CLASSES}>
                        <Filter size={16} className="inline mr-1" /> Filters
                    </button>
                    <button className={FILTER_BUTTON_CLASSES}>
                        <Star size={16} className="inline mr-1 text-amber-600 fill-current" /> Save Search
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 mb-6">
                    {selectedPrice.label !== 'Any' && (
                        <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                            {selectedPrice.label}
                            <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => { setSelectedPrice(PRICE_RANGES[0]); setPage(1); }} />
                        </div>
                    )}
                    {selectedType !== 'Any' && (
                        <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                            {selectedType}
                            <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => { setSelectedType('Any'); setPage(1); }} />
                        </div>
                    )}
                    {selectedBeds !== 'Any' && (
                        <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                            {selectedBeds} Beds
                            <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" onClick={() => { setSelectedBeds('Any'); setPage(1); }} />
                        </div>
                    )}
                    <span className="text-gray-500">{total} Listings</span>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="text-center py-12">Loading listings...</div>
                        ) : listings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {listings.map(listing => (
                                    <ListingCard key={listing.id} listing={listing} onClick={openListingDetails} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No properties match your filters.</p>
                                <button 
                                    onClick={() => {
                                        setSelectedType('Any');
                                        setSelectedPrice(PRICE_RANGES[0]);
                                        setSelectedBeds('Any');
                                        setSearchQuery('');
                                        setPage(1);
                                    }}
                                    className="mt-4 px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}

                        {listings.length > 0 && (
                            <div className="flex justify-center items-center space-x-2 pt-6">
                                <button onClick={() => goToPage(page - 1)} className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition" disabled={page <= 1}>
                                    <ChevronLeft size={20} />
                                </button>

                                {renderPageButtons().map((p, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => typeof p === 'number' && goToPage(p)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ${p === page ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
                                        disabled={p === '...'}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button onClick={() => goToPage(page + 1)} className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition" disabled={page >= lastPage}>
                                    <ChevronLeft size={20} className="rotate-180" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={`lg:col-span-1 sticky top-20 h-screen ${viewMode === 'list' ? 'hidden lg:block' : 'block'}`}>
                        <div className="h-full min-h-[600px] lg:min-h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 relative">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11342686.06941427!2d-114.61864147047717!3d36.31976092049175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80b27b409749171f%3A0xc3f8e5d0f1712a32!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1678886000000!5m2!1sen!2s" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Listing Map View"
                            ></iframe>
                            <div className="absolute top-4 left-4 bg-white px-3 py-2 text-xs font-medium rounded-lg shadow-lg">
                                Map View
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentPage;
