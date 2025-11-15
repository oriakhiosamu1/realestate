// Header.jsx
import React from 'react';
import { PRIMARY_COLOR } from './constants';

export default function Header({ userId, setCurrentView }) {
  return (
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
}