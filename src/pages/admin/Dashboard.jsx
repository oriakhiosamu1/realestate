// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './shared/constants';
import WelcomeMessage from '../../components/ShowMessage';
import { useStateContext } from '../../context/ContextProvider';
import MessageBox from '../../components/MessageBox';

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

export default function Dashboard({ houses, offices, agents, blogs, payments, setCurrentView }) {
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const completedCount = payments.filter(p => p.status === 'completed').length;
  const {user} = useStateContext();

  return (
    <div className="p-0">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-4 sm:mb-6 font-bold">Dashboard Summary</h3>

      <WelcomeMessage user={user} />
      {/* {messageBox === '' && <MessageBox message={messageBox} />} */}
      
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
          title="Offices" 
          value={offices.length} 
          icon="fas fa-building" 
          color={SECONDARY_COLOR} 
          action={() => setCurrentView('offices')}
          actionText="Review"
        />
        {/* <InfoCard 
          title="Payments" 
          value={payments.length} 
          icon="fas fa-clock" 
          // color={SECONDARY_COLOR} 
          color='#00FF00'
          action={() => setCurrentView('confirm-payments')}
          actionText="Review"
        /> */}
        <InfoCard 
          title="Payments" 
          value={payments.length} 
          icon="fas fa-clock" 
          // color={SECONDARY_COLOR} 
          color='#00FF00'
          action={() => setCurrentView('payment-history')}
          actionText="Review"
        />
      </div>
    </div>
  );
}