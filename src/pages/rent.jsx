import React, { useState } from 'react';

// --- Shared Assets/Data ---

const mockListings = [
  { id: 1, price: '$400,000 /Monthly', beds: '8 Beds', baths: '10 1/3 Baths', sqft: '9,780 ft²', address: '970 Powder Lopes, Aspen, CO 81611', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80' },
  { id: 2, price: '$230,000 /Monthly', beds: '9 Beds', baths: '13 Baths', sqft: '14,037 ft²', address: '10250 Chalon Rd, Los Angeles, CA...', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { id: 3, price: '$220,000 /Monthly', beds: '9 Beds', baths: '13 Baths', sqft: '14,037 ft²', address: '1890 Winding Way, Las Vegas, NV...', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 4, price: '$200,000 /Monthly', beds: '5 Beds', baths: '9 2/5 Baths', sqft: '5,376 ft²', address: '900 Waters Avenue, Aspen, CO 81611', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { id: 5, price: '$200,000 /Monthly', beds: '6 Beds', baths: '8 2/5 Baths', sqft: '9,376 ft²', address: '88 Robin Way, Aspen, CO 81611', isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 6, price: '$180,000 /Monthly', beds: '7 Beds', baths: '9 Baths', sqft: '8,500 ft²', address: 'Beverly Hills Estate, CA 90210', isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
  { id: 7, price: '$175,000 /Monthly', beds: '5 Beds', baths: '7 Baths', sqft: '7,200 ft²', address: 'Malibu Beach House, CA 90265', isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { id: 8, price: '$150,000 /Monthly', beds: '4 Beds', baths: '6 Baths', sqft: '6,000 ft²', address: 'Miami Beach Penthouse, FL', isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
];

// --- Helper Components ---

const HeartIcon = () => (
  <svg className="w-5 h-5 text-gray-700 hover:text-red-500 transition duration-150" fill="white" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3 text-amber-600 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

/**
 * Component for a single property listing card.
 */
const ListingCard = ({ listing }) => (
  <div className="group bg-white flex flex-col shadow-md hover:shadow-xl transition duration-300 relative rounded-xl overflow-hidden">
    <div className="h-60 overflow-hidden relative">
      {/* Property Image */}
      <img src={listing.imageUrl} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      
      {/* Heart Icon and Featured Tag */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {listing.isFeatured && (
          <span className="bg-white text-xs text-gray-800 font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
            <StarIcon />
            <span className="ml-1">Featured</span>
          </span>
        )}
        <button className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transform transition duration-150">
          <HeartIcon />
        </button>
      </div>
    </div>
    
    <div className="p-5 flex flex-col justify-between flex-grow">
      <p className="text-2xl font-light text-gray-900 mb-2">{listing.price}</p>
      <p className="text-sm text-gray-600 mb-2">{listing.beds} &middot; {listing.baths} &middot; {listing.sqft}</p>
      <p className="text-sm text-gray-500 truncate">{listing.address}</p>
    </div>
  </div>
);


/**
 * Mock Map Component (using an iframe placeholder)
 */
const MapView = () => (
  <div className="h-full min-h-[600px] lg:min-h-full rounded-xl overflow-hidden shadow-xl border border-gray-200 relative">
    {/* Mock map */}
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
    {/* Map Controls */}
    <div className="absolute top-4 left-4 bg-white px-3 py-2 text-xs font-medium rounded-lg shadow-lg">
      Map View
    </div>
    <div className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-xl cursor-pointer hover:bg-gray-50 transition">
      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
  </div>
);


/**
 * The main component for the Rent Listings Page
 */
const RentPage = () => {
  const type = 'Rent'; 
  const title = `Luxury Homes For ${type}`;
  const count = '1,655 Listings';
  const filters = ['Buy', 'Rent', 'Type', 'Price', 'Beds', 'Filters', 'Save Search'];

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <a href="#" className="hover:text-gray-900 cursor-pointer transition">Home</a>
          {' > '}
          <span className="text-gray-900 font-medium">Homes For {type}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">{title}</h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0 lg:space-x-4">
          
          {/* Search Input */}
          <div className="relative flex-grow max-w-2xl">
            <input 
              type="text" 
              placeholder="Search by Location (Country, State, or City)" 
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
            />
            <button className="absolute right-0 top-0 mt-3 mr-3 text-gray-400 hover:text-amber-700 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button 
                key={filter}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition duration-150 
                  ${filter === 'Rent' 
                    ? 'bg-amber-700 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {filter}
                {/* Icons for Filters and Save Search buttons */}
                {filter === 'Filters' && (
                  <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v7l-4 4v-7a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                )}
                {filter === 'Save Search' && (
                  <svg className="w-4 h-4 inline ml-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Listing Count and Sort/View Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 space-y-3 sm:space-y-0">
          <div className="text-gray-700 font-medium text-lg">
            {count}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort:</span>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-amber-700 focus:border-amber-700 bg-white">
              <option>Featured</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
              <option>Newest</option>
            </select>
            <button className="flex items-center text-gray-700 hover:text-amber-700 font-medium text-sm transition">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Map
            </button>
          </div>
        </div>

        {/* Listing Grid and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Listings Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 pt-6">
              <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              {[1, 2, 3, 4, 5, '...', 73].map((page, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-150 
                    ${page === 1 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Map Column (1/3 width) */}
          <div className="lg:col-span-1 sticky top-20 h-screen hidden lg:block">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentPage;