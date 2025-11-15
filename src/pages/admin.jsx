import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient/axiosClient';

// --- Configuration ---
const PRIMARY_COLOR = '#4A90E2';
const SECONDARY_COLOR = '#F9A825';
const FONT_FAMILY = 'Inter, sans-serif';

// Default placeholder images
const DEFAULT_HOUSE_IMAGE = 'https://placehold.co/300x200/e0e7ff/4A90E2?text=Property+Image';
const DEFAULT_AGENT_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80';
const DEFAULT_BLOG_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop';

// Empty templates
const EMPTY_HOUSE = { title: '', price: 0, beds: 0, baths: 0, sqft: 0, location: '', imageUrl: '' };
const EMPTY_AGENT = { 
  name: '', 
  email: '', 
  phone: '', 
  role: '', 
  location: '', 
  image: '' 
};
const EMPTY_BLOG = { 
  title: '', 
  excerpt: '', 
  content: '', 
  author: '', 
  category: 'Buying Tips', 
  image: DEFAULT_BLOG_IMAGE,
  location: 'General',
  readTime: '5 min read'
};

const BLOG_CATEGORIES = ['Buying Tips', 'Selling Tips', 'Market Insights', 'Investment', 'Financing', 'Luxury Homes'];

// --- Reusable Components ---
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4" style={{ borderColor: PRIMARY_COLOR }}></div>
    <p className="ml-4 text-gray-600 font-medium">Loading data...</p>
  </div>
);

const Header = ({ userId, setCurrentView }) => (
  <header className="w-full bg-white shadow-lg border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-gray-900 leading-none">
        <span className="text-gray-500">ADMIN</span> <span style={{ color: PRIMARY_COLOR }}>PORTAL</span>
      </h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          onClick={() => setCurrentView('dashboard')}
          className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-blue-600 transition duration-200 hidden sm:inline-block"
        >
          <i className="fas fa-chart-line mr-1"></i> Dashboard
        </button>
        <div className="text-xs text-gray-600 bg-gray-100 p-1.5 sm:p-2 rounded-full font-mono shadow-inner truncate max-w-[80px] sm:max-w-[120px]" title={`Admin ID: ${userId}`}>
          <span className="hidden sm:inline">ID: </span>{userId.substring(0, 6)}...
        </div>
      </div>
    </div>
  </header>
);

const AdminNav = ({ currentView, setCurrentView }) => {
  const navItems = [
    { key: 'dashboard', title: 'Dashboard', icon: 'fas fa-chart-line' },
    { key: 'houses', title: 'Properties', icon: 'fas fa-home' },
    { key: 'agents', title: 'Agents', icon: 'fas fa-user-tie' },
    { key: 'blogs', title: 'Blog Posts', icon: 'fas fa-blog' },
    { key: 'confirm-payments', title: 'Payments', icon: 'fas fa-receipt' },
    { key: 'payment-history', title: 'History', icon: 'fas fa-history' },
  ];

  return (
    <nav className="mb-4 sm:mb-8 p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-2 lg:gap-0">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setCurrentView(item.key)}
            className={`flex items-center justify-center lg:justify-start px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition duration-200 ${
              currentView === item.key 
                ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            <i className={`${item.icon} w-4 sm:w-5 mr-0 lg:mr-2 sm:lg:mr-3 text-sm sm:text-lg`}></i>
            <span className="hidden lg:inline">{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const ImageUploadField = ({ label, currentImage, onImageChange, placeholderText, previewClass }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size is too large (max 2MB)");
        onImageChange(null);
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => onImageChange(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const displayImage = currentImage && currentImage.startsWith('data:image') ? currentImage : 
    (currentImage || (placeholderText === 'Agent' ? DEFAULT_AGENT_IMAGE : placeholderText === 'Blog' ? DEFAULT_BLOG_IMAGE : DEFAULT_HOUSE_IMAGE));

  return (
    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center hover:border-blue-400 transition duration-200">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center">
        <img 
          src={displayImage} 
          alt="Preview" 
          className={`object-cover rounded-lg mb-2 sm:mb-3 shadow-md ${previewClass}`}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = placeholderText === 'Agent' ? DEFAULT_AGENT_IMAGE : 
                          placeholderText === 'Blog' ? DEFAULT_BLOG_IMAGE : DEFAULT_HOUSE_IMAGE;
          }}
        />
        <p className="text-xs sm:text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-500 mt-1">Click to select image</p>
      </div>
    </div>
  );
};

const CrudForm = ({ item, title, onSubmit, onCancel, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-3 sm:p-4 z-[9999]">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-3">{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
            {children}
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
            <button 
              type="button" 
              onClick={onCancel} 
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold shadow-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
            >
              <i className="fas fa-save mr-2"></i> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- View Components ---
const ManageHouses = ({ houses, onEdit, onDelete, onAdd }) => (
  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Properties ({houses.length})</h3>
      <button 
        onClick={onAdd}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
      >
        <i className="fas fa-plus mr-1 sm:mr-2"></i> Add
      </button>
    </div>
    
    {houses.length === 0 ? (
      <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No properties found.</p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {houses.map(house => (
          <div key={house.id} className="bg-gray-50 p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl shadow-md flex flex-col sm:flex-row transition hover:shadow-lg">
            <img 
              src={house.imageUrl || DEFAULT_HOUSE_IMAGE} 
              alt={house.title} 
              className="w-full h-32 sm:w-32 sm:h-32 object-cover rounded-lg mr-0 sm:mr-4 mb-3 sm:mb-0 flex-shrink-0 border"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_HOUSE_IMAGE; }}
            />
            <div className="flex-grow min-w-0">
              <p className="font-bold text-base sm:text-lg text-gray-900 truncate">{house.title}</p>
              <p className="text-lg sm:text-xl font-extrabold text-blue-600 my-0.5">${house.price.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{house.location}</p>
              <div className="flex space-x-2 sm:space-x-3 text-xs text-gray-600 mt-2">
                <span><i className="fas fa-bed"></i> {house.beds}</span>
                <span><i className="fas fa-bath"></i> {house.baths}</span>
                <span><i className="fas fa-ruler-combined"></i> {house.sqft} sqft</span>
              </div>
              <div className="flex space-x-2 sm:space-x-3 mt-3 border-t pt-3">
                <button 
                  onClick={() => onEdit(house)}
                  className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
                >
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
                <button 
                  onClick={() => onDelete(house.id)}
                  className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
                >
                  <i className="fas fa-trash-alt mr-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ManageAgents = ({ agents, onEdit, onDelete, onAdd }) => (
  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Agents ({agents.length})</h3>
      <button 
        onClick={onAdd}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
      >
        <i className="fas fa-user-plus mr-1 sm:mr-2"></i> Add
      </button>
    </div>
    
    {agents.length === 0 ? (
      <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No agents found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl shadow-md text-center transition hover:shadow-lg">
            <img 
              src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${agent.image}` || DEFAULT_AGENT_IMAGE} 
              alt={agent.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-3 border-4 border-white ring-2 ring-gray-200 shadow-inner"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AGENT_IMAGE; }}
            />
            <p className="font-extrabold text-base sm:text-lg text-gray-900">{agent.name}</p>
            <p className="text-xs sm:text-sm font-medium mb-2 text-yellow-600">{agent.office || 'Agent office'}</p>
            <p className="text-xs sm:text-sm font-medium mb-2 text-yellow-600">{agent.license || 'Agent license'}</p>
            <p className="text-xs sm:text-sm font-medium mb-2 text-yellow-600">{agent.languages || 'Agent languages'}</p>
            <p className="text-xs text-gray-500 mb-2"><i className="fas fa-map-pin mr-1"></i> {agent.location || 'Location'}</p>
            <p className="text-xs text-gray-500 truncate mb-1"><i className="fas fa-envelope mr-1"></i> {agent.email}</p>
            <p className="text-xs text-gray-500"><i className="fas fa-phone mr-1"></i> {agent.phone}</p>
            
            <div className="flex justify-center space-x-3 mt-4 border-t pt-4">
              <button 
                onClick={() => onEdit(agent, 'agents')}
                className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
              >
                <i className="fas fa-edit mr-1"></i> Edit
              </button>
              <button 
                onClick={() => onDelete(agent.id)}
                className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
              >
                <i className="fas fa-trash-alt mr-1"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ManageBlogs = ({ blogs, onEdit, onDelete, onAdd }) => (
  <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Blog Posts ({blogs.length})</h3>
      <button 
        onClick={onAdd}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
      >
        <i className="fas fa-plus mr-1 sm:mr-2"></i> Add Post
      </button>
    </div>
    
    {blogs.length === 0 ? (
      <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No blog posts found.</p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
            <img 
              src={blog.image || DEFAULT_BLOG_IMAGE} 
              alt={blog.title} 
              className="w-full h-32 sm:h-40 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_BLOG_IMAGE; }}
            />
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-500">{blog.readTime}</span>
              </div>
              <p className="font-bold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2">{blog.title}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
              <div className="flex items-center text-xs text-gray-500 mb-3 pb-3 border-b">
                <i className="fas fa-user mr-1"></i>
                <span className="truncate">{blog.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <button 
                  onClick={() => onEdit(blog)}
                  className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
                >
                  <i className="fas fa-edit mr-1"></i> Edit
                </button>
                <button 
                  onClick={() => onDelete(blog.id)}
                  className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
                >
                  <i className="fas fa-trash-alt mr-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ConfirmPayments = ({ payments, onConfirm, onReject, onAddMock }) => {
  const pendingPayments = payments.filter(p => p.status === 'pending');

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Pending ({pendingPayments.length})</h3>
        <button 
          onClick={onAddMock}
          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition duration-200"
        >
          <i className="fas fa-plus-circle mr-1 sm:mr-2 text-green-500"></i> Add Mock
        </button>
      </div>
      
      {pendingPayments.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No pending payments.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {pendingPayments.map(payment => (
            <div key={payment.id} className="p-3 sm:p-4 border border-yellow-300 bg-yellow-50 rounded-lg sm:rounded-xl shadow-md">
              <div className="mb-3">
                <p className="font-extrabold text-gray-900 text-sm sm:text-base md:text-lg truncate">{payment.userName}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-yellow-600">${parseFloat(payment.amount).toFixed(2)}</p>
                <p className="text-xs text-gray-600 mt-1">Ref: <span className="font-mono">{payment.reference}</span></p>
                <p className="text-xs text-gray-600">Date: {payment.date}</p>
                
                {payment.transactionLink && (
                  <p className="text-xs text-gray-600 mt-2">
                    <i className="fas fa-link mr-1"></i>
                    <a href={payment.transactionLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {payment.transactionLink}
                    </a>
                  </p>
                )}
                
                {payment.screenshot && (
                  <div className="mt-3">
                    <img 
                      src={payment.screenshot} 
                      alt="Payment proof" 
                      className="w-full max-w-xs rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition"
                      onClick={() => window.open(payment.screenshot, '_blank')}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 sm:space-x-3">
                <button 
                  onClick={() => onConfirm(payment.id)}
                  className="flex-1 px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-600 transition duration-200 shadow-md"
                >
                  <i className="fas fa-check-circle mr-1"></i> Confirm
                </button>
                <button 
                  onClick={() => onReject(payment.id)}
                  className="flex-1 px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 transition duration-200 shadow-md"
                >
                  <i className="fas fa-times-circle mr-1"></i> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PaymentHistory = ({ payments }) => {
  const completedPayments = payments.filter(p => p.status === 'completed').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800 mb-4 sm:mb-6">History ({completedPayments.length})</h3>
      
      {completedPayments.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No completed payments.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {completedPayments.map(payment => (
            <div key={payment.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-3 pb-3 border-b">
                <div className="flex-grow">
                  <p className="text-sm sm:text-base font-bold text-gray-900">{payment.userName}</p>
                  <p className="text-base sm:text-lg font-extrabold text-green-600 mt-1">
                    ${parseFloat(payment.amount).toFixed(2)}
                  </p>
                </div>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-800">
                  DONE
                </span>
              </div>
              
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-calendar mr-2 w-4"></i>
                  <span>Date: {payment.date}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-hashtag mr-2 w-4"></i>
                  <span className="font-mono truncate">Ref: {payment.reference}</span>
                </div>
                
                {payment.transactionLink && (
                  <div className="flex items-start text-gray-600">
                    <i className="fas fa-link mr-2 w-4 mt-0.5"></i>
                    <a 
                      href={payment.transactionLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline break-all flex-1"
                    >
                      {payment.transactionLink}
                    </a>
                  </div>
                )}
                
                {payment.screenshot && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-gray-600 mb-2 font-medium">
                      <i className="fas fa-image mr-2"></i>Payment Proof:
                    </p>
                    <img 
                      src={payment.screenshot} 
                      alt="Payment proof" 
                      className="w-full max-w-sm rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition"
                      onClick={() => window.open(payment.screenshot, '_blank')}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardSummary = ({ houses, agents, blogs, payments, setCurrentView }) => {
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const completedCount = payments.filter(p => p.status === 'completed').length;

  const InfoCard = ({ title, value, icon, color, action, actionText }) => (
    <div 
      className="p-3 sm:p-4 md:p-5 bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg flex flex-col justify-between transition hover:shadow-xl hover:scale-[1.01] cursor-pointer"
      onClick={action}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl text-white shadow-lg" style={{ backgroundColor: color }}>
          <i className={`${icon} text-base sm:text-xl`}></i>
        </div>
      </div>
      {action && (
        <div className="mt-3 sm:mt-4 text-xs font-bold" style={{ color: color }}>
          <i className="fas fa-arrow-right mr-1"></i> {actionText}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-0">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-4 sm:mb-6 font-bold">Dashboard</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <InfoCard 
          title="Properties" 
          value={houses.length} 
          icon="fas fa-city" 
          color={PRIMARY_COLOR} 
          action={() => setCurrentView('houses')}
          actionText="Manage"
        />
        <InfoCard 
          title="Agents" 
          value={agents.length} 
          icon="fas fa-users" 
          color="#4B5563" 
          action={() => setCurrentView('agents')}
          actionText="View"
        />
        <InfoCard 
          title="Blog Posts" 
          value={blogs.length} 
          icon="fas fa-blog" 
          color="#8B5CF6" 
          action={() => setCurrentView('blogs')}
          actionText="Manage"
        />
        <InfoCard 
          title="Pending" 
          value={pendingCount} 
          icon="fas fa-clock" 
          color={SECONDARY_COLOR} 
          action={() => setCurrentView('confirm-payments')}
          actionText="Review"
        />
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [userId] = useState('admin-' + Math.random().toString(36).substring(7));
  const [isLoading, setIsLoading] = useState(true);
  
  const [houses, setHouses] = useState([]);
  const [agents, setAgents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [agentFields, setAgentFields] = useState({ name: '', email: '', phone: '', license: '', location: '', image: null, office: '', languages: '' });

  if (!localStorage.getItem('ACCESS_TOKEN')) {
    return <div className="text-center p-4 text-red-600">
      Please log in to your account
    </div>;
  }

  // HANDLES AGENTS FORM================================================================================================================================================
  // const handleAgentsChange = (e) => {
  //   const { name, type, value, files } = e.target;

  //   setAgentFields((prev) => ({
  //     ...prev,
  //     // if it's a file input, use files[0], otherwise use value
  //     [name]: type === "file" ? files[0] : value,
  //   }));
  // };

  const handleAgentsChange = (e) => {
    const { name, value } = e.target;
    setAgentFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // FETCH FUNCTIONS==================================================================================================================================================
  function fetchAgents(){
    axiosClient.get('/agents')
    .then(({data})=>{
      console.log('Fetched agents:', data);
      setAgents(data.data.data);
      setIsLoading(false);
    })
    .catch((error)=>{
      console.error('Error fetching agents:', error);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchAgents();
  }, [agents.length]); 

  useEffect(() => {
    if (editingItem && isModalOpen === 'agents') {
      axiosClient.get(`/agents/${editingItem.id}`)
        .then(({ data }) => {
          console.log('Fetched agent details:', data);
          const agent = data.data;

          setAgentFields({
            name: agent.name || '',
            email: agent.email || '',
            phone: agent.phone || '',
            license: agent.license || '',
            location: agent.location || '',
            office: agent.office || '',
            languages: agent.languages || '',
            image: agent.image
              ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${agent.image}`
              : '',
          });

          setEditingItem(agent);
        })
        .catch((error) => {
          console.error('Error fetching agent details:', error);
        });
    }
  }, [editingItem, isModalOpen]);



  // --- Handle Edit ---==============================================================================================================================================
  const onEdit = (item, type) => {
    console.log('Editing:', type, item);

    setEditingItem(item);
    setIsModalOpen(type); // e.g. "agents", "houses", or "blogs"

    if (type === 'houses') {
      setHouseFields({
        title: item.title || '',
        price: item.price || 0,
        beds: item.beds || 0,
        baths: item.baths || 0,
        sqft: item.sqft || 0,
        location: item.location || '',
        imageUrl: item.imageUrl || '',
      });
    } else if (type === 'blogs') {
      setBlogFields({
        title: item.title || '',
        excerpt: item.excerpt || '',
        content: item.content || '',
        author: item.author || '',
        category: item.category || BLOG_CATEGORIES[0],
        image: item.image || DEFAULT_BLOG_IMAGE,
        location: item.location || 'General',
        readTime: item.readTime || '5 min read'
      });
    }
  };





  // Save functions=======================================================================================================
  const saveHouses = async (data) => {
    try {
      await window.storage.set('admin-houses', JSON.stringify(data));
      setHouses(data);
    } catch (error) {
      console.error('Error saving houses:', error);
    }
  };

  // const saveAgents = () => {
  //   axiosClient.post('/agents', agentFields, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   .then(({data})=>{
  //     console.log('Agent saved successfully:', data);
  //     fetchAgents();
  //     setIsModalOpen(null); 
  //     setEditingItem(null);
  //   })
  //   .catch((error)=>{
  //     console.error('Error saving agent:', error);
  //   });
  // };
  const saveAgents = async () => {
    try {
      const formData = new FormData();
      formData.append('name', agentFields.name);
      formData.append('email', agentFields.email);
      formData.append('phone', agentFields.phone);
      formData.append('license', agentFields.license);
      formData.append('location', agentFields.location);
      formData.append('office', agentFields.office);
      formData.append('languages', agentFields.languages);

      // Only append image if it's a new file or base64 data
      if (agentFields.image && (agentFields.image instanceof File || agentFields.image.startsWith('data:image'))) {
        formData.append('image', agentFields.image);
      }

      let response;

      // ✅ UPDATE (if editingItem has an id)
      if (editingItem && editingItem.id) {
        response = await axiosClient.post(`/agents/${editingItem.id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('✅ Agent updated successfully:', response.data);
        alert('Agent updated successfully');
      } 
      
      // ✅ CREATE (if creating a new one)
      else {
        response = await axiosClient.post('/agents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('✅ Agent created successfully:', response.data);
        alert('Agent created successfully');
      }

      // Reset and close modal
      setIsModalOpen(null);
      setEditingItem(null);
      setAgentFields({
        name: '',
        email: '',
        phone: '',
        license: '',
        location: '',
        office: '',
        languages: '',
        image: '',
      });

      // Optional: refresh agent list
      fetchAgents();

    } catch (error) {
      console.error('❌ Error saving agent:', error);
      alert('Failed to save agent');
    }
  };



  const saveBlogs = async (data) => {
    try {
      await window.storage.set('admin-blogs', JSON.stringify(data));
      setBlogs(data);
    } catch (error) {
      console.error('Error saving blogs:', error);
    }
  };

  const savePayments = async (data) => {
    try {
      await window.storage.set('wallet-payments', JSON.stringify(data), true);
      setPayments(data);
    } catch (error) {
      console.error('Error saving payments:', error);
    }
  };

  // CRUD operations======================================================================================================
  const handleAdd = (type) => {
    const templates = {
      houses: EMPTY_HOUSE,
      agents: EMPTY_AGENT,
      blogs: EMPTY_BLOG
    };
    setEditingItem(templates[type]);
    setIsModalOpen(type);
  };

  const handleEdit = (type, item) => {
    setEditingItem(item);
    setIsModalOpen(type);
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const dataMap = { houses, agents, blogs, payments };
    const saveMap = { houses: saveHouses, agents: saveAgents, blogs: saveBlogs, payments: savePayments };
    
    const filtered = dataMap[type].filter(item => item.id !== id);
    await saveMap[type](filtered);
  };

  const handleSave = async (type, item) => {
    const dataMap = { houses, agents, blogs };
    const saveMap = { houses: saveHouses, agents: saveAgents, blogs: saveBlogs };
    
    let updated;
    if (item.id) {
      updated = dataMap[type].map(i => i.id === item.id ? item : i);
    } else {
      const newItem = { ...item, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
      updated = [...dataMap[type], newItem];
    }
    
    await saveMap[type](updated);
    setIsModalOpen(null);
    setEditingItem(null);
  };

  // Payment operations==================================================================================================
  const handleConfirmPayment = async (id) => {
    const updated = payments.map(p => p.id === id ? { ...p, status: 'completed' } : p);
    await savePayments(updated);
  };

  const handleRejectPayment = async (id) => {
    const updated = payments.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
    await savePayments(updated);
  };

  const handleAddMockPayment = async () => {
    const mockPayment = {
      id: Date.now().toString(),
      userId: 'user-' + Math.random().toString(36).substring(2, 9),
      userName: 'Client ' + Math.floor(Math.random() * 1000),
      amount: (Math.random() * 5000 + 1000).toFixed(2),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      reference: 'REF-' + Date.now(),
      transactionLink: 'https://blockchain.example.com/tx/' + Math.random().toString(36).substring(2),
      screenshot: 'https://placehold.co/400x300/f0f0f0/666?text=Payment+Screenshot'
    };
    await savePayments([...payments, mockPayment]);
  };

  // HANDLES UPDATE AGENT FUNCTION ======================================================================================
  // const handleUpdateAgent = async (id) => {
  //   try {
  //     // Prepare your payload
  //     const formData = new FormData();
  //     formData.append('name', agentFields.name);
  //     formData.append('email', agentFields.email);
  //     formData.append('phone', agentFields.phone);
  //     formData.append('license', agentFields.license);
  //     formData.append('location', agentFields.location);
  //     formData.append('office', agentFields.office);
  //     formData.append('languages', agentFields.languages);

  //     // If image is base64 or a file, include it conditionally
  //     if (agentFields.image instanceof File || agentFields.image.startsWith('data:image')) {
  //       formData.append('image', agentFields.image);
  //     }

  //     // Send PUT or POST request (depends on backend setup)
  //     const response = await axiosClient.post(`/agents/${id}?_method=PUT`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     console.log('Agent updated successfully:', response.data);
  //     alert('Agent updated successfully ✅');

  //     // Optionally refresh or close modal
  //     setIsModalOpen(null);
  //     setEditingItem(null);

  //   } catch (error) {
  //     console.error('Error updating agent:', error);
  //     alert('Failed to update agent ❌');
  //   }
  // };


  // Form handlers========================================================================================================
  const setField = (field, value) => setEditingItem(prev => ({ ...prev, [field]: value }));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (isModalOpen === 'houses') {
      const numericHouse = {
        ...editingItem,
        price: Number(editingItem.price) || 0,
        beds: Number(editingItem.beds) || 0,
        baths: Number(editingItem.baths) || 0,
        sqft: Number(editingItem.sqft) || 0,
      };
      handleSave('houses', numericHouse);
    } else if (isModalOpen === 'agents') {
      console.log('Agent fields to save:', agentFields);
      saveAgents();
    } else if (isModalOpen === 'blogs') {
      handleSave('blogs', editingItem);
    }
  };

  const renderFormFields = () => {
    if (!editingItem) return null;

    if (isModalOpen === 'houses') {
      return (
        <>
          <ImageUploadField 
            label="Property Photo"
            currentImage={editingItem.imageUrl}
            onImageChange={(url) => setField('imageUrl', url)}
            placeholderText="Property"
            previewClass="w-full h-32"
          />
          {['title', 'price', 'beds', 'baths', 'sqft', 'location'].map(key => (
            <label key={key} className="block">
              <span className="text-xs sm:text-sm text-gray-700 font-medium capitalize">{key}</span>
              <input
                type={['price', 'beds', 'baths', 'sqft'].includes(key) ? 'number' : 'text'}
                value={editingItem[key]}
                onChange={(e) => setField(key, e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          ))}
        </>
      );
    }

    if (isModalOpen === 'agents') {
      return (
        <>
          <ImageUploadField
            label="Agent Photo"
            currentImage={agentFields.image}
            onImageChange={(imageData) =>
              setAgentFields((prev) => ({ ...prev, image: imageData }))
            }
            placeholderText="Agent"
            previewClass="w-20 h-20 rounded-full"
          />

          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Name</span>
            <input
              type="text"
              name='name'
              value={agentFields.name}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., Sophia Williams"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Office</span>
            <input
              type="text"
              name='office'
              value={agentFields.office}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., PureWest Christesrealty"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Location</span>
            <input
              type="text"
              name='location'
              value={agentFields.location}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., London, UK"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Email</span>
            <input
              type="email"
              name='email'
              value={agentFields.email}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., agent@luxestates.com"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Phone</span>
            <input
              type="tel"
              name='phone'
              value={agentFields.phone}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., +44 20 7946 0958"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">License Number(Optional)</span>
            <input
              type="tel"
              name='license'
              value={agentFields.license}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., License No. 123456789"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Languages(Optional)</span>
            <input
              type="tel"
              name='languages'
              value={agentFields.languages}
              onChange={handleAgentsChange}
              required
              placeholder="e.g., Spanish, French"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </>
      );
    }

    if (isModalOpen === 'blogs') {
      return (
        <>
          <ImageUploadField 
            label="Blog Cover Image"
            currentImage={editingItem.image}
            onImageChange={(url) => setField('image', url)}
            placeholderText="Blog"
            previewClass="w-full h-32"
          />
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Title</span>
            <input
              type="text"
              value={editingItem.title}
              onChange={(e) => setField('title', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Excerpt (Short description)</span>
            <textarea
              value={editingItem.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              required
              rows="2"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Content (Full article)</span>
            <textarea
              value={editingItem.content}
              onChange={(e) => setField('content', e.target.value)}
              required
              rows="6"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Author Name</span>
            <input
              type="text"
              value={editingItem.author}
              onChange={(e) => setField('author', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Category</span>
            <select
              value={editingItem.category}
              onChange={(e) => setField('category', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            >
              {BLOG_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Location</span>
            <input
              type="text"
              value={editingItem.location}
              onChange={(e) => setField('location', e.target.value)}
              placeholder="e.g., Lagos, Nigeria, General"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-xs sm:text-sm text-gray-700 font-medium">Read Time</span>
            <input
              type="text"
              value={editingItem.readTime}
              onChange={(e) => setField('readTime', e.target.value)}
              placeholder="e.g., 5 min read"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    switch (currentView) {
      case 'dashboard':
        return <DashboardSummary houses={houses} agents={agents} blogs={blogs} payments={payments} setCurrentView={setCurrentView} />;
      case 'houses':
        return <ManageHouses houses={houses} onEdit={(item) => handleEdit('houses', item)} onDelete={(id) => handleDelete('houses', id)} onAdd={() => handleAdd('houses')} />;
      case 'agents':
        // return <ManageAgents agents={agents} onEdit={(item) => handleEdit('agents', item)} onDelete={(id) => handleDelete('agents', id)} onAdd={() => handleAdd('agents')} />;
        return <ManageAgents agents={agents} onEdit={(agent) => onEdit(agent, 'agents')} onDelete={(id) => handleDelete('agents', id)} onAdd={() => handleAdd('agents')} />;
      case 'blogs':
        return <ManageBlogs blogs={blogs} onEdit={(item) => handleEdit('blogs', item)} onDelete={(id) => handleDelete('blogs', id)} onAdd={() => handleAdd('blogs')} />;
      case 'confirm-payments':
        return <ConfirmPayments payments={payments} onConfirm={handleConfirmPayment} onReject={handleRejectPayment} onAddMock={handleAddMockPayment} />;
      case 'payment-history':
        return <PaymentHistory payments={payments} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col" style={{ fontFamily: FONT_FAMILY }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <Header userId={userId} setCurrentView={setCurrentView} />

      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="lg:col-span-3 mb-4 lg:mb-0">
            <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
          </div>
          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* {isModalOpen && editingItem && ( */}
      {isModalOpen && (
        <CrudForm
          item={editingItem}
          title={editingItem.id ? `Edit ${isModalOpen.slice(0, -1)}` : `Create New ${isModalOpen.slice(0, -1)}`}
          onSubmit={handleFormSubmit}
          onCancel={() => { setIsModalOpen(null); setEditingItem(null); }}
        >
          {renderFormFields()}
        </CrudForm>
      )}
    </div>
  );
}