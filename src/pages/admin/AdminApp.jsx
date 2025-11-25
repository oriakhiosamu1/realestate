// AdminApp.jsx (The Main Orchestrator)
import React, { useState, useEffect } from 'react';
import { FONT_FAMILY, EMPTY_HOUSE, EMPTY_AGENT, EMPTY_BLOG } from './shared/constants';
import axiosClient from '../../axiosClient/axiosClient';

// --- Shared Components ---
import LoadingSpinner from './shared/LoadingSpinner';
import Header from './shared/Header';
import AdminNav from './shared/AdminNav';

// --- View Components ---
import Dashboard from './Dashboard';
import PropertiesComponent from './Properties/PropertiesComponent';
import AgentsComponent from './Agents/AgentsComponent';
import BlogsComponent from './Blogs/BlogsComponent';
import PaymentsComponent from './Payments/PaymentsComponent';
import PaymentHistoryComponent from './Payments/PaymentHistoryComponent';

// --- Form Components ---
import CreatePropertyForm from './Properties/CreatePropertyForm';
import EditPropertyForm from './Properties/EditPropertyForm';
import CreateAgentForm from './Agents/CreateAgentForm';
import EditAgentForm from './Agents/EditAgentForm';
import CreateBlogForm from './Blogs/CreateBlogForm';
import EditBlogForm from './Blogs/EditBlogForm';
import axios from 'axios';


export default function AdminApp() {
  const [userId] = useState('admin-' + Math.random().toString(36).substring(7));
  const [isLoading, setIsLoading] = useState(true);
  
  const [houses, setHouses] = useState([]);
  const [agents, setAgents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [payments, setPayments] = useState([]);
  // const [properties, setProperties] = useState([]);
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [errors, setErrors] = useState({});
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 0,
    total: 0,
  });

  const [modalType, setModalType] = useState(null); // 'create-house', 'edit-agent', etc.
  const [editingItem, setEditingItem] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // --- Data Loading ---
  // const fetchAgents = async () => {
  //   axiosClient.get('agents')
  //   .then(({data}) => {
  //     console.log(data);
  //     setAgents(data.data)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // };

  const fetchAgents = async (page = 1) => {
    try {
      const { data } = await axiosClient.get(`agents?page=${page}`);
      
      // Update agents state
      setAgents(data.data); // `data.data` contains the array of agents
      console.log(data);
      
      // Update pagination info
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
      });
      
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      setErrors({ fetch: ["Failed to load agents"] });
    }
  };



  const fetchBlogs = async () => {
    axiosClient.get('blogs')
    .then(({data}) => {
      console.log(data);
      setBlogs(data.data)
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const fetchPaymentHistory = async () => {
    axiosClient.get('payments')
    .then(({data}) => {
      console.log(data);
      setPayments(data.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const fetchProperties = async () => {
    axiosClient.get('houses')
    .then(({data}) => {
      console.log(data);
      setHouses(data.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // Fetch data on mount and when refetchTrigger changes==========================================================================================================================
  useEffect(() => {
    fetchAgents();
    fetchBlogs();
    fetchPaymentHistory();
    fetchProperties();

    setIsLoading(false);
  }, [refetchTrigger]);

  // auto-clear errors after 5 seconds=========================================================================================================================================
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 5000);
      return () => clearTimeout(timer); // cleanup if errors change
    }
  }, [errors]);

  // --- Data Saving Helpers (MOCK API calls for Laravel) ---
  const saveMap = {
    houses: async (data) => { await window.storage.set('admin-houses', JSON.stringify(data)); setHouses(data); },
    agents: async (data) => { await window.storage.set('admin-agents', JSON.stringify(data)); setAgents(data); },
    blogs: async (data) => { await window.storage.set('admin-blogs', JSON.stringify(data)); setBlogs(data); },
    payments: async (data) => { await window.storage.set('wallet-payments', JSON.stringify(data), true); setPayments(data); },
  };

  // --- CRUD Core Logic ---

  const handleCloseModal = () => {
    setModalType(null);
    setEditingItem(null);
  }

  // Called by PropertiesComponent, AgentsComponent, etc.
  const handleAdd = (type) => {
    const templates = {
      houses: EMPTY_HOUSE,
      agents: EMPTY_AGENT,
      blogs: EMPTY_BLOG
    };
    setEditingItem(templates[type]);
    setModalType(`create-${type.slice(0, -1)}`); // e.g., 'create-house'
  };

  // Called by PropertiesComponent, AgentsComponent, etc.
  const handleEdit = (type, item) => {
    setEditingItem({ ...item }); // Clone item to break reference
    setModalType(`edit-${type.slice(0, -1)}`); // e.g., 'edit-house'
  };

  /**
   * Universal Save Handler. The individual forms pass the final, validated item here.
   * @param {string} type - 'houses', 'agents', or 'blogs'
   * @param {object} item - The data object to save (contains 'id' if editing)
   */

  // SAVE FUNCTION ========================================================================================================================================================
  const singularMap = { agents: "agent", houses: "house", blogs: "blog" };

  // const handleSave = async (type, item) => {
  //   try {
  //     let response;

  //     if (item.id) {
  //       // UPDATE
  //       response = await axiosClient.put(`${type}/${item.id}`, item);
  //       console.log(`✅ Updated ${type}:`, response.data);

  //     } else {
  //       // CREATE
  //       response = await axiosClient.post(`${type}`, item);
  //       console.log(`✅ Created new ${type}:`, response.data);
  //     }

  //     const key = singularMap[type];
  //     const savedItem = response.data[key] || response.data;

  //     const dataMap = { houses, agents, blogs };
  //     const updatedList = item.id
  //       ? dataMap[type].map((i) => (i.id === item.id ? savedItem : i))
  //       : [...dataMap[type], savedItem];

  //     await saveMap[type](updatedList);
  //     handleCloseModal();

  //   } catch (error) {
  //     console.error(`❌ Error saving ${type}:`, error.response?.data || error.message);
  //     alert(error.response?.data?.message || `Failed to save ${type}`);
  //   }
  // };

  // const handleSave = async (type, item) => {
  //   if (item.id) {
  //     // UPDATE===============================================================================================
  //     axiosClient.put(`${type}/${item.id}`, item)
  //     .then(({data}) => {
  //       console.log(data);
  //       handleCloseModal();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   } else {
  //     // CREATE===============================================================================================
  //     axiosClient.post(`${type}`, item)
  //     .then(({data}) => {
  //       console.log(data);
  //       handleCloseModal();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // };
  // SAVE FUNCTION ENDS ====================================================================================================================================================



  // Called by PropertiesComponent, AgentsComponent, etc.
  // const handleDelete = async (type, id) => {
  //   // Validate type
  //   const validTypes = ['houses', 'agents', 'blogs'];
  //   if (!validTypes.includes(type)) {
  //     console.error(`Invalid type: "${type}"`);
  //     return;
  //   }

  //   // Ask for user confirmation
  //   if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;

  //   try {
  //     // Optimistic UI update
  //     const dataMap = { houses, agents, blogs };
  //     const saveFnMap = saveMap; // e.g., { houses: setHouses, agents: setAgents, blogs: setBlogs }
  //     const currentData = dataMap[type];
  //     const filteredData = currentData.filter(item => item.id !== id);

  //     // Update state immediately
  //     saveFnMap[type](filteredData);

  //     // Axios DELETE request
  //     await axiosClient.delete(`${type}/${id}`);

  //     console.log(`${type.slice(0, -1)} deleted successfully!`);
  //   } catch (error) {
  //     // Revert UI if API fails
  //     console.error('Error deleting item:', error);
  //     saveMap[type](dataMap[type]);
  //     alert('Deletion failed. Please try again.');
  //   }
  // };

  const handleSave = async (type, item) => {
    const request = item.id
      ? axiosClient.put(`${type}/${item.id}`, item)
      : axiosClient.post(`${type}`, item);

    request
      .then(({ data }) => {
        console.log(data);
        setRefetchTrigger(prev => prev + 1);   // <=== tells useEffect to refetch
        handleCloseModal();
      })
      // .catch(console.log);

      // Enhanced error handling
      .catch((error) => {
      console.error('Handle Save error:', error);

      const responseErrors = error.response;
      const msg = responseErrors?.data?.message || "Something went wrong";

      if (responseErrors?.status === 401) {
        setErrors({ general: [msg] });
      } else {
        setErrors({ email: [msg] });
      }

      handleCloseModal();
      setIsLoading(false);
    });
  };

  // --- Payment Handlers ---
  
  const handleDelete = async (type, id) => {
    const validTypes = ['houses', 'agents', 'blogs'];
    if (!validTypes.includes(type)) {
      console.error(`Invalid type: "${type}"`);
      return;
    }

    if (!window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;

    try {
      // Axios DELETE request
      await axiosClient.delete(`${type}/${id}`);
      console.log(`${type.slice(0, -1)} deleted successfully!`);

      // Refetch updated list automatically
      setRefetchTrigger(prev => prev + 1);  // <============== REFRESH UI

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Deletion failed. Please try again.');
    }
  };


  const handleConfirmPayment = async (id) => {
    // API call to POST/PUT: api/v1/admin/payments/${id}/confirm
    console.log(`[API MOCK] CONFIRM payment ID: ${id}`);
    const updated = payments.map(p => p.id === id ? { ...p, status: 'completed' } : p);
    await saveMap.payments(updated);
  };

  const handleRejectPayment = async (id) => {
    // API call to POST/PUT: api/v1/admin/payments/${id}/reject
    console.log(`[API MOCK] REJECT payment ID: ${id}`);
    const updated = payments.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
    await saveMap.payments(updated);
  };

  const handleAddMockPayment = async () => {
    // Utility to add mock data for testing
    const mockPayment = {
      id: Date.now().toString(),
      userId: 'user-' + Math.random().toString(36).substring(2, 9),
      userName: 'Client ' + Math.floor(Math.random() * 1000),
      amount: (Math.random() * 5000 + 1000).toFixed(2),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      reference: 'REF-' + Date.now(),
      transactionLink: 'https://blockchain.example.com/tx/' + Math.random().toString(36).substring(2),
      screenshot: 'https://placehold.co/400x300/f0f0f0/666?text=Payment+Screenshot'
    };
    await saveMap.payments([...payments, mockPayment]);
  };


  // --- Rendering Logic ---

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard houses={houses} agents={agents} blogs={blogs} payments={payments} setCurrentView={setCurrentView} />;
      case 'houses':
        return <PropertiesComponent houses={houses} onEdit={(item) => handleEdit('houses', item)} onDelete={(id) => handleDelete('houses', id)} onAdd={() => handleAdd('houses')} />;
      case 'agents':
        return <AgentsComponent onPageChange={(page) => fetchAgents(page)} pagination={pagination}  errors={errors} agents={agents} onEdit={(item) => handleEdit('agents', item)} onDelete={(id) => handleDelete('agents', id)} onAdd={() => handleAdd('agents')} />;
      case 'blogs':
        return <BlogsComponent blogs={blogs} onEdit={(item) => handleEdit('blogs', item)} onDelete={(id) => handleDelete('blogs', id)} onAdd={() => handleAdd('blogs')} />;
      case 'confirm-payments':
        return <PaymentsComponent payments={payments} onConfirm={handleConfirmPayment} onReject={handleRejectPayment} onAddMock={handleAddMockPayment} />;
      case 'payment-history':
        return <PaymentHistoryComponent payments={payments} />;
      default:
        return null;
    }
  };
  
  const renderFormModal = () => {
    if (!modalType || !editingItem) return null;

    // Use a clear switch statement to render the correct standalone form
    switch (modalType) {
      case 'create-house':
        return <CreatePropertyForm onSave={handleSave} onCancel={handleCloseModal} />;
      case 'edit-house':
        return <EditPropertyForm item={editingItem} onSave={handleSave} onCancel={handleCloseModal} />;

      case 'create-agent':
        return <CreateAgentForm onSave={handleSave} onCancel={handleCloseModal} />;
      case 'edit-agent':
        return <EditAgentForm item={editingItem} onSave={handleSave} onCancel={handleCloseModal} />;

      case 'create-blog':
        return <CreateBlogForm onSave={handleSave} onCancel={handleCloseModal} />;
      case 'edit-blog':
        return <EditBlogForm item={editingItem} onSave={handleSave} onCancel={handleCloseModal} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col" style={{ fontFamily: FONT_FAMILY }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <Header userId={userId} setCurrentView={setCurrentView} />

      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="lg:col-span-3 mb-4 lg:mb-0">
            <AdminNav currentView={currentView} setCurrentView={setCurrentView} />
          </div>
          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Renders the appropriate, separate Form Modal based on state */}
      {renderFormModal()}

    </div>
  );
}