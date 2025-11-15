// AdminNav.jsx
import React from 'react';

export default function AdminNav({ currentView, setCurrentView }) {
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
}