// CompletedPaymentCard.jsx
import React from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

export default function CompletedPaymentCard({ payment }) {
  console.log(baseUrl);
  return (
    <div key={payment.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-3 pb-3 border-b">
        <div className="flex-grow">
          <p className="text-sm sm:text-base font-bold text-gray-900">{payment.name}</p>
          <p className="text-base sm:text-lg font-extrabold text-green-600 mt-1">
            ${parseFloat(payment.amount).toFixed(2)}
          </p>
        </div>
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-800">
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex items-center text-gray-600">
          <i className="fas fa-calendar mr-2 w-4"></i>
          <span>Date: {payment.created_at}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <i className="fas fa-hashtag mr-2 w-4"></i>
          <span className="font-mono truncate">Sender's address: {payment.sender_address}</span>
        </div>
        
        {payment.transaction_hash && (
          <div className="flex items-start text-gray-600">
            <i className="fas fa-link mr-2 w-4 mt-0.5"></i>
            <a 
              href={payment.transaction_hash} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline break-all flex-1"
            >
              Transaction Link
            </a>
          </div>
        )}
        
        {payment.image && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-gray-600 mb-2 font-medium">
              <i className="fas fa-image mr-2"></i>Payment Proof:
            </p>
            <img 
              // src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${payment.image}`} 
              // src={`${baseUrl}/${payment.image}`}
              src={payment.image}
              alt="Payment proof" 
              className="w-full max-w-sm rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition"
              // onClick={() => window.open(`${baseUrl}/storage/${payment.image}`, "_blank")}
              onClick={() => window.open(payment.image, "_blank")} 
            />
          </div>
        )}

      </div>
    </div>
  );
}