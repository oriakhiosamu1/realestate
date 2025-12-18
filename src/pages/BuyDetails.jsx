import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';
import ContactForm from '../components/ContactForm';
import axios from 'axios';
import RelatedStories from '../components/RelatedStories';

const PropertyListingPage = () => {
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

    axiosClient.post('/user/request-property-information', formData)
    .then(({data}) => {
      console.log('Form submission response:', data);
      alert('Thank you for your interest! We will contact you shortly.');
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    });
    
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

  const handleShare = async () => {
    const shareData = {
      title: propertyData?.title || 'Property Listing',
      text: `Check out this property: ${propertyData?.title} at ${propertyData?.location}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 text-sm overflow-x-auto">
              <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Home</a>
              <span className="text-gray-400">›</span>
              <a href="#" className="text-gray-600 hover:text-gray-900 whitespace-nowrap">Homes For Sale</a>
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
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">${Number(propertyData?.price).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-lg hover:bg-gray-50">
                  <Heart className="w-5 h-5" />
                </button>
                <button onClick={handleShare} className="p-2 border rounded-lg hover:bg-gray-50">
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
            <RelatedStories />
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
              <ContactForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm">{propertyData.name} is a {propertyData.listing_type} for sale and has {propertyData.bedrooms} bedrooms, {propertyData.bathrooms} full bathrooms and built in {propertyData.location}. This {propertyData.listing_type} is listed on the Christie's International Real Estate website and it boasts {propertyData.feets} ft² of interior space on a lot of {propertyData.acres} ac.</p>
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
}

export default PropertyListingPage;











