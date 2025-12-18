import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';
import Errors from '../components/Errors.jsx';

// Input component
const FormInput = ({ label, type = 'text', handleChange, name, value }) => (
  <div className="mb-4">
    <label htmlFor={label} className="text-sm font-semibold text-gray-800 sr-only">{label}</label>
    <input
      type={type}
      id={label}
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
    />
  </div>
);

// Right panel with benefits/info
const InfoPanel = () => (
  <div className="bg-white rounded-lg shadow-2xl relative overflow-hidden h-full min-h-[500px]">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80')`,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0"></div>
    
    <div className="relative z-10 text-white p-8 h-full flex flex-col justify-end">
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-2xl font-serif mb-6 text-center">Why Contact Us?</h2>
        <p className="text-sm text-gray-200 leading-relaxed mb-3">
          We’re here to help with inquiries, feedback, or support. Fill out the form and we’ll get back to you as soon as possible.
        </p>
        <p className="text-sm text-gray-200 leading-relaxed">
          Our team values your input and ensures a prompt response to all messages.
        </p>
      </div>
    </div>
  </div>
);

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess('');

    axiosClient.post('/contact', formData)
      .then(({ data }) => {
        setLoading(false);
        setSuccess('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        const responseErrors = error.response;
        const msg = responseErrors?.data?.message || "Something went wrong";
        setErrors({ general: [msg] });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left panel - Contact form */}
          <div className="lg:order-1 order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              <h2 className="text-2xl font-light text-gray-800 mb-8 text-center lg:text-left">
                Contact Us
              </h2>

              {success && (
                <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
                  {success}
                </div>
              )}

              {Object.keys(errors).length > 0 && <Errors errors={errors} />}

              <form onSubmit={handleSubmit}>
                <FormInput label="Name*" handleChange={handleChange} name="name" value={formData.name} />
                <FormInput label="Email*" type="email" handleChange={handleChange} name="email" value={formData.email} />
                
                <div className="mb-4">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message*"
                    className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm resize-none h-32"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 uppercase text-sm tracking-widest"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Right panel - Info */}
          <div className="lg:order-2 order-1 min-h-[400px]">
            <InfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUsPage;
