// LoadingSpinner.jsx
import React from 'react';
import { PRIMARY_COLOR } from './constants';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4" style={{ borderColor: PRIMARY_COLOR }}></div>
      <p className="ml-4 text-gray-600 font-medium">Loading data...</p>
    </div>
  );
}