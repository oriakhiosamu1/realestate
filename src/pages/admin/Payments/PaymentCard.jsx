// PaymentCard.jsx
import React from 'react';

export default function PaymentCard({ payment, onConfirm, onReject }) {
  return (
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
              Transaction Link
            </a>
          </p>
        )}
        
        {payment.screenshot && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-1">Proof:</p>
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
  );
}