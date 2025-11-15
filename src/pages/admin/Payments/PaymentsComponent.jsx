// PaymentsComponent.jsx (for pending payments)
import React from 'react';
import PaymentCard from './PaymentCard';

export default function PaymentsComponent({ payments, onConfirm, onReject, onAddMock }) {
  const pendingPayments = payments.filter(p => p.status === 'pending');

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Pending Payments ({pendingPayments.length})</h3>
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
            <PaymentCard 
              key={payment.id} 
              payment={payment} 
              onConfirm={onConfirm} 
              onReject={onReject} 
            />
          ))}
        </div>
      )}
    </div>
  );
}