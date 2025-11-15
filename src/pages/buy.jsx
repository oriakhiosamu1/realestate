import React, { useState } from 'react';
import { Search, Heart, Star, Map, Filter, X } from 'lucide-react';

// --- CONSTANTS & MOCK DATA ---
const GOLD_COLOR = '#A38D66';
const FILTER_BUTTON_CLASSES = 'px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition';

const MOCK_BUY_PROPERTIES = [
  { 
    id: 1, 
    price: '126,000,000', 
    beds: 22, 
    baths: 30, 
    sqft: '30,610', 
    location: '16025 Gloaming, Beverly Hills, CA 90210', 
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    featured: true 
  },
  { 
    id: 2, 
    price: '61,420,899', 
    beds: 7, 
    baths: 8, 
    sqft: '4,475', 
    location: 'Seaside Plaza, Fonteville, Monaco', 
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    featured: false 
  },
  { 
    id: 3, 
    price: '10,453,003', 
    beds: 5, 
    baths: 9, 
    sqft: '20,311', 
    location: 'Luxury 5-Bedroom Seaview Villa In..', 
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    featured: true 
  },
  { 
    id: 4, 
    price: 'Price available upon request', 
    beds: 5, 
    baths: 7, 
    sqft: '4,698', 
    location: 'Playa Langosta, Playa Langosta...', 
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    featured: false 
  },
  { 
    id: 5, 
    price: '45,800,000', 
    beds: 8, 
    baths: 10, 
    sqft: '12,500', 
    location: 'Malibu Beach Estate, CA 90265', 
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    featured: true 
  },
  { 
    id: 6, 
    price: '28,900,000', 
    beds: 6, 
    baths: 8, 
    sqft: '8,900', 
    location: 'Modern Villa, Miami Beach, FL', 
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    featured: false 
  },
  { 
    id: 7, 
    price: '89,500,000', 
    beds: 12, 
    baths: 15, 
    sqft: '18,750', 
    location: 'Hampton Estate, New York', 
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    featured: true 
  },
  { 
    id: 8, 
    price: '15,200,000', 
    beds: 4, 
    baths: 5, 
    sqft: '6,200', 
    location: 'Penthouse Suite, Manhattan, NY', 
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    featured: false 
  },
];

// --- COMPONENTS ---

/**
 * Renders a single property listing card.
 */
const PropertyCard = ({ property }) => (
    <div className="relative text-left bg-white overflow-hidden flex flex-col group transition duration-300 cursor-pointer shadow-lg hover:shadow-xl rounded-lg">
      <div className="relative">
        <img 
            src={property.imageUrl} 
            alt={property.location} 
            className="w-full h-48 object-cover rounded-t-lg transition duration-300 group-hover:scale-[1.03]" 
        />
        {property.featured && (
          <div className="absolute bottom-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
            <Star size={12} style={{ color: GOLD_COLOR }} className="mr-1" fill={GOLD_COLOR} /> Featured Listing
          </div>
        )}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-red-500 transition" aria-label="Add to Favorites">
            <Heart size={18} />
          </button>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 flex-grow">
        <p className="text-xl font-light text-gray-900 mb-1 leading-snug">
          {property.price.includes('Price') ? property.price : `$${Number(property.price.replace(/,/g, '')).toLocaleString()}`}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          {property.beds} Beds, {property.baths} Baths, {property.sqft} ft²
        </p>
        <p className="text-xs text-gray-600 truncate">{property.location}</p>
      </div>
    </div>
);


/**
 * Buy Page Content - the main listing view.
 */
const Buy = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4">
                
                {/* Breadcrumbs & Title */}
                <div className="text-sm text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-gray-700">Home</span> 
                    &nbsp;&gt;&nbsp;
                    <span className="font-semibold text-gray-700">Homes For Sale</span>
                </div>
                <h1 className="text-5xl font-serif text-gray-900 mb-6">
                    Luxury Homes For Sale
                </h1>
                
                {/* Search Bar (Persistent) */}
                <div className="flex mb-6 max-w-3xl">
                    <input
                        type="text"
                        placeholder="Search by Location (Country, State, or City)"
                        className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#A38D66] text-base"
                    />
                    <button className="bg-white p-3 border border-gray-300 border-l-0 rounded-r text-gray-600 hover:bg-gray-50 transition" aria-label="Search">
                        <Search size={20} />
                    </button>
                </div>
                
                {/* Filter Buttons Row */}
                <div className="flex flex-wrap items-center space-x-2 space-y-2 mb-4 -ml-2">
                    {/* Primary Filters (Buy/Rent) */}
                    <button className={FILTER_BUTTON_CLASSES.replace('text-gray-700', 'text-gray-900 bg-gray-200 border-gray-300')}>
                        Buy
                    </button>
                    <button className={FILTER_BUTTON_CLASSES}>Rent</button>
                    
                    {/* Other Filters */}
                    <button className={FILTER_BUTTON_CLASSES}>Type</button>
                    <button className={FILTER_BUTTON_CLASSES}>Price</button>
                    <button className={FILTER_BUTTON_CLASSES}>Beds</button>
                    
                    {/* Filters & Save Search */}
                    <button className={FILTER_BUTTON_CLASSES}>
                        <Filter size={16} className="inline mr-1" /> Filters
                    </button>
                    <button className={FILTER_BUTTON_CLASSES}>
                        <Star size={16} style={{ color: GOLD_COLOR }} className="inline mr-1" fill={GOLD_COLOR} /> Save Search
                    </button>
                </div>
                
                {/* Active Filter Tags & Count */}
                <div className="flex items-center space-x-4 text-sm text-gray-700 mb-6">
                    <div className="flex items-center bg-white px-3 py-1 border border-gray-300 rounded-full shadow-sm">
                        $1.00M - $500.00M 
                        <X size={12} className="ml-2 cursor-pointer text-gray-500 hover:text-red-500" />
                    </div>
                    <span className="text-gray-500">
                        14,944 Listings
                    </span>
                </div>
                
                {/* Sort and View Toggles */}
                <div className="flex justify-end items-center mb-6">
                    <span className="text-sm text-gray-600 mr-4 hidden sm:inline">Sort: Featured</span>
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

            {/* Content Split: List and Map */}
            <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto px-4 md:px-8 pb-10">
                
                {/* Listing Results Column (Left) */}
                <div className="md:w-1/2 lg:w-2/5 pr-0 md:pr-6 space-y-6">
                    {MOCK_BUY_PROPERTIES.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                    
                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-2 pt-4 text-sm text-gray-700">
                        <a href="#" className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs px-3">&lt;</a>
                        <a href="#" className="p-2 px-3 border border-gray-900 bg-gray-900 text-white rounded-lg text-xs font-semibold">1</a>
                        <a href="#" className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">2</a>
                        <a href="#" className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">3</a>
                        <a href="#" className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">4</a>
                        <a href="#" className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">5</a>
                        <span className="text-gray-500 text-xs">...</span>
                        <a href="#" className="p-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">743</a>
                        <a href="#" className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs px-3">&gt;</a>
                    </div>
                </div>

                {/* Map Column (Right) */}
                <div className={`md:w-1/2 lg:w-3/5 md:block mt-8 md:mt-0 ${viewMode === 'list' ? 'hidden md:block' : 'block'}`}>
                    <div className="h-[70vh] md:h-[calc(100vh-280px)] bg-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-xl sticky top-28 relative">
                        {/* EMBEDDED MAP: Using an iframe for a live map of Beverly Hills area */}
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

                        {/* Map Overlay Button */}
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