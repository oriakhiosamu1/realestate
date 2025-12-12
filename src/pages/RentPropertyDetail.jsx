// import React, { useState } from 'react';
// import { Heart, Share2, Home, Dumbbell, Flame, Droplet, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// export default function LuxuryVillaPage() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: 'I am interested in LUXURY VILLA RENTAL PALOMBAGGIA - PORTO VECCHIO',
//     tourType: 'in-person',
//     newsletter: false
//   });

//   const images = [
//     'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
//   ];

//   const nearbyProperties = [
//     {
//       title: 'Seafront Villa For Sale - Bay Of...',
//       beds: 5,
//       baths: 7,
//       sqft: '3,707 ft²',
//       image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
//     },
//     {
//       title: 'Exquisite Waterfront Property Fo...',
//       beds: 6,
//       baths: 8,
//       sqft: '3,767 ft²',
//       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop'
//     },
//     {
//       title: 'Contemporary Villa For Sale --...',
//       beds: 4,
//       baths: 5,
//       sqft: '1,722 ft²',
//       image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
//     },
//     {
//       title: 'Contemporary Villa For Sale --...',
//       beds: 6,
//       baths: 6,
//       sqft: '3,229 ft²',
//       image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop'
//     }
//   ];

//   const relatedStories = [
//     {
//       category: 'HOME TOURS',
//       title: 'How to Decide We Love: A Cozy, Chic Living Room by Redifine',
//       image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop'
//     },
//     {
//       category: 'HOME TOURS',
//       title: 'Splash in Style: 4 Private Indoor Pools',
//       image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop'
//     },
//     {
//       category: 'HOME TOURS',
//       title: 'Property Insights: What Does $15 Million Buy Around the World?',
//       image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop'
//     }
//   ];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted:', formData);
//     alert('Request submitted successfully!');
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Breadcrumb Navigation */}
//       <nav className="border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center space-x-2 text-sm text-gray-600">
//             <a href="#" className="hover:text-gray-900">Home</a>
//             <span>›</span>
//             <a href="#" className="hover:text-gray-900">Homes For Rent</a>
//             <span>›</span>
//             <a href="#" className="hover:text-gray-900">France</a>
//             <span>›</span>
//             <span className="text-gray-900">Porto-Vecchio</span>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2">
//             {/* Image Gallery */}
//             <div className="relative mb-6">
//               <div className="relative h-96 sm:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
//                 <img 
//                   src={images[currentImageIndex]} 
//                   alt="Villa view" 
//                   className="w-full h-full object-cover"
//                 />
//                 <button 
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>
//                 <button 
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//                 <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
//                   {currentImageIndex + 1} of {images.length} photos
//                 </div>
//               </div>
              
//               {/* Thumbnail Grid */}
//               <div className="grid grid-cols-4 gap-2 mt-4">
//                 {images.slice(1, 5).map((img, idx) => (
//                   <div 
//                     key={idx} 
//                     onClick={() => setCurrentImageIndex(idx + 1)}
//                     className="relative h-20 sm:h-24 bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-75 transition"
//                   >
//                     <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Property Info */}
//             <div className="mb-8">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-2">
//                     LUXURY VILLA RENTAL PALOMBAGGIA - PORTO VECCHIO
//                   </h1>
//                   <p className="text-gray-600">Villa in Porto-Vecchio</p>
//                   <p className="text-xl font-semibold text-gray-900 mt-2">PRICE AVAILABLE UPON REQUEST</p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//                     <Heart className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//                     <Share2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Property Stats */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-200">
//                 <div>
//                   <div className="text-2xl font-bold">8</div>
//                   <div className="text-gray-600 text-sm">Bedrooms</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">8</div>
//                   <div className="text-gray-600 text-sm">Bathrooms</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">4,306</div>
//                   <div className="text-gray-600 text-sm">ft²</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">2.47</div>
//                   <div className="text-gray-600 text-sm">ac</div>
//                 </div>
//               </div>

//               {/* Features */}
//               <div className="py-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold mb-4">FEATURES</h2>
//                 <div className="flex flex-wrap gap-3">
//                   <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded">
//                     <Home className="w-4 h-4" />
//                     <span className="text-sm">Guest House</span>
//                   </div>
//                   <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded">
//                     <Dumbbell className="w-4 h-4" />
//                     <span className="text-sm">Gym</span>
//                   </div>
//                   <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded">
//                     <Flame className="w-4 h-4" />
//                     <span className="text-sm">Fireplace</span>
//                   </div>
//                   <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded">
//                     <Droplet className="w-4 h-4" />
//                     <span className="text-sm">Pool</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="py-6 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold mb-4">DESCRIPTION</h2>
//                 <div className="text-gray-700 space-y-4">
//                   <p>
//                     Overlooking the "Hameau de Porro", a preserved and luxurious holiday resort located a few minutes from Porto-Vecchio, the property offers an exceptional panoramic view of the beach of Palombaggia.
//                   </p>
//                   <p>
//                     Built on one level, this luxurious villa with its contemporary architecture offers superb volumes and numerous living spaces over 400 m2.
//                   </p>
//                   <p>
//                     Wood, stone and polished concrete are the signature of this high standing property with 8 bedrooms including a master-bedroom with bathroom and dressing room, 8 bathrooms, air conditioning, heated infinity pool, hammam and gym.
//                   </p>
//                   <p>
//                     The whole villa is bathed in light thanks to huge bay windows opening entirely onto the wooden terrace, the pool and the sea.
//                   </p>
//                 </div>
//               </div>

//               {/* Map */}
//               <div className="py-6">
//                 <h2 className="text-xl font-semibold mb-4">MAP</h2>
//                 <div className="h-64 sm:h-96 bg-gray-200 rounded-lg overflow-hidden">
//                   <img 
//                     src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/9.2774,41.5912,11,0/800x600@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw" 
//                     alt="Map location" 
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Explore Corsica Section */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <div className="flex flex-col sm:flex-row gap-6">
//                 <img 
//                   src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop" 
//                   alt="Corsica beach" 
//                   className="w-full sm:w-48 h-48 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h2 className="text-2xl font-serif mb-2">Explore Corsica</h2>
//                   <h3 className="text-sm font-semibold text-gray-600 mb-2">DESTINATION GUIDE</h3>
//                   <p className="text-gray-700 mb-4">Living in Corsica: Things to Do and See in Corsica, France</p>
//                   <button className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition">
//                     Explore
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Contact Form */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               {/* Agent Info */}
//               <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
//                 <h3 className="text-xl font-semibold mb-4">Sylvie COSTI</h3>
//                 <div className="flex gap-2 mb-6">
//                   <button className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm">
//                     Call
//                   </button>
//                   <button className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm">
//                     Email
//                   </button>
//                 </div>
//                 <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-gray-200">
//                   <div className="text-xs font-semibold">Corse Prestige</div>
//                   <div className="text-xs font-semibold">CHRISTIE'S</div>
//                 </div>

//                 {/* Contact Form */}
//                 <div>
//                   <h4 className="font-semibold mb-4">REQUEST INFORMATION</h4>
//                   <div className="space-y-4">
//                     <input
//                       type="text"
//                       name="firstName"
//                       placeholder="First Name"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                     />
//                     <input
//                       type="text"
//                       name="lastName"
//                       placeholder="Last Name"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                     />
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email Address*"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                     />
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="Phone with Country Code"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                     />
//                     <textarea
//                       name="message"
//                       rows="4"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
//                     />
                    
//                     <div>
//                       <h5 className="font-semibold mb-2 text-sm">SCHEDULE A PROPERTY TOUR</h5>
//                       <div className="space-y-2">
//                         <label className="flex items-center cursor-pointer">
//                           <input
//                             type="radio"
//                             name="tourType"
//                             value="in-person"
//                             checked={formData.tourType === 'in-person'}
//                             onChange={handleInputChange}
//                             className="mr-2"
//                           />
//                           <span className="text-sm">In Person On Site Tour</span>
//                         </label>
//                         <label className="flex items-center cursor-pointer">
//                           <input
//                             type="radio"
//                             name="tourType"
//                             value="virtual"
//                             checked={formData.tourType === 'virtual'}
//                             onChange={handleInputChange}
//                             className="mr-2"
//                           />
//                           <span className="text-sm">Virtual Online Tour</span>
//                         </label>
//                       </div>
//                     </div>

//                     <label className="flex items-start cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="newsletter"
//                         checked={formData.newsletter}
//                         onChange={handleInputChange}
//                         className="mt-1 mr-2"
//                       />
//                       <span className="text-xs text-gray-600">Sign Up for Newsletter</span>
//                     </label>

//                     <button
//                       onClick={handleSubmit}
//                       className="w-full py-3 bg-amber-600 text-white rounded hover:bg-amber-700 font-semibold transition"
//                     >
//                       Submit
//                     </button>

//                     <p className="text-xs text-gray-500">
//                       By clicking "Submit" I agree to the Privacy Policy and Terms of Service and consent for Christie's International Real Estate...
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Nearby Properties */}
//         <div className="mt-12 pt-12 border-t border-gray-200">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl sm:text-3xl font-serif">Nearby Properties</h2>
//             <div className="flex gap-2">
//               <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {nearbyProperties.map((property, idx) => (
//               <div key={idx} className="group cursor-pointer">
//                 <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
//                   <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                   <div className="absolute top-3 right-3 flex gap-2">
//                     <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
//                       <Heart className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
//                       <Share2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-1">Price available upon request</p>
//                 <p className="text-sm font-medium mb-1">{property.beds} Beds · {property.baths} Baths · {property.sqft}</p>
//                 <h3 className="text-sm font-semibold">{property.title}</h3>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Related Stories */}
//         <div className="mt-12 pt-12 border-t border-gray-200">
//           <h2 className="text-2xl sm:text-3xl font-serif mb-6">Related Stories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {relatedStories.map((story, idx) => (
//               <div key={idx} className="group cursor-pointer">
//                 <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
//                   <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
//                 </div>
//                 <p className="text-xs font-semibold text-gray-600 mb-2">{story.category}</p>
//                 <h3 className="font-semibold group-hover:text-amber-600 transition">{story.title}</h3>
//                 <a href="#" className="text-sm text-amber-600 hover:underline mt-2 inline-block">Read More</a>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer Info */}
//         <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-600">
//           <p>
//             LUXURY VILLA RENTAL PALOMBAGGIA - PORTO VECCHIO is a Villa/Townhouse for sale and has 8 bedrooms, 8 full bathrooms. 
//             This Villa/Townhouse is listed on the Christie's International Real Estate website and is located at 69999 m² of interior space on a lot of 2.47 ac (69999 m²). 
//             <a href="#" className="text-amber-600 hover:underline ml-1">See all homes for sale in Porto-Vecchio, France.</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }












import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';

const LuxuryVillaPage = () => {
  const {id} = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: 'I am interested in 708 E Fork Road, Hailey, ID 83333',
    tourType: 'in-person',
    newsletter: false
  });

  const [showDetails, setShowDetails] = useState(false);

  const [images, setImages] = useState([]);
  const [propertyData, setPropertyData] = useState([]);

  // Modal state
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Google Maps URL
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    propertyData?.location || ""
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you shortly.');
  };

  const features = propertyData.features 
  ? propertyData.features.split(",") 
  : [];

  console.log('Property ID: ' + id);
  useEffect(() => {
    axiosClient.get(`/houses/${id}`)
    .then(({data}) => {
      setImages(data.data.images_url)
      setPropertyData(data.data);
      console.log('Fetched property data:', data);
      console.log(images);
    })
    .catch((error) => {
      console.error('Error fetching property data:', error);
    });
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 text-sm overflow-x-auto">
              <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Home</a>
              <span className="text-gray-400">›</span>
              <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Homes For Rent</a>
              <span className="text-gray-400">›</span>
              <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">ID</a>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">Hailey</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Image Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Image */}
          <div className="lg:col-span-2 relative group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <img 
                src={images[currentImageIndex]} 
                alt="Property main view" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Featured Listing
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-xs sm:text-sm">
                {currentImageIndex + 1} of {images.length} photos
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-4">
            {images.slice(1, 7).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setCurrentImageIndex(idx + 1)}
                className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img src={img} alt={`Property view ${idx + 2}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{propertyData.name}</h1>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">${Number(propertyData?.price).toLocaleString()} / Month</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Bedrooms</span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">{propertyData.bedrooms}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Bath className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Bathrooms</span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">{propertyData.bathrooms}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Square className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Sq Ft</span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">{propertyData.feets}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Square className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">Lot Size</span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">{propertyData.acres} ac</p>
              </div>
            </div>

            {/* Views Section */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4">VIEWS</h2>
              <div className="flex gap-2">

            <button
              onClick={() => setShowPhotosModal(true)}
              className="px-3 sm:px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4" />
              Photos
            </button>

            <button
              onClick={() => setShowMapModal(true)}
              className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
            >
              Map
            </button>


              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4">FEATURES</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="text-sm sm:text-base text-gray-700"
                    >
                      {feature.trim()}
                    </div>
                  ))}
                </div>
              </div>
              {/* <button className="text-gray-600 underline mt-4 text-sm">View All</button> */}
            </div>

            {/* Description */}
            <div className="mb-8 pb-8 border-b">
              <h2 className="text-lg sm:text-xl font-bold mb-4">DESCRIPTION</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                {propertyData.description}
              </p>
              <button  onClick={() => setShowDetails(!showDetails)} className="text-gray-600 underline text-sm"> {showDetails ? "Read Less" : "Read More"}</button>
               {/* Hidden Details Section */}
                {showDetails && (
                  <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed space-y-2">
                    
                    <div>
                      <span className="font-semibold">Location:</span> {propertyData.location}
                    </div>

                    <div>
                      <span className="font-semibold">Status:</span> {propertyData.status}
                    </div>

                    <div>
                      <span className="font-semibold">Property Type:</span> {propertyData.listing_type}
                    </div>

                    <div>
                      <span className="font-semibold">Listing Reference:</span> {propertyData.listing_reference}
                    </div>

                    <div>
                      <span className="font-semibold">MLS / Provider Listing ID:</span> {propertyData.provider}
                    </div>

                  </div>
                  )}
            </div>

            {/* Map */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-4">MAP</h2>
              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video">
                <iframe
                  // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.234567890123!2d-114.3157!3d43.5087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMwJzMxLjMiTiAxMTTCsDE4JzU2LjUiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  src = {mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Related Stories */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Stories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "One Home and No Longer: 6 Open-Plan Living Spaces That Redefine Comfort",
                    category: "HOME TOURS",
                    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop"
                  },
                  {
                    title: "Splash in Style: 4 Private Indoor Pools",
                    category: "HOME TOURS",
                    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop"
                  },
                  {
                    title: "Property Insights: What Does $15 Million Buy Around the World?",
                    category: "HOME TOURS",
                    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&h=300&fit=crop"
                  }
                ].map((story, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{story.category}</p>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-gray-600">{story.title}</h3>
                    <button className="text-xs sm:text-sm underline mt-2">Read More</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Agents */}
              <div className="bg-white border rounded-lg p-4 sm:p-6">
                <div className="mb-6">
                  <img 
                    src={propertyData.agent_image_url}
                    alt={propertyData.agent_name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3"
                  />
                  <h3 className="font-bold text-base sm:text-lg">{propertyData.agent_name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">{propertyData.agent_license} (ID)</p>
                  <div className="flex gap-2">
                    <a href={`tel:${propertyData?.agent_phone}`} className="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-xs sm:text-sm">
                      📞 Call
                    </a>
                    <a href = {`mailto:${propertyData?.agent_email}`} className="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-50 text-xs sm:text-sm">
                      ✉️ Email
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex flex-col items-center gap-4">
                  <div className="text-gray-600 text-sm font-semibold">PureWest</div>
                  <div className="text-gray-600 text-sm font-semibold">Christie's International Real Estate</div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 border rounded-lg p-4 sm:p-6">
                <h3 className="font-bold text-base sm:text-lg mb-4">REQUEST INFORMATION</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone with Country Code"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />

                  <div>
                    <h4 className="font-bold text-sm sm:text-base mb-3">SCHEDULE A PROPERTY TOUR</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tourType"
                          value="in-person"
                          checked={formData.tourType === 'in-person'}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm">In Person or On Site Tour</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tourType"
                          value="virtual"
                          checked={formData.tourType === 'virtual'}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm">Virtual Online Tour</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm sm:text-base mb-3">SIGN UP FOR THE NEWSLETTER</h4>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-1"
                      />
                      <span className="text-xs sm:text-sm">Sign Up for Newsletter</span>
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Submit
                  </button>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    By clicking 'Submit' I agree to the Privacy Policy and Terms of Service, and consent for Christie's International Real Estate, its franchisees, affiliates and/or agents to call, text or email me about my inquiry using contact information I provided including via automated telephone dialing system and/or artificial or prerecorded voice, and such consent is not a condition of any potential purchase. Standard data and message rates may apply. You may unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm">{propertyData.name} is a {propertyData.listing_type} for rent and has {propertyData.bedrooms} bedrooms, {propertyData.bathrooms} full bathrooms and built in {propertyData.location}. This {propertyData.listing_type} is listed on the Christie's International Real Estate website and it boasts {propertyData.feets} ft² of interior space on a lot of {propertyData.acres} ac.</p>
        </div>
      </footer>

      {/* PHOTOS AND MAP MODALS */}
      {showPhotosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Photos</h3>
              <button onClick={() => setShowPhotosModal(false)}>✖</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {propertyData?.images_url?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Property ${index}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Location</h3>
              <button onClick={() => setShowMapModal(false)}>✖</button>
            </div>

            <iframe
              src={mapUrl}
              className="w-full h-72 rounded-lg"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}


    </div>
  );
};

export default LuxuryVillaPage;











