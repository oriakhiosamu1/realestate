// import React, { useEffect, useState } from 'react';
// import { Search, Phone, Mail, MapPin } from 'lucide-react';
// import axiosClient from '../axiosClient/axiosClient';

// // Mock office data
// // const OFFICES_DATA = [
// //   {
// //     id: 1,
// //     name: "Palm Beach - Royal Palm Way Office",
// //     address: "230 Royal Palm Way, Suite 102, Palm Beach, FL, 33480",
// //     phone: "+1 (561) 659-3555",
// //     email: "palmbeach@christiesrealestate.com",
// //     languages: ["English"],
// //     lat: 26.7056,
// //     lng: -80.0364
// //   },
// //   {
// //     id: 2,
// //     name: "Palm Beach - Worth Avenue Office",
// //     address: "125 Worth Avenue, Suite 221, Palm Beach, FL, 33480",
// //     phone: "+1 (561) 805-7878",
// //     email: "worthave@christiesrealestate.com",
// //     languages: ["English", "Spanish"],
// //     lat: 26.7053,
// //     lng: -80.0378
// //   },
// //   {
// //     id: 3,
// //     name: "Harbor Springs",
// //     address: "157 E Bay Street, Harbor Springs, MI, 49740",
// //     phone: "+1 (231) 526-9700",
// //     email: "harborsprings@christiesrealestate.com",
// //     languages: ["English"],
// //     lat: 45.4311,
// //     lng: -84.9942
// //   },
// //   {
// //     id: 4,
// //     name: "Detroit",
// //     address: "3700 Woodward Avenue, #20, Detroit, MI, 48201",
// //     phone: "+1 (313) 989-7800",
// //     email: "detroit@christiesrealestate.com",
// //     languages: ["French", "Italian", "English", "Spanish"],
// //     lat: 42.3314,
// //     lng: -83.0458
// //   },
// //   {
// //     id: 5,
// //     name: "Rochester",
// //     address: "105 W 4th Street, Rochester, MI, 48307",
// //     phone: "+1 (248) 652-8000",
// //     email: "rochester@christiesrealestate.com",
// //     languages: ["English"],
// //     lat: 42.6806,
// //     lng: -83.1338
// //   },
// //   {
// //     id: 6,
// //     name: "Petoskey",
// //     address: "426 E Mitchell Street, Suite 4A, Petoskey, MI, 49770",
// //     phone: "+1 (231) 347-5501",
// //     email: "petoskey@christiesrealestate.com",
// //     languages: ["English", "Icelandic", "Spanish"],
// //     lat: 45.3733,
// //     lng: -84.9553
// //   },
// //   {
// //     id: 7,
// //     name: "Birmingham",
// //     address: "460 S Old Woodward, Suite 400, Birmingham, MI, 48009",
// //     phone: "+1 (248) 644-6300",
// //     email: "birmingham@christiesrealestate.com",
// //     languages: ["Farsi", "English", "Russian", "French", "German"],
// //     lat: 42.5467,
// //     lng: -83.2113
// //   },
// //   {
// //     id: 8,
// //     name: "Grosse Pointe",
// //     address: "100 Kercheval Ave, Grosse Pointe Farms, MI, 48236",
// //     phone: "+1 (313) 886-5040",
// //     email: "grossepointe@christiesrealestate.com",
// //     languages: ["English", "Chinese (Unspecified)"],
// //     lat: 42.4042,
// //     lng: -82.8938
// //   }
// // ];

// const [OFFICES_DATA, setOFFICES_DATA] = useState([
//   {
//     id: 1,
//     name: "Palm Beach - Royal Palm Way Office",
//     address: "230 Royal Palm Way, Suite 102, Palm Beach, FL, 33480",
//     phone: "+1 (561) 659-3555",
//     email: "palmbeach@christiesrealestate.com",
//     languages: ["English"],
//     lat: 26.7056,
//     lng: -80.0364
//   },
//   {
//     id: 2,
//     name: "Palm Beach - Worth Avenue Office",
//     address: "125 Worth Avenue, Suite 221, Palm Beach, FL, 33480",
//     phone: "+1 (561) 805-7878",
//     email: "worthave@christiesrealestate.com",
//     languages: ["English", "Spanish"],
//     lat: 26.7053,
//     lng: -80.0378
//   },
//   {
//     id: 3,
//     name: "Harbor Springs",
//     address: "157 E Bay Street, Harbor Springs, MI, 49740",
//     phone: "+1 (231) 526-9700",
//     email: "harborsprings@christiesrealestate.com",
//     languages: ["English"],
//     lat: 45.4311,
//     lng: -84.9942
//   },
//   {
//     id: 4,
//     name: "Detroit",
//     address: "3700 Woodward Avenue, #20, Detroit, MI, 48201",
//     phone: "+1 (313) 989-7800",
//     email: "detroit@christiesrealestate.com",
//     languages: ["French", "Italian", "English", "Spanish"],
//     lat: 42.3314,
//     lng: -83.0458
//   },
//   {
//     id: 5,
//     name: "Rochester",
//     address: "105 W 4th Street, Rochester, MI, 48307",
//     phone: "+1 (248) 652-8000",
//     email: "rochester@christiesrealestate.com",
//     languages: ["English"],
//     lat: 42.6806,
//     lng: -83.1338
//   },
//   {
//     id: 6,
//     name: "Petoskey",
//     address: "426 E Mitchell Street, Suite 4A, Petoskey, MI, 49770",
//     phone: "+1 (231) 347-5501",
//     email: "petoskey@christiesrealestate.com",
//     languages: ["English", "Icelandic", "Spanish"],
//     lat: 45.3733,
//     lng: -84.9553
//   },
//   {
//     id: 7,
//     name: "Birmingham",
//     address: "460 S Old Woodward, Suite 400, Birmingham, MI, 48009",
//     phone: "+1 (248) 644-6300",
//     email: "birmingham@christiesrealestate.com",
//     languages: ["Farsi", "English", "Russian", "French", "German"],
//     lat: 42.5467,
//     lng: -83.2113
//   },
//   {
//     id: 8,
//     name: "Grosse Pointe",
//     address: "100 Kercheval Ave, Grosse Pointe Farms, MI, 48236",
//     phone: "+1 (313) 886-5040",
//     email: "grossepointe@christiesrealestate.com",
//     languages: ["English", "Chinese (Unspecified)"],
//     lat: 42.4042,
//     lng: -82.8938
//   }
// ]);

// const OfficeCard = ({ office }) => {
//   return (
//     <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="p-3 xs:p-4 sm:p-5 md:p-6">
//         {/* Office Name */}
//         <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-serif text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 leading-tight">
//           {office.name}
//         </h3>
        
//         {/* Address */}
//         <div className="flex items-start gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
//           <MapPin size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//           <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-relaxed">
//             {office.address}
//           </p>
//         </div>

//         {/* Languages */}
//         {office.languages && office.languages.length > 0 && (
//           <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mb-2 xs:mb-3 sm:mb-4">
//             <span className="font-medium">Languages:</span> {office.languages.join(', ')}
//           </p>
//         )}

//         {/* Action Buttons */}
//         <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
//           <button 
//             onClick={() => window.location.href = `tel:${office.phone}`}
//             className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 text-[10px] xs:text-xs sm:text-sm font-medium rounded"
//           >
//             <Phone size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
//             Call
//           </button>
//           <button 
//             onClick={() => window.location.href = `mailto:${office.email}`}
//             className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 text-[10px] xs:text-xs sm:text-sm font-medium rounded"
//           >
//             <Mail size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
//             Email
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OfficesPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showMap, setShowMap] = useState(true);

//   useEffect(() => {
//     axiosClient.get('/offices')
//       .then(res => {
//         setOFFICES_DATA(res.data.data || res.data);
//       })
//       .catch(err => {
//         console.error('Error fetching offices:', err);
//       });
//   }, []);

//   // Filter offices based on search query
//   const filteredOffices = OFFICES_DATA.filter(office => 
//     office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     office.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 md:py-4">
//           <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm text-gray-600">
//             <a href="/" className="hover:text-gray-900 transition">Home</a>
//             <span>&gt;</span>
//             <span className="text-gray-900 font-medium">Offices</span>
//           </div>
//         </div>
//       </div>

//       {/* Header Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-4 xs:py-5 sm:py-6 md:py-8 lg:py-10">
//           <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif text-gray-900 mb-2 xs:mb-2.5 sm:mb-3 md:mb-4 lg:mb-5 leading-tight">
//             Brokerage Offices Worldwide
//           </h1>
//           <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-4xl">
//             Christie's International Real Estate encompasses the world's premier brokerages and the industry's most accomplished luxury specialists. Whether you wish to sell or acquire a luxury property, explore our affiliate offices to connect with a trusted expert in your local market or desired destination.
//           </p>
//         </div>
//       </div>

//       {/* Search and Toggle Section */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2 xs:py-2.5 sm:py-3 md:py-4">
//           <div className="flex flex-col sm:flex-row gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 items-stretch sm:items-center justify-between">
//             {/* Search Bar */}
//             <div className="flex-grow max-w-xl">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search by Location, Language, or Office Name"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-2.5 xs:pl-3 pr-9 xs:pr-10 py-1.5 xs:py-2 sm:py-2.5 text-[10px] xs:text-xs sm:text-sm border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent"
//                 />
//                 <button 
//                   className="absolute right-1.5 xs:right-2 top-1/2 transform -translate-y-1/2 bg-yellow-800 text-white p-1 xs:p-1.5 sm:p-2 rounded hover:bg-yellow-900 transition"
//                   aria-label="Search"
//                 >
//                   <Search size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Map Toggle */}
//             <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 justify-between sm:justify-start">
//               <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700">Map</span>
//               <button
//                 onClick={() => setShowMap(!showMap)}
//                 className={`relative inline-flex h-5 w-9 xs:h-6 xs:w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors duration-300 ${
//                   showMap ? 'bg-yellow-800' : 'bg-gray-300'
//                 }`}
//                 aria-label="Toggle Map"
//               >
//                 <span
//                   className={`inline-block h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform duration-300 ${
//                     showMap ? 'translate-x-5 xs:translate-x-6 sm:translate-x-6' : 'translate-x-0.5 xs:translate-x-1'
//                   }`}
//                 />
//               </button>
//             </div>
//           </div>

//           {/* Office Count */}
//           <div className="mt-2 xs:mt-2.5 sm:mt-3 md:mt-4">
//             <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600">
//               <span className="font-semibold">{filteredOffices.length}</span> Offices
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8">
//         <div className="flex flex-col lg:flex-row gap-3 xs:gap-4 sm:gap-5 md:gap-6">
//           {/* Offices Grid */}
//           <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
//             <div className="grid grid-cols-1 gap-2.5 xs:gap-3 sm:gap-4 md:gap-5">
//               {filteredOffices.map((office) => (
//                 <OfficeCard key={office.id} office={office} />
//               ))}
//             </div>

//             {filteredOffices.length === 0 && (
//               <div className="text-center py-8 xs:py-10 sm:py-12 md:py-16">
//                 <p className="text-xs xs:text-sm sm:text-base text-gray-500">
//                   No offices found matching your search criteria.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Map Section */}
//           {showMap && (
//             <div className="lg:w-1/2 lg:sticky lg:top-24 self-start">
//               <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg overflow-hidden shadow-lg">
//                 <div className="relative h-[300px] xs:h-[350px] sm:h-[450px] md:h-[550px] lg:h-[calc(100vh-200px)]">
//                   {/* Map Controls */}
//                   <div className="absolute top-2 xs:top-2.5 sm:top-3 left-2 xs:left-2.5 sm:left-3 z-10 bg-white shadow-md rounded overflow-hidden flex text-[9px] xs:text-[10px] sm:text-xs">
//                     <button className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white border-r border-gray-200 hover:bg-gray-50 font-medium">
//                       Map
//                     </button>
//                     <button className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-gray-100 hover:bg-gray-50 text-gray-600">
//                       Satellite
//                     </button>
//                   </div>

//                   {/* Fullscreen Button */}
//                   <button className="absolute top-2 xs:top-2.5 sm:top-3 right-2 xs:right-2.5 sm:right-3 z-10 bg-white p-1.5 xs:p-2 rounded shadow-md hover:bg-gray-50">
//                     <svg width="14" height="14" className="xs:w-4 xs:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
//                     </svg>
//                   </button>

//                   {/* Location Button */}
//                   <button className="absolute bottom-20 xs:bottom-24 sm:bottom-28 right-2 xs:right-2.5 sm:right-3 z-10 bg-white p-1.5 xs:p-2 rounded-full shadow-md hover:bg-gray-50">
//                     <svg width="16" height="16" className="xs:w-5 xs:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <circle cx="12" cy="12" r="10"/>
//                       <circle cx="12" cy="12" r="3" fill="currentColor"/>
//                     </svg>
//                   </button>

//                   {/* Zoom Controls */}
//                   <div className="absolute bottom-12 xs:bottom-14 sm:bottom-16 right-2 xs:right-2.5 sm:right-3 z-10 bg-white rounded shadow-md overflow-hidden">
//                     <button className="block w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 border-b border-gray-200 hover:bg-gray-50 text-base xs:text-lg sm:text-xl font-light">
//                       +
//                     </button>
//                     <button className="block w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 hover:bg-gray-50 text-base xs:text-lg sm:text-xl font-light">
//                       −
//                     </button>
//                   </div>

//                   {/* Street View */}
//                   <button className="absolute bottom-2 xs:bottom-2.5 sm:bottom-3 right-2 xs:right-2.5 sm:right-3 z-10 bg-white p-1.5 xs:p-2 rounded shadow-md hover:bg-gray-50">
//                     <svg width="18" height="18" className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="8" r="3" fill="#FDB515"/>
//                       <path d="M12 11v5m-3 3h6" stroke="#FDB515" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                   </button>

//                   {/* Map Placeholder */}
//                   <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 relative">
//                     {/* Simulated Map Markers */}
//                     {filteredOffices.map((office, index) => (
//                       <div
//                         key={office.id}
//                         className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
//                         style={{
//                           left: `${20 + (index % 3) * 25}%`,
//                           top: `${30 + Math.floor(index / 3) * 20}%`
//                         }}
//                       >
//                         <div className="relative">
//                           <div className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-500 rounded-full border-2 xs:border-3 sm:border-4 border-white shadow-lg flex items-center justify-center">
//                             <MapPin size={10} className="xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
//                           </div>
//                           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 xs:mb-1.5 sm:mb-2 hidden group-hover:block w-36 xs:w-40 sm:w-48">
//                             <div className="bg-white rounded shadow-lg p-1.5 xs:p-2 text-[9px] xs:text-[10px] sm:text-xs">
//                               <p className="font-semibold text-gray-900 leading-tight">{office.name}</p>
//                               <p className="text-gray-600 text-[8px] xs:text-[9px] sm:text-[10px] mt-0.5 xs:mt-1 leading-snug">{office.address}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     {/* Map Labels */}
//                     <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 bg-white bg-opacity-75 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded">
//                       Keyboard shortcuts
//                     </div>
//                     <div className="absolute bottom-1.5 xs:bottom-2 left-1/2 transform -translate-x-1/2 text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 bg-white bg-opacity-75 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded hidden xs:block">
//                       Map data ©2025 Google
//                     </div>
//                     <div className="absolute bottom-1.5 xs:bottom-2 right-1.5 xs:right-2 text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 bg-white bg-opacity-75 px-1.5 xs:px-2 py-0.5 xs:py-1 rounded flex items-center gap-0.5 xs:gap-1">
//                       <span className="text-blue-600 font-semibold">500 mi</span>
//                       <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-gray-600"></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfficesPage;



import React, { useState, useEffect } from "react";
import { Search, Phone, Mail, MapPin } from "lucide-react";
import axiosClient from "../axiosClient/axiosClient"; // Adjust path if necessary

const OfficeCard = ({ office }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md sm:rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
        {/* Office Name */}
        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-serif text-gray-900 mb-1.5 xs:mb-2 sm:mb-3 leading-tight">
          {office.name}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-1.5 xs:gap-2 mb-2 xs:mb-3 sm:mb-4">
          <MapPin
            size={12}
            className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-gray-400 mt-0.5 flex-shrink-0"
          />
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-relaxed">
            {office.location}
          </p>
        </div>

        {/* Languages */}
        {office.languages && office.languages.length > 0 && (
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500 mb-2 xs:mb-3 sm:mb-4">
            <span className="font-medium">Languages:</span>{" "}
            {office.languages}
          </p>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
          <button
            onClick={() => (window.location.href = `tel:${office.phone}`)}
            className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 text-[10px] xs:text-xs sm:text-sm font-medium rounded"
          >
            <Phone size={12} />
            Call
          </button>

          <button
            onClick={() => (window.location.href = `mailto:${office.email}`)}
            className="flex items-center justify-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200 text-[10px] xs:text-xs sm:text-sm font-medium rounded"
          >
            <Mail size={12} />
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

const OfficesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(true);

  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");

  /** Fetch from backend on component mount */
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosClient.get("/offices"); // backend route
        setOffices(res.data.data || res.data); // handle different API formats
      } catch (err) {
        console.error(err);
        setError("Unable to load offices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  const filteredOffices = offices.filter((office) => {
    if (!searchQuery) return true;

    const q = searchQuery.toLowerCase();

    return [
      office.name,
      office.address,
      office.city,
      office.state,
      office.country,
      ...(office.languages || []),
    ]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q));
  });


  /** Filter search */
  // const filteredOffices = offices.filter((office) => {
  //   const query = searchQuery.toLowerCase();
  //   return (
  //     office.name.toLowerCase().includes(query) ||
  //     office.address.toLowerCase().includes(query) ||
  //     office.languages?.some((lang) => lang.toLowerCase().includes(query))
  //   );
  // });

  const handleSearch = () => {
    setSearchQuery(searchText.trim().toLowerCase());
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header UI... (unchanged) */}

      {/* === Search Section === */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-center justify-between">
            
            {/* <div className="flex-grow max-w-xl relative">
              <input
                type="text"
                placeholder="Search by Location, Language, or Office Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-800 text-white p-2 rounded">
                <Search size={15} />
              </button>
            </div> */}

            <div className="flex-grow max-w-xl relative">
              <input
                type="text"
                placeholder="Search by Location, Language, or Office Name & press Enter"
                className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:border-yellow-800 focus:ring focus:ring-yellow-100 outline-none text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ENTER triggers search
              />

              {/* <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              /> */}

              {/* <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-800 text-white px-3 py-1.5 rounded-md hover:bg-yellow-900 transition"
              >
                Search
              </button> */}
            </div>

              {/* Toggle Map */}
              <button
                onClick={() => setShowMap(!showMap)}
                className={`relative inline-flex h-5 w-9 xs:h-6 xs:w-11 sm:h-7 sm:w-12 items-center rounded-full transition-colors duration-300 ${
                 showMap ? 'bg-yellow-800' : 'bg-gray-300'
                 }`}
                 aria-label="Toggle Map"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 transform rounded-full bg-white transition-transform duration-300 ${
                    showMap ? 'translate-x-5 xs:translate-x-6 sm:translate-x-6' : 'translate-x-0.5 xs:translate-x-1'
                  }`}
                />
              </button>
          </div>

          <p className="mt-2 text-gray-600 text-sm">
            <strong>{filteredOffices.length}</strong> Offices
          </p>
        </div>
      </div>

      {/* === Content === */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* LEFT: list */}
        <div className={`${showMap ? "lg:w-1/2" : "w-full"}`}>
          {loading && (
            <p className="text-center py-10 text-gray-400">Loading offices…</p>
          )}
          {error && (
            <p className="text-center py-10 text-red-500">{error}</p>
          )}

          {!loading && filteredOffices.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No offices found.
            </p>
          )}

          <div className="grid gap-4">
            {filteredOffices.map((office) => (
              <OfficeCard key={office.id} office={office} />
            ))}
          </div>
        </div>

        {/* RIGHT: Fake placeholder map (unchanged) */}
        {showMap && (
          <div className="lg:w-1/2">
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-md">
              <iframe
                title="office-map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.12416511386!2d54.36483181544452!3d24.474081784206318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65d5a7b019f7%3A0xe8bb1552c058f98!2sAbu%20Dhabi!5e0!3m2!1sen!2sng!4v1701547773381!5m2!1sen!2sng"
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OfficesPage;
