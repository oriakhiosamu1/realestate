// // CompletedPaymentCard.jsx
// import React from 'react';
// const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

// export default function CompletedPaymentCard({ payment }) {
//   console.log(baseUrl);
//   return (
//     <div key={payment.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200">
//       <div className="flex justify-between items-center mb-3 pb-3 border-b">
//         <div className="flex-grow">
//           <p className="text-sm sm:text-base font-bold text-gray-900">{payment.email}</p>
//           <p className="text-base sm:text-lg font-extrabold text-green-600 mt-1">
//             ${parseFloat(payment.amount_sent).toFixed(2)}
//           </p>
//         </div>
//         <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-800">
//           {payment.payment_status}
//         </span>
//       </div>
      
//       <div className="space-y-2 text-xs sm:text-sm">
//         <div className="flex items-center text-gray-600">
//           <i className="fas fa-calendar mr-2 w-4"></i>
//           <span>Date: {payment.created_at}</span>
//         </div>
        
//         <div className="flex items-center text-gray-600">
//           <i className="fas fa-hashtag mr-2 w-4"></i>
//           <span className="font-mono truncate">Sender's address: {payment.sender_address}</span>
//         </div>
        
//         {payment.transaction_hash && (
//           <div className="flex items-start text-gray-600">
//             <i className="fas fa-link mr-2 w-4 mt-0.5"></i>
//             <a 
//               href={payment.transaction_hash} 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="text-blue-600 hover:underline break-all flex-1"
//             >
//               {payment.tx_hash}
//             </a>
//           </div>
//         )}
        
//         {/* {payment.image && (
//           <div className="mt-3 pt-3 border-t">
//             <p className="text-gray-600 mb-2 font-medium">
//               <i className="fas fa-image mr-2"></i>Payment Proof:
//             </p>
//             <img 
//               // src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${payment.image}`} 
//               // src={`${baseUrl}/${payment.image}`}
//               src={payment.image}
//               alt="Payment proof" 
//               className="w-full max-w-sm rounded-lg border border-gray-300 shadow-sm cursor-pointer hover:shadow-md transition"
//               // onClick={() => window.open(`${baseUrl}/storage/${payment.image}`, "_blank")}
//               onClick={() => window.open(payment.image, "_blank")} 
//             />
//           </div>
//         )} */}

//       </div>
//     </div>
//   );
// }



// CompletedPaymentCard.jsx
import React, { useState } from 'react';
import axiosClient from '../../../axiosClient/axiosClient'
const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

export default function CompletedPaymentCard({ payment }) {
  const [status, setStatus] = useState(payment.payment_status);
  const [propertyType, setPropertyType] = useState(payment.property_type);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    axiosClient.put(`/payments/${payment.id}/update-status`, {
      payment_status: newStatus,
    })
    .then(({ data }) => {
      console.log('Payment status updated successfully');
    })
    .catch((err) => {
      console.error(err);
      alert('Error updating payment status');
    });
  };


  const handlePropertyTypeChange = async (e) => {
    const newType = e.target.value;
    setPropertyType(newType);

    // axiosClient.put(`${baseUrl}/payments/${payment.id}/update-property-type`, {
    axiosClient.put(`/payments/${payment.id}/update-property-type`, {
      property_type: newType ,
    })
    .then(({ data }) => {
      alert('Property Type updated successfully');
    })
    .catch((err) => {
      console.error(err);
      alert('Error updating Property Type');
    });
  };


  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md border border-gray-200">
      {/* Header: Email, Amount, Payment Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 pb-3 border-b gap-2 sm:gap-0">
        <div className="flex-grow min-w-0">
          <p className="text-sm sm:text-base font-bold text-gray-900 truncate">{payment.email}</p>
          <p className="text-base sm:text-lg font-extrabold text-green-600 mt-1">
            ${parseFloat(payment.amount_sent).toFixed(2)}
          </p>
        </div>

        {/* Payment Status Dropdown */}
        <div className="flex-shrink-0 ml-2 sm:ml-3">
          <select
            value={status}
            onChange={handleStatusChange}
            className={`px-3 py-2 sm:px-2 sm:py-0.5 text-sm sm:text-xs font-bold rounded-full border-2 border-transparent focus:border-current focus:outline-none transition-all duration-200 min-w-[120px] sm:min-w-[100px]
              ${status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                status === 'failed' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'} 
              active:scale-95 touch-manipulation`}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-2 text-xs sm:text-sm">

        {/* Date & Verified At */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-calendar mr-2 w-4"></i>
          <span>Created: {payment.created_at}</span>
        </div>
        {payment.verified_at && (
          <div className="flex items-center text-gray-600">
            <i className="fas fa-check-circle mr-2 w-4"></i>
            <span>Verified: {payment.verified_at}</span>
          </div>
        )}

        {/* Transaction Hash */}
        {payment.tx_hash && (
          <div className="flex items-start text-gray-600">
            <i className="fas fa-link mr-2 w-4 mt-0.5"></i>
            <a
              href={payment.tx_hash}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all flex-1"
            >
              {payment.tx_hash}
            </a>
          </div>
        )}

        {/* Wallets */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-wallet mr-2 w-4"></i>
          <span>Sender: {payment.sender_wallet}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <i className="fas fa-wallet mr-2 w-4"></i>
          <span>Receiver: {payment.receiving_wallet}</span>
        </div>

        {/* Expected Amount */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-dollar-sign mr-2 w-4"></i>
          <span>Expected Amount: ${parseFloat(payment.amount_sent).toFixed(2)}</span>
        </div>

        {/* Crypto & Network */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-coins mr-2 w-4"></i>
          <span>{payment.crypto_currency} / {payment.network}</span>
        </div>

        {/* Invoice ID */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-file-invoice mr-2 w-4"></i>
          <span>Invoice ID: {payment.invoice_id}</span>
        </div>

        {/* Property Type Dropdown */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-home mr-2 w-4"></i>
          <select
            value={propertyType}
            onChange={handlePropertyTypeChange}
            className="px-3 py-2 sm:px-2 sm:py-0.5 text-sm sm:text-xs font-bold rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-200 min-w-[100px] sm:min-w-[80px] bg-white hover:bg-gray-50 active:scale-95 touch-manipulation"
          >
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {/* Listing Reference */}
        <div className="flex items-center text-gray-600">
          <i className="fas fa-tag mr-2 w-4"></i>
          <span>Listing Reference: {payment.listing_reference}</span>
        </div>
      </div>
    </div>
  );
}
