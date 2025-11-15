// AgentsComponent.jsx
import React from 'react';
import { DEFAULT_AGENT_IMAGE } from '../shared/constants';

export default function AgentsComponent({ agents, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Agents ({agents.length})</h3>
        <button 
          onClick={onAdd}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          <i className="fas fa-user-plus mr-1 sm:mr-2"></i> Add Agent
        </button>
      </div>
      
      {agents.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No agents found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {agents.map(agent => (
            <div key={agent.id} className="p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl shadow-md text-center transition hover:shadow-lg">
              <img 
                src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${agent.image}`|| DEFAULT_AGENT_IMAGE} 
                alt={agent.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-3 border-4 border-white ring-2 ring-gray-200 shadow-inner"
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_AGENT_IMAGE; }}
              />
              <p className="font-extrabold text-base sm:text-lg text-gray-900">{agent.name}</p>
              <p className="text-xs sm:text-sm font-medium mb-2 text-yellow-600">{agent.office || 'Agent'}</p>
              <p className="text-xs text-gray-500 mb-2"><i className="fas fa-map-pin mr-1"></i> {agent.location || 'Location'}</p>
              <p className="text-xs text-gray-500 truncate mb-1"><i className="fas fa-envelope mr-1"></i> {agent.email}</p>
              <p className="text-xs text-gray-500"><i className="fas fa-phone mr-1"></i> {agent.phone}</p>
              
              <div className="flex justify-center space-x-3 mt-4 border-t pt-4">
                <button 
                  onClick={() => onEdit(agent)}
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
}