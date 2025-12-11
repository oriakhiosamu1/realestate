import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, MapPin, User, Menu, Heart, 
  X, ArrowRight, Instagram, Facebook, Linkedin 
} from 'lucide-react';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Buy from './pages/buy';
import Sell from './pages/sell';
import Rent from './pages/rent';
import RealEstateBlog from './pages/blog';
import Admin from './pages/admin';
import Dashboard from './pages/dashboard';
import Agents from "./pages/agents";
import CompanyWallet from "./pages/CompanyWallet";
import Login from './pages/login'
import { useStateContext } from './context/ContextProvider';
import axiosClient from './axiosClient/axiosClient';
import AdminApp from './pages/admin/AdminApp';
import OfficesPage from './pages/offices';
import ForgetPassword from './pages/ForgetPassword.jsx';
import BuyDetails from '../../../../../../Downloads/Estate website (1)/Estate website/src/pages/BuyDetails.jsx';
import RentPropertyDetail from '../../../../../../Downloads/Estate website (1)/Estate website/src/pages/RentPropertyDetail.jsx';
import PropertyListingPage from './pages/BuyDetails.jsx';
import LuxuryVillaPage from './pages/RentPropertyDetail.jsx';


// --- Global Constants ---
const GOLD_BUTTON_CLASSES = `bg-yellow-800 text-white font-semibold py-1.5 px-3 xs:py-2 xs:px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 hover:bg-yellow-900 transition duration-300 rounded-lg shadow-md flex items-center justify-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm md:text-base`;
const NAV_ITEMS = [
  { name: 'Buy', path: '/buy' },
  { name: 'Rent', path: '/rent' },
  { name: 'Sell', path: '/sell' },
  { name: 'Blog', path: '/blog'},
  { name: 'Agents & Offices', path: '/agents' },
  { name: 'Login', path: '/login' },
];

const NAV_ITEMS_AUTH = [
  { name: 'Buy', path: '/buy' },
  { name: 'Rent', path: '/rent' },
  { name: 'Sell', path: '/sell' },
  { name: 'Blog', path: '/blog'},
  { name: 'Agents & Offices', path: '/agents' },
];


const SOCIAL_LINKS = [
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: X, href: '#', label: 'X (formerly Twitter)' }, 
];

const FOOTER_NAV_LINKS = [
  'About Us', 'Affiliate Login', 'Corporate Directory', 'News', 'Legal', 'Contact Us', 'Site Map'
];

// --- Mock Property Data ---
const MOCK_PROPERTIES = [
 { id: 1, price: '19,248,715', location: 'Apartment in Jardin Exotique, Monaco', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' },
  { id: 2, price: '4,300,000', location: 'Multi Unit in Manhattan, NY', imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' },
  { id: 3, price: 'Price upon request', location: 'Estate in Saarland, Germany', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop' },
  { id: 4, price: '1,463,000', location: 'Condo in Miami, FL', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop' },
  { id: 5, price: '5,100,000', location: 'Villa in Tuscany, Italy', imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop' },
  { id: 6, price: '995,000', location: 'Historic Home, London, UK', imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop' },
  { id: 7, price: '2,800,000', location: 'Chalet in Aspen, CO', imageUrl: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop' },
  { id: 8, price: '7,500,000', location: 'Penthouse, Dubai, UAE', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop' },
];

// --- Reusable Component: PropertyCard ---
const PropertyCard = ({ property, onClick }) => (
  <div 
    onClick={() => onClick(property)} 
    role="button"
    tabIndex="0" 
    onKeyDown={(e) => { 
      if (e.key === 'Enter' || e.key === ' ') { 
        onClick(property); 
      }
    }}
    className="text-left bg-white shadow-lg overflow-hidden transition duration-300 hover:shadow-xl rounded-lg flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] md:w-[320px] cursor-pointer"
  >
    <div className="relative">
      <img src={property.imageUrl} alt={property.location} className="w-full h-40 xs:h-44 sm:h-48 md:h-56 object-cover" />
      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          console.log('Added to favorites:', property.id); 
        }} 
        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md text-gray-700 hover:text-red-500 transition" 
        aria-label="Add to Favorites"
      >
        <Heart size={14} className="xs:w-4 xs:h-4" fill="currentColor" />
      </button>
    </div>
    <div className="p-2.5 xs:p-3 sm:p-4">
      <p className="text-sm xs:text-base sm:text-lg font-light text-gray-900 mb-1 leading-snug">
        ${property.price}
      </p>
      <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 truncate">{property.location}</p>
    </div>
  </div>
);

// --- Component: Header ---
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const {token, setToken, setUser} = useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    axiosClient.post('/logout')
    .then(() => {
      setToken(null);
      setUser({});
      setIsLoading(false);
      localStorage.removeItem("hasSeenWelcome");
      navigate('/login');
    })
    .catch((error) => {
      console.error('Logout error:', error);
      setIsLoading(false);
    });
  }
  
  return (
    <header className="sticky top-0 w-full bg-white bg-opacity-95 shadow-md z-50 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="flex justify-end items-center py-1 px-2 xs:px-3 sm:px-4 md:px-8 text-[9px] xs:text-[10px] sm:text-xs bg-gray-50 border-b border-gray-100">
        {
          token ?
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 mx-1 xs:mx-2 sm:mx-3">{isLoading ? 'Logging Out...' : 'Logout'}</button> :
          <Link to="/login" className="text-gray-500 hover:text-gray-900 mx-1 xs:mx-2 sm:mx-3">Login</Link>
        }
        <span className="text-gray-300">|</span>
        <button className="text-gray-500 hover:text-gray-900 mx-1 xs:mx-2 sm:mx-3">Preferences</button>
      </div>

      {/* Main Navigation */}
      <div className="flex justify-between items-center h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24 px-2 xs:px-3 sm:px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo (Home Link) */}
        <Link to="/" className="cursor-pointer flex-shrink-0">
          <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-serif tracking-wide text-gray-900">CHRISTIES</h1>
          <p className="text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] tracking-widest text-gray-600">INTERNATIONAL REAL ESTATE</p>
        </Link>

        {/* Navigation Links (Desktop ONLY) */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6 text-xs xl:text-sm font-medium tracking-wide">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`pb-1 transition duration-200 text-gray-600 hover:text-gray-900 whitespace-nowrap`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => console.log('Contact Us')}
            className={GOLD_BUTTON_CLASSES.replace('rounded-lg', 'rounded')} 
          >
            Contact Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:hidden">
          <button
            onClick={() => console.log('Contact Us Mobile')}
            className={`py-1 px-2 xs:py-1.5 xs:px-2.5 sm:py-2 sm:px-4 bg-yellow-800 text-white rounded text-[9px] xs:text-[10px] sm:text-xs whitespace-nowrap`}
          >
            Contact
          </button>
          <button 
            className="text-gray-700 p-0.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={18} className="xs:w-5 xs:h-5" /> : <Menu size={18} className="xs:w-5 xs:h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 py-2 xs:py-3' : 'max-h-0 opacity-0'}`}
      >
        <nav className="flex flex-col space-y-1 px-2 xs:px-3 sm:px-4 pb-2 xs:pb-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left py-1.5 px-2 xs:py-2 xs:px-3 text-xs xs:text-sm sm:text-base font-medium transition duration-200 rounded-lg 
                text-gray-700 hover:bg-gray-100`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

// --- Section 1: Hero Section (Image Slider) ---
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
      title: 'Find Your Luxury Home'
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
      title: 'Discover Elite Properties'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
      title: 'Experience Luxury Living'
    }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[45vh] xs:h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[350px] xs:min-h-[400px] sm:min-h-[500px] w-full flex items-center justify-center text-white pt-12 xs:pt-14 sm:pt-16 md:pt-20 overflow-hidden">
      {/* Image Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image.url}')`
          }}
        />
      ))}

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 text-center space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 px-3 xs:px-4 w-full max-w-6xl mx-auto">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light tracking-tight drop-shadow-2xl">
          {heroImages[currentSlide].title}
        </h2>

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-2xl p-1 xs:p-1.5 sm:p-2 max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex items-center border border-gray-200">
          <input
            type="text"
            placeholder="Search Location or Agent"
            className="flex-grow pl-3 pr-1 py-1.5 xs:py-2 text-gray-900 focus:outline-none placeholder-gray-500 text-[10px] xs:text-xs sm:text-sm w-full"
          />
          <button className="p-1 xs:p-1.5 rounded-full text-gray-700 hover:text-yellow-800 transition flex-shrink-0" aria-label="Search">
            <Search size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Slider Navigation Dots */}
      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1 xs:space-x-1.5 sm:space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-4 xs:w-5 sm:w-6' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 right-2 xs:right-3 sm:right-4 md:right-6 z-20 text-white text-[9px] xs:text-[10px] sm:text-xs">
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium tracking-wider uppercase bg-black bg-opacity-40 rounded-full px-1.5 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
          {currentSlide + 1} / {heroImages.length}
        </span>
      </div>
    </div>
  );
};

// --- Section 2: Global Network (Side-by-Side Design) ---
const GlobalNetworkSection = () => (
  <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16">
    <div className="flex flex-col md:flex-row items-stretch md:gap-4 lg:gap-6 xl:gap-8">
      
      {/* Text Container (Left side) */}
      <div className="md:w-1/2 flex items-center justify-center relative p-4 xs:p-5 sm:p-6 md:p-8 bg-gray-50 md:bg-white rounded-lg md:rounded-none">
        <div className="w-full md:max-w-md">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-3 xs:mb-4 sm:mb-5">
            Our Global Network
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-light text-gray-700 leading-relaxed">
            Christie's International Real Estate provides tailored solutions and
            exceptional results for the world's most discerning luxury real estate
            clientele. Spanning six continents, our distinguished network encompasses
            the world's premier brokerage firms and the industry's most accomplished
            real estate professionals.
          </p>
        </div>
      </div>

      {/* Image Container (Right side) */}
      <div className="md:w-1/2 mt-4 xs:mt-5 sm:mt-6 md:mt-0 px-3 xs:px-4 md:px-0">
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <img
            src="https://christies-christies-prod.web.arc-cdn.net/resizer/v2/G6PIELYDLZAMZKTQT3IK3BMTHA.jpg?auth=7952fa7ce22b07550902b51fce63dc3438e3ff545a1f8badc33fb673bdf7023d&smart=true&width=1000&height=800"
            alt="Luxury Interior"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);


const MAGAZINE_SLIDES = [
    {
        id: 1,
        title: "2025 Global Luxury Real Estate Forecast",
        description: "Our annual forecast report identifies the key trends, challenges, and opportunities shaping the luxury property market worldwide. Download your exclusive copy.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        linkText: "Explore",
        linkUrl: "/forecast"
    },
    {
        id: 2,
        title: "The Art of Collecting: 5 Design Tips",
        description: "Discover how to seamlessly integrate fine art into your home. Tips from leading interior designers on lighting, placement, and conservation.",
        imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80",
        linkText: "Read Magazine",
        linkUrl: "/magazine-art"
    },
    {
        id: 3,
        title: "Iconic Estates: A Look at Historical Mansions",
        description: "Journey through time with a curated selection of properties that have played a significant role in history, now available on the market.",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        linkText: "View Estates",
        linkUrl: "/iconic-estates"
    }
];

const MagazineAndTrendingSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Navigation function for the carousel
    const navigateSlide = (direction) => {
        setCurrentSlide(prev => {
            if (direction === 'next') {
                return (prev + 1) % MAGAZINE_SLIDES.length;
            } else {
                return (prev - 1 + MAGAZINE_SLIDES.length) % MAGAZINE_SLIDES.length;
            }
        });
    };
    
    // Mock data for trending topics
    const trendingTopics = [
        { id: 1, category: 'HOME TOURS', title: 'Autumn Harvest: 4 Beautiful Vineyard Estates in Coveted Wine Regions' },
        { id: 2, category: 'HOME TOURS', title: 'Vertical Living: 4 Exceptional Townhouses in Vibrant Cityscapes' },
        { id: 3, category: 'HOME TOURS', title: 'Paradise Found: 5 Private Compounds in Resort Destinations' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16">
            {/* Magazine Feature: Brand Like No Other (CAROUSEL) */}
            <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                {/* Top Header and Controls */}
                <div className="flex justify-between items-center mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900">
                        Brand Like No Other
                    </h2>
                    {/* Navigation Arrows */}
                    <div className="flex gap-1 xs:gap-1.5 sm:gap-2 text-gray-500 text-base xs:text-lg sm:text-xl flex-shrink-0">
                        <button 
                            onClick={() => navigateSlide('prev')}
                            className="hover:text-gray-900 transition font-light p-0.5 xs:p-1"
                            aria-label="Previous Magazine Slide"
                        >
                            &lt;
                        </button>
                        <button 
                            onClick={() => navigateSlide('next')}
                            className="hover:text-gray-900 transition font-light p-0.5 xs:p-1"
                            aria-label="Next Magazine Slide"
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* Carousel Content */}
                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {MAGAZINE_SLIDES.map((item) => (
                            <div key={item.id} className="w-full flex-shrink-0">
                                <div className="flex flex-col sm:flex-row sm:gap-3 md:gap-4 lg:gap-6 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                                    
                                    <div className="sm:w-3/5">
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title} 
                                            className="w-full h-44 xs:h-48 sm:h-56 md:h-64 lg:h-80 object-cover" 
                                        />
                                    </div>
                                    
                                    <div className="sm:w-2/5 flex items-center p-4 xs:p-5 sm:p-6 md:p-8">
                                        <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5"> 
                                            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 leading-snug">
                                                {item.title}
                                            </h3>
                                            <p className="text-[10px] xs:text-xs sm:text-sm md:text-base font-light text-gray-700">
                                                {item.description}
                                            </p>
                                            <button 
                                                onClick={() => console.log('Navigate to:', item.linkUrl)}
                                                className={GOLD_BUTTON_CLASSES}
                                            >
                                                {item.linkText} <ArrowRight size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-6 xs:my-8 sm:my-10 md:my-12 border-gray-200" /> 

            {/* Trending Topics Section */}
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 mb-5 xs:mb-6 sm:mb-8 md:mb-10">
                Trending Topics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xs:gap-6 sm:gap-7 md:gap-8">
                {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex gap-2 xs:gap-2.5 sm:gap-3">
                        <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-gray-300 font-serif leading-none flex-shrink-0">
                            {topic.id}
                        </div>
                        <div className="pt-1 xs:pt-1.5 sm:pt-2">
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-semibold text-yellow-800 uppercase tracking-wider mb-0.5 xs:mb-1">{topic.category}</p>
                            <h4 className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-gray-900 mb-1 xs:mb-1.5 leading-snug">
                                {topic.title}
                            </h4>
                            <a href="#" className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-gray-700 hover:text-yellow-800 transition">
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Component: GalleryModal (for View All) ---
const GalleryModal = ({ properties, onClose, selectedPropertyId, setSelectedPropertyId }) => {
  const selectedProperty = useMemo(() => properties.find(p => p.id === selectedPropertyId), [properties, selectedPropertyId]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-2 xs:p-3">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative mx-2">
        
        {/* Header */}
        <div className="sticky top-0 bg-white p-2.5 xs:p-3 sm:p-4 md:p-6 border-b flex justify-between items-center z-10">
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-gray-900 pr-2 xs:pr-3 line-clamp-2">
            {selectedProperty ? selectedProperty.location : 'All Featured Properties'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition flex-shrink-0"
            aria-label="Close Modal"
          >
            <X size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-2.5 xs:p-3 sm:p-4 md:p-6">
          {selectedProperty ? (
            // Single Property View
            <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
              <img 
                src={selectedProperty.imageUrl} 
                alt={selectedProperty.location} 
                className="w-full h-auto max-h-[35vh] xs:max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] object-cover rounded-lg shadow-lg"
              />
              <div className="text-center">
                <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-light text-gray-900 mb-0.5 xs:mb-1">
                  Listing Price: ${selectedProperty.price}
                </p>
                <p className="text-xs xs:text-sm sm:text-base text-gray-600">
                  {selectedProperty.location}
                </p>
              </div>
              <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700 leading-relaxed pt-2 xs:pt-3 border-t">
                This exclusive property, located in the prestigious area of {selectedProperty.location.split(',')[0]}, represents the pinnacle of luxury living. With unparalleled views and world-class amenities, this residence offers privacy and elegance for the most discerning buyer. Contact us for a private viewing.
              </p>
            </div>
          ) : (
            // Gallery View
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-4 md:gap-6">
              {properties.map((property) => (
                <div 
                  key={property.id} 
                  className="bg-white shadow-lg overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedPropertyId(property.id)}
                  role="button"
                  tabIndex="0"
                >
                  <img src={property.imageUrl} alt={property.location} className="w-full h-36 xs:h-40 sm:h-44 md:h-48 object-cover" />
                  <div className="p-2 xs:p-2.5 sm:p-3">
                    <p className="text-xs xs:text-sm sm:text-base font-light text-gray-900 mb-0.5 xs:mb-1 leading-snug">
                      ${property.price}
                    </p>
                    <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 truncate">{property.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- Section 3: Featured Properties (Horizontal Scroll Carousel) ---
const FeaturedPropertiesSection = () => {
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null); 

  const openModal = (property = null) => {
    setSelectedPropertyId(property ? property.id : null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPropertyId(null);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250; 
      if (direction === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  useEffect(() => {
    const carouselContainer = scrollRef.current;
    if (!carouselContainer) return;

    const intervalId = setInterval(() => {
      const currentScroll = carouselContainer.scrollLeft;
      const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;
      const scrollAmount = 250; 

      if (currentScroll + scrollAmount >= maxScroll) {
        carouselContainer.scrollLeft = 0;
      } else {
        carouselContainer.scrollLeft += scrollAmount;
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-3 xs:mb-4 sm:mb-5 md:mb-6 gap-2 xs:gap-3">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900">
          Featured Properties
        </h2>
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
          <button 
            onClick={() => openModal()}
            className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-700 hover:text-yellow-800 font-medium tracking-wider transition"
          >
            View All
          </button>
          <div className="flex gap-1 xs:gap-1.5 hidden sm:flex">
            <button 
              onClick={() => scroll('left')}
              className="p-1.5 xs:p-2 border border-gray-300 text-gray-600 hover:border-gray-900 transition rounded-full shadow-sm"
              aria-label="Scroll left"
            >
              &lt;
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-1.5 xs:p-2 border border-gray-300 text-gray-600 hover:border-gray-900 transition rounded-full shadow-sm"
              aria-label="Scroll right"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef} 
        className="flex gap-2.5 xs:gap-3 sm:gap-4 overflow-x-scroll pb-3 hide-scrollbar snap-x snap-mandatory w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {MOCK_PROPERTIES.map((property) => (
          <div key={property.id} className="snap-start">
            <PropertyCard property={property} onClick={openModal} />
          </div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      
      {isModalOpen && (
        <GalleryModal 
          properties={MOCK_PROPERTIES} 
          onClose={closeModal} 
          selectedPropertyId={selectedPropertyId}
          setSelectedPropertyId={setSelectedPropertyId}
        />
      )}
    </div>
  );
};

// --- Section 5: Real Estate Investment ---
const RealEstateInvestmentSection = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white py-6 xs:py-8 sm:py-10 md:py-16 lg:py-24 border-t border-b border-gray-100 relative">
      {/* --- Section Heading --- */}
      <h1 className="text-center text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 tracking-wide px-3">
        Real Estate Investment
      </h1>

      {/* --- Main Section --- */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-stretch bg-gray-50 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden">
          {/* Left Image */}
          <div className="md:w-1/2 p-2 xs:p-2.5 sm:p-3 md:p-6">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
              alt="Global Investment Portfolio"
              className="w-full h-40 xs:h-44 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 p-4 xs:p-5 sm:p-6 md:p-8 space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-4 flex flex-col justify-center">
            <p className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-semibold text-gray-600 uppercase tracking-widest">
              ELEVATING PORTFOLIOS
            </p>
            <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 leading-tight">
              Strategic Wealth: Investing in Global Luxury Assets
            </h2>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 font-light leading-relaxed">
              Move beyond traditional investments. Our private client team
              specializes in identifying and securing prime, off-market real
              estate assets worldwide. Discover how our exclusive network and
              expert insights can strengthen and expand your financial
              portfolio.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className={GOLD_BUTTON_CLASSES}
            >
              Invest With Us Now <ArrowRight size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Modal Section --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-3 xs:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 max-w-[320px] xs:max-w-sm sm:max-w-md w-full relative animate-fadeIn border border-gray-100 mx-3">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 xs:top-2.5 xs:right-2.5 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
            </button>

            {/* Modal Content */}
            <h3 style={{ color: '#7D4710' }} className="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 mb-2 xs:mb-2.5 sm:mb-3 text-center pr-6 xs:pr-7">
              Explore Exclusive Investment Opportunities
            </h3>

            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700 mb-3 xs:mb-3.5 sm:mb-4 text-center leading-relaxed">
              Unlock access to handpicked real estate assets in thriving
              locations across the globe. Our investment advisors provide
              tailored guidance, ensuring your investments align with your
              growth vision. From luxury estates to high-return properties, your
              journey toward strategic wealth begins here.
            </p>

            <div className="border-t border-gray-200 my-2 xs:my-2.5 sm:my-3"></div>

            {/* Buttons */}
            <div className="flex flex-col xs:flex-row justify-center gap-2 xs:gap-2.5 sm:gap-3 pt-1 xs:pt-1.5">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium text-[10px] xs:text-xs sm:text-sm"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/agents")}
                style={{ backgroundColor: '#7D4710' }}
                className="px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-[10px] xs:text-xs sm:text-sm"
              >
                Continue to Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- FOOTER COMPONENTS ---
const SubscriptionBanner = () => {
    return (
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 pt-6 xs:pt-8 sm:pt-10 md:pt-12 lg:pt-16 pb-5 xs:pb-6 sm:pb-8 md:pb-10 lg:pb-12 text-center">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6 font-light px-2 xs:px-3">
                Get luxury real estate updates in your inbox
            </h2>
            <div className="flex flex-col xs:flex-row max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-lg mx-auto overflow-hidden border border-gray-300 rounded-lg">
                <input
                    type="email"
                    placeholder="Email Address*"
                    className="flex-grow p-2 xs:p-2.5 sm:p-3 text-xs xs:text-sm sm:text-base text-gray-900 focus:outline-none placeholder-gray-500 border-none w-full"
                    aria-label="Email Address for Subscription"
                />
                <button
                    className="bg-yellow-800 text-white font-semibold text-xs xs:text-sm sm:text-base py-2 xs:py-2.5 sm:py-3 px-4 xs:px-5 sm:px-6 hover:bg-yellow-900 transition duration-300 flex-shrink-0"
                    onClick={() => console.log('Subscribed!')}
                >
                    Subscribe
                </button>
            </div>
            <p className="text-[8px] xs:text-[9px] sm:text-[10px] text-gray-500 mt-2 xs:mt-2.5 sm:mt-3 text-left px-2 xs:px-0 max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="#" className="underline hover:text-gray-700">Privacy Notice</a> and{' '}
                <a href="#" className="underline hover:text-gray-700">Terms of Service</a> apply.
            </p>
        </div>
    );
};

const DarkFooter = () => (
    <footer className="bg-[#0a0a0a] text-gray-300 mt-0">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-5 xs:py-6 sm:py-8 md:py-10 lg:py-12">
            
            <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-12">
                
                {/* Left Content Section */}
                <div className="lg:w-1/2 space-y-3 xs:space-y-4 sm:space-y-5 mb-6 xs:mb-7 sm:mb-8 lg:mb-0">
                    <div className="text-white">
                        <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-serif tracking-wide mb-0.5 xs:mb-1">CHRISTIE'S</h1>
                        <p className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] font-normal text-gray-400">INTERNATIONAL REAL ESTATE</p>
                    </div>
                    
                    <p className="text-[10px] xs:text-xs sm:text-sm font-light leading-relaxed max-w-md text-gray-400">
                        Your connection to the finest homes and experiences no matter the destination or lifestyle. Discover extraordinary properties around the world.
                    </p>
                    
                    <div className="pt-1 xs:pt-1.5 sm:pt-2">
                        <h3 className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-white tracking-[0.2em] uppercase mb-2 xs:mb-2.5 sm:mb-3">
                            Connect With Us
                        </h3>

                        <div className="flex gap-2 xs:gap-2.5 sm:gap-3">
                            {SOCIAL_LINKS.map((link, index) => (
                                <a 
                                    key={index} 
                                    href={link.href} 
                                    aria-label={link.label || link.icon.name}
                                    className="bg-gray-800 text-gray-400 p-1.5 xs:p-2 sm:p-2.5 rounded-full hover:bg-yellow-800 hover:text-white transition duration-300 transform hover:scale-110"
                                >
                                    <link.icon size={12} className="xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="pt-2 xs:pt-3 sm:pt-4 space-y-1.5 xs:space-y-2">
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400">
                            <p className="font-semibold text-white mb-0.5">Global Headquarters</p>
                            <p>20 Rockefeller Plaza</p>
                            <p>New York, NY 10020</p>
                        </div>
                        <div className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400">
                            <p className="font-semibold text-white mb-0.5">Contact</p>
                            <p>Phone: +1 (212) 636-2000</p>
                            <p>Email: info@christiesrealestate.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end items-start">
                    <div className="relative w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl group">
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
                            alt="Luxury Interior Lounge"
                            className="w-full h-44 xs:h-48 sm:h-52 md:h-56 lg:h-64 xl:h-80 object-cover transform group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 text-white">
                            <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mb-0.5 xs:mb-1 text-yellow-400">Featured Space</p>
                            <h4 className="text-sm xs:text-base sm:text-lg md:text-xl font-serif mb-0.5">Modern Luxury Living</h4>
                            <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-300">Where elegance meets comfort</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="border-gray-800 my-4 xs:my-5 sm:my-6 md:my-8" />

            {/* Footer Navigation */}
            <nav className="flex flex-wrap justify-start text-[8px] xs:text-[9px] sm:text-[10px] font-semibold uppercase mb-3 xs:mb-4 sm:mb-5 gap-x-2 xs:gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-1 xs:gap-y-1.5 sm:gap-y-2">
                {FOOTER_NAV_LINKS.map((link) => (
                    <a key={link} href="#" className="text-gray-500 hover:text-yellow-500 transition duration-200">
                        {link}
                    </a>
                ))}
            </nav>

            {/* Bottom Copyright Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-[8px] xs:text-[9px] sm:text-[10px] pt-3 xs:pt-4 border-t border-gray-800 gap-2 xs:gap-2.5 sm:gap-3">
                <span className="text-gray-500 text-center sm:text-left">
                    &copy; {new Date().getFullYear()} Christie's International Real Estate. All Rights Reserved.
                </span>
                <div className="flex flex-col xs:flex-row gap-1 xs:gap-2 sm:gap-3 text-gray-500 text-center">
                    <a href="#" className="hover:text-yellow-500 transition">Privacy Policy</a>
                    <span className="hidden xs:inline">|</span>
                    <a href="#" className="hover:text-yellow-500 transition">Terms of Service</a>
                    <span className="hidden xs:inline">|</span>
                    <span className="text-[7px] xs:text-[8px] sm:text-[9px]">Affiliate of Christie's Education</span>
                </div>
            </div>
        </div>
    </footer>
);


const LuxuryFooter = () => (
    <>
        <SubscriptionBanner />
        <DarkFooter />
    </>
);

const HomePageContent = () => (
  <>
    <HeroSection />
    <GlobalNetworkSection />
    <MagazineAndTrendingSection />
    <FeaturedPropertiesSection />
    <RealEstateInvestmentSection /> 
  </>
);

const App = () => {
  useEffect(() => {
    if (typeof tailwind === 'undefined' || !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.src = "https://cdn.tailwindcss.com";
      script.id = 'tailwind-cdn';
      document.head.appendChild(script);

      const fontLink = document.createElement('link');
      fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);

      script.onload = () => {
        if (window.tailwind) {
          window.tailwind.config = {
            theme: {
              extend: {
                colors: { primary: '#B8860B' },
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                  serif: ['Georgia', 'Times New Roman', 'serif'],
                },
                screens: {
                  'xs': '480px',
                },
              },
            },
          };
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Header />
      
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/blog" element={<RealEstateBlog />} />

        <Route path="/admin" element={<AdminApp />} />
        
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/offices" element={<OfficesPage />} />
        <Route path="/wallet" element={<CompanyWallet />} />
        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route path="/rent/:id" element={<LuxuryVillaPage />} />
        <Route path="/buy/:id" element={<PropertyListingPage />} />

      </Routes>
      <LuxuryFooter />
    </div>
  );
};

export default App;