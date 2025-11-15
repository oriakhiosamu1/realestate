// PaymentHistoryComponent.jsx
import React from 'react';
import CompletedPaymentCard from './CompletedPaymentCard';

export default function PaymentHistoryComponent({ payments }) {
  const completedPayments = payments.filter(p => p.status === 'paid').sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800 mb-4 sm:mb-6">Payment History ({completedPayments.length})</h3>
      
      {completedPayments.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No completed payments.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {completedPayments.map(payment => (
            <CompletedPaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      )}
    </div>
  );
}