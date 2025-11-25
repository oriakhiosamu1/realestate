import React, { useState } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// --- Shared Components ---

const SubscriptionFooter = () => (
  <>
    {/* Email Subscription Box */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 text-center md:text-left">
        Get luxury real estate updates in your inbox
      </h2>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 max-w-lg mx-auto md:mx-0">
        <input 
          type="email" 
          placeholder="Email Address*" 
          className="flex-grow w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
        />
        <button className="w-full md:w-auto px-6 py-3 bg-amber-700 text-white font-medium rounded-lg shadow-md hover:bg-amber-800 transition duration-150 text-sm">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center md:text-left">
        This site is protected by reCAPTCHA and the Google Privacy Notice and Terms of Service apply.
      </p>
    </div>

    {/* Dark Footer Section */}
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo and Mission */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl md:text-2xl font-bold font-serif text-white">CHRISTIES</h3>
            <p className="text-xs md:text-sm text-gray-400">
              INTERNATIONAL REAL ESTATE
            </p>
            <p className="text-sm text-gray-400">
              Your connection to the finest homes and experiences no matter the destination or lifestyle.
            </p>
            <h4 className="text-base md:text-lg font-semibold pt-4">NEVER MISS A MOMENT OF LUXURY</h4>
            
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'pinterest'].map(icon => (
                <a key={icon} href="#" className="p-2 border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-white transition duration-150">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.172-1.172m2.684-2.684l1.172-1.172a4 4 0 105.656 5.656l-4 4a4 4 0 01-5.656 0m5.656-5.656h.01"></path></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Luxury Interior Image */}
          <div className="lg:col-span-4 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80" 
              alt="Luxury Interior" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Links and Copyright */}
          <div className="lg:col-span-12 mt-4 md:mt-8 border-t border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400 mb-4">
              {['About Us', 'Affiliate Login', 'Corporate Directory', 'News', 'Legal', 'Contact Us', 'Site Map'].map(link => (
                <a key={link} href="#" className="hover:text-white transition duration-150 py-1">
                  {link}
                </a>
              ))}
            </div>

            <div className="text-center text-xs text-gray-500 space-y-2">
              <p>
                This site is provided by eCRPTCards and the Google Privacy Notice and Terms of Service apply.
              </p>
              <p>
                © 1999 - 2025 Christies International Real Estate. All rights reserved. Each office is independently owned and operated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </>
);

// --- SellPage Specific Content Components ---

const SellHero = () => (
  <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
    <div className="absolute inset-0 bg-gray-900">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        alt="Luxury Estate Exterior"
        className="w-full h-full object-cover opacity-70"
      />
    </div>

    <div className="relative flex items-center justify-center h-full p-4">
      <div className="bg-white bg-opacity-90 p-6 sm:p-10 md:p-12 max-w-sm sm:max-w-md lg:max-w-xl text-center shadow-2xl rounded-lg backdrop-blur-sm">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 tracking-widest">WHO YOU WORK WITH MATTERS</h3>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6">Sell With Us</h1>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          In the luxury real estate market, a globally recognized brand matters. 
          Connections matter. Experience, discretion, and results matter. That is 
          why the most discerning luxury homeowners choose Christies 
          International Real Estate to showcase an unrivaled collection of properties.
        </p>
      </div>
    </div>
  </div>
);

const BrandMattersSection = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      <div className="relative h-72 md:h-96 overflow-hidden rounded-xl shadow-lg order-last lg:order-first">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
          alt="Luxury Building Exterior"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-light text-gray-800">Brand Matters</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Through our affiliation with Christies—a name synonymous with luxury for 
          centuries—the Christies International Real Estate brand instantly enhances 
          the desirability of the properties we market and sell.
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Our unparalleled global network and prestigious reputation create exceptional 
          value for every property we represent, attracting the world's most discerning buyers.
        </p>
        <button className="text-sm md:text-base text-amber-700 font-medium hover:text-amber-800 transition pt-2 underline">
          Read More about Brand Value →
        </button>
      </div>
    </div>
  </div>
);

const FindAnExpertSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative py-16 md:py-24 bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gray-700">
          <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
              alt="Modern Office Interior"
              className="w-full h-full object-cover opacity-30"
          />
      </div>

      <div className="relative max-w-sm sm:max-w-md mx-auto p-8 md:p-10 bg-white/80 shadow-2xl rounded-lg text-center backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">Find an Expert in Your Market</h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          Contact us to value your property and to learn more about the unparalleled 
          luxury real estate services we offer.
        </p>
        
        <div className="space-y-4">
          <button onClick={() => navigate("/agents")} className="w-full py-3 bg-amber-700 text-white font-medium rounded-lg shadow-md hover:bg-amber-800 transition duration-150 text-sm flex items-center justify-center">
            Find Your Agent
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
          <button className="w-full py-3 bg-white text-amber-700 border border-amber-700 font-medium rounded-lg shadow-md hover:bg-gray-100 transition duration-150 text-sm flex items-center justify-center">
            Contact Your Local Office
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  )
};

// --- Contact Modal Component ---

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    interest: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    newsletter: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-70 flex items-center justify-center p-4" onClick={onClose}>
      
      <div 
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-xl shadow-2xl overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-2xl font-light text-gray-900">Contact Us</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition p-2 rounded-full hover:bg-gray-50">
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          <h3 className="text-base font-medium uppercase tracking-wider text-gray-700 pt-2">
            WHAT ARE YOU INTERESTED IN?
          </h3>

          <div className="relative">
            <select 
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm appearance-none bg-white"
            >
              <option value="">Select primary interest*</option>
              <option value="selling">Selling a Property</option>
              <option value="buying">Buying a Property</option>
              <option value="general">General Inquiry</option>
              <option value="careers">Careers</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <input 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name*" 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
          />
          <input 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name*" 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*" 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
          />
          
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone with Country Code" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm"
          />
          
          <div className="relative">
            <select 
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm appearance-none bg-white"
            >
              <option value="">Country*</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="fr">France</option>
              <option value="it">Italy</option>
              <option value="es">Spain</option>
              <option value="de">Germany</option>
              <option value="ae">United Arab Emirates</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message*" 
            required 
            rows="4" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-700 focus:border-amber-700 text-sm resize-none"
          ></textarea>

          <label className="flex items-start space-x-3 text-sm pt-2">
            <input 
              type="checkbox" 
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-amber-700 border-gray-300 rounded focus:ring-amber-700"
            />
            <span>Sign Up for Newsletter</span>
          </label>
          
          <p className="text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google <a href="#" className="underline hover:text-amber-700">Privacy Notice</a> and <a href="#" className="underline hover:text-amber-700">Terms of Service</a> apply.
          </p>

          <button 
            onClick={handleSubmit}
            className="w-full py-3 bg-amber-700 text-white font-medium rounded-lg shadow-lg hover:bg-amber-800 transition duration-150 text-base mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Sell Page Component ---

const SellPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SellHero />
      <BrandMattersSection />
      <FindAnExpertSection />
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default SellPage;