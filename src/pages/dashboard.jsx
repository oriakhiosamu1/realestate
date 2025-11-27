import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import WelcomeMessage from '../components/ShowMessage';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient/axiosClient';
import axios from 'axios';
import Errors from '../components/Errors';
import SuccessMessage from '../components/SucessMessage';

// --- Configuration and Mock Data ---

const PRIMARY_COLOR = '#C3903E';
const FOOTER_BG = '#191919';

const MOCK_DATA = {
    'saved-properties': [
        { id: 1, title: 'Modern Villa in Beverly Hills', price: '$126,000,000', beds: 8, baths: 22, sqft: '30,610 sq ft', location: 'Beverly Hills, CA 90210', imageUrl: 'https://placehold.co/300x200/e5e7eb/4b5563?text=Property+1' },
        { id: 2, title: 'Seaside Plaza Penthouse', price: '$61,420,899', beds: 7, baths: 8, sqft: '4,473 sq ft', location: 'Fountainville, Monaco', imageUrl: 'https://placehold.co/300x200/d1d5db/4b5563?text=Property+2' }
    ],
    'saved-searches': [
        { id: 1, criteria: 'Luxury 4+ Bed Homes, London, £5M+', date: '2025-09-01' },
        { id: 2, criteria: 'Waterfront property, Miami, $1M - $5M', date: '2025-08-15' }
    ],
    'apartments-bought': [
        { id: 101, title: 'Tribeca Loft with Terrace', price: '$5,950,000', beds: 3, baths: 4, sqft: '3,200 sq ft', location: 'New York, NY 10013', imageUrl: 'https://placehold.co/300x200/c5c5c5/333333?text=NY+Loft' },
        { id: 102, title: 'Luxury Dubai Marina Residence', price: '$2,100,000', beds: 2, baths: 3, sqft: '1,800 sq ft', location: 'Dubai, UAE', imageUrl: 'https://placehold.co/300x200/a3a3a3/333333?text=Dubai+Apt' }
    ],
    'house-sold': [],
    'house-rent': [
        { id: 1, title: 'Parisian Flat with Eiffel View', price: '$20,000/Month', beds: 3, baths: 3, location: 'Paris, France', imageUrl: 'https://placehold.co/300x200/f3f4f6/4b5563?text=Rental+1' }
    ]
};

// --- Reusable Components ---

const Footer = () => (
    <footer className="mt-8 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-900 mb-4 sm:mb-6">Get luxury real estate updates in your inbox</h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <input type="email" placeholder="Email Address*" className="flex-grow px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-400 rounded-lg text-sm sm:text-base focus:border-primary focus:ring-primary focus:ring-1 transition duration-200" />
                <button className="bg-[#C3903E] hover:bg-[#AF8238] text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-200 shadow-md">
                    Subscribe
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">This site is protected by reCAPTCHA and the Google <a href="#" className="hover:underline">Privacy Notice</a> and <a href="#" className="hover:underline">Terms of Service</a> apply.</p>
        </div>
        
        <div className="bg-[#191919] text-white pt-10 sm:pt-16 pb-6 sm:pb-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                
                <div>
                    <a href="#" className="text-xl sm:text-2xl font-serif font-bold tracking-wide">
                        CHRISTIE'S
                        <span className="block text-xs font-sans font-medium text-gray-400 -mt-1">INTERNATIONAL REAL ESTATE</span>
                    </a>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 max-w-xs">
                        Your connection to the finest homes and experiences no matter the destination or lifestyle.
                    </p>
                    <h4 className="mt-4 sm:mt-6 text-xs font-semibold text-white tracking-widest">NEVER MISS A MOMENT OF LUXURY</h4>
                    <div className="flex space-x-3 sm:space-x-4 mt-3">
                        <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:border-primary transition duration-200"><i className="fab fa-facebook-f text-sm"></i></a>
                        <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:border-primary transition duration-200"><i className="fab fa-twitter text-sm"></i></a>
                        <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:border-primary transition duration-200"><i className="fab fa-instagram text-sm"></i></a>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="h-48 lg:h-64 w-full bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
                         <img src="https://placehold.co/400x256/262626/d1d5db?text=Luxury+Interior" alt="Luxury Interior" className="object-cover w-full h-full" />
                    </div>
                </div>

                <div className="text-xs sm:text-sm">
                    <div className="border-b border-gray-600 mb-3 sm:mb-4 pb-3 sm:pb-4">
                        <ul className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 font-medium">
                            <li><a href="#" className="hover:text-primary">About Us</a></li>
                            <li><a href="#" className="hover:text-primary">Affiliate Login</a></li>
                            <li><a href="#" className="hover:text-primary">Corporate Directory</a></li>
                            <li><a href="#" className="hover:text-primary">News</a></li>
                            <li><a href="#" className="hover:text-primary">Legal</a></li>
                            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary">Site Map</a></li>
                        </ul>
                    </div>
                    <p className="text-xs text-gray-500 mt-6 sm:mt-10">
                        &copy; 1999 - 2025 Christie's International Real Estate. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
);

const PropertyCard = ({ item, isSaved }) => (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer">
        <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-40 sm:h-48 object-cover" 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/cccccc/333333?text=Image'; }}
        />
        <div className="p-3 sm:p-4 lg:p-5">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg sm:text-xl font-bold text-[#C3903E]">{item.price}</h4>
                {isSaved && (
                    <i className="far fa-heart text-gray-400 hover:text-red-500 cursor-pointer text-base sm:text-lg transition-colors p-1 sm:p-2"></i>
                )}
            </div>
            <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h5>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{item.location}</p>
            <div className="flex text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 space-x-3 sm:space-x-4 border-t pt-2 sm:pt-3">
                <span><i className="fas fa-bed mr-1"></i> {item.beds || '-'}</span>
                <span><i className="fas fa-bath mr-1"></i> {item.baths || '-'}</span>
                <span className="hidden xs:inline"><i className="fas fa-ruler-combined mr-1"></i> {item.sqft || '-'}</span>
            </div>
        </div>
    </div>
);

const NoResults = ({ type }) => (
    <div className="text-center py-10 sm:py-16 lg:py-20 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 shadow-inner">
        <i className="fas fa-box-open text-4xl sm:text-5xl lg:text-6xl text-gray-300 mb-3 sm:mb-4"></i>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700">No {type} found</h3>
        <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-2 px-4">Looks like you haven't saved or recorded any {type} yet. Start exploring!</p>
    </div>
);



const ProfileView = () => {
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        postal_code: '',
        street: '',
        city: '',
        state: '',
        country: '',
    });

    const [password, setPassword] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [id, setId] = useState(''); // Replace with actual user ID retrieval logic

    // useEffect(() => {
    //     axiosClient.get('/user')
    //     .then(({ data }) => {
    //         // console.log('User data fetched:', data);
    //         setData(data);
    //         setId(data.id);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //     });
    // }, []);

    useEffect(() => {
        axiosClient.get('/user')
        .then(({ data }) => {
        // Normalize to ensure all fields are strings
        const safeData = {
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            phone: data.phone || '',
            postal_code: data.postal_code || '',
            street: data.street || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || '',
        };
        setData(safeData);
        setId(data.id);
        })
        .catch((error) => {
        console.error('Error fetching user data:', error);
        });
    }, []); // ✅ run only once

    // HANDLES UPDATE PROFILE SUBMISSION
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting profile data:', data);
        setLoading(true);
        
        const payload = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, String(value ?? '')])
        );

        axiosClient.post(`/users/${id}/update`, payload)
        .then(({ data }) => {
            alert('Profile updated successfully!');
            setLoading(false);
            setSuccessMessage(data.message || "Profile updated successfully!");
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            setLoading(false);

            if (error.response && error.response.data && error.response.data.errors) {
                // Laravel validation errors exist
                setErrors(error.response.data.errors);
            } else {
                // fallback for other unexpected errors
                setErrors({ general: ['Failed to update user data. Please try again.'] });
            }

            // Automatically clear errors after 5 seconds
            setTimeout(() => {
                setErrors({});
            }, 5000);
        });
    };

    // HANDLES FORM INPUT CHANGES
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // HANDLES FORM INPUT CHANGES FOR PASSWORD
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // HANDLES PASSWORD UPDATE SUBMISSION
    const handlePasswordSubmission = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axiosClient.put(`/users/${id}/change-password`, password)
        .then(({ data }) => {
            setPassword({
                current_password: '',
                password: '',
                password_confirmation: ''
            });
            setIsLoading(false);
            setSuccessMessage(data.message || "Profile updated successfully!");
        })
        .catch((error) => {
            console.error('Error updating password:', error);
            setIsLoading(false);

            if (error.response && error.response.data && error.response.data.errors) {
                // Laravel validation errors exist
                setErrors(error.response.data.errors);
            } else {
                // fallback for other unexpected errors
                setErrors({ general: ['Failed to update password. Please try again.'] });
            }

            // Automatically clear errors after 5 seconds
            setTimeout(() => {
                setErrors({});
            }, 5000);
        });
    }

    return (
        <div className="bg-white p-4 sm:p-6 lg:p-8 border border-gray-200 rounded-lg sm:rounded-xl shadow-lg">
            <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6">User Profile Details</h3>
            <div>

                {successMessage && <SuccessMessage message={successMessage} />}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">First Name</span>
                            <input name='first_name' value={data.first_name} onChange={handleFormChange} type="text" defaultValue="Jane Doe" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Last Name</span>
                            <input name='last_name' value={data.last_name} onChange={handleFormChange}  type="text" defaultValue="Jane Doe" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Email Address</span>
                            <input name='email' value={data.email} onChange={handleFormChange}  type="email" defaultValue="jane.doe@example.com" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Phone Number</span>
                            <input name='phone' value={data.phone} onChange={handleFormChange}  type="text" defaultValue="+1 (555) 123-4567" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Postal Code</span>
                            <input name='postal_code' value={data.postal_code} onChange={handleFormChange}  type="text" defaultValue="123-4567" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Street</span>
                            <input name='street' value={data.street} onChange={handleFormChange}  type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">City</span>
                            <input name='city' value={data.city} onChange={handleFormChange}  type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">State</span>
                            <input name='state' value={data.state} onChange={handleFormChange}  type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Country</span>
                            <input name='country' value={data.country} onChange={handleFormChange}  type="text" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                    </div>
                </div>

                <button onClick={handleSubmit} className="mt-6 sm:mt-8 bg-[#C3903E] hover:bg-[#AF8238] text-white px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-200 shadow-md w-full md:w-auto">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>


                <div className="mt-3 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-3 sm:space-y-4 pt-4 md:pt-0 border-t md:border-t-0 mt-4 md:mt-0">
                        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2 mb-2">Change Password</h4>

                        {Object.keys(errors).length > 0 && <Errors errors={errors} />}
                        {successMessage && <SuccessMessage message={successMessage} />}


                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Current Password</span>
                            <input name='current_password' value={password.current_password} onChange={handlePasswordChange} type="password" placeholder="Current Password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">New Password</span>
                            <input name='password' value={password.password} onChange={handlePasswordChange} type="password" placeholder="New Password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <label className="block">
                            <span className="text-sm sm:text-base text-gray-700 font-medium">Confirm New Password</span>
                            <input name='password_confirmation' value={password.password_confirmation} onChange={handlePasswordChange} type="password" placeholder="Confirm New Password" className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 sm:p-3 text-sm sm:text-base focus:ring-primary focus:border-primary" />
                        </label>

                        <button onClick={handlePasswordSubmission} className="mt-6 sm:mt-8 bg-[#C3903E] hover:bg-[#AF8238] text-white px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-200 shadow-md w-full md:w-auto">
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};




const PropertyListView = ({ data, title, isSaved }) => {
    if (data.length === 0) {
        return <NoResults type={title.toLowerCase().includes('rental') ? 'rental properties' : 'purchase records'} />;
    }

    return (
        <>
            <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6 lg:mb-8 text-gray-800">{title} ({data.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                {data.map(item => (
                    <PropertyCard key={item.id} item={item} isSaved={isSaved} />
                ))}
            </div>
        </>
    );
};

const SavedSearchesView = ({ data }) => {
    if (data.length === 0) {
        return <NoResults type="saved searches" />;
    }

    return (
        <>
            <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6 lg:mb-8 text-gray-800">Your Saved Searches ({data.length})</h3>
            <div className="space-y-3 sm:space-y-4">
                {data.map(s => (
                    <div key={s.id} className="bg-white p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-lg sm:rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md hover:shadow-lg transition duration-200">
                        <div className="flex-grow min-w-0 mb-3 sm:mb-0">
                            <p className="font-semibold text-sm sm:text-base text-gray-900 break-words">{s.criteria}</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Last saved: {s.date}</p>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 w-full sm:w-auto">
                            <button className="text-[#C3903E] hover:text-[#AF8238] text-xs sm:text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition duration-200 flex-1 sm:flex-none">
                                <i className="fas fa-edit mr-1"></i> Edit
                            </button>
                            <button className="text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition duration-200 flex-1 sm:flex-none">
                                <i className="fas fa-trash-alt mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const SoldHousesView = ({ data }) => {
    if (data.length === 0) {
        return <NoResults type="sales records" />;
    }

    return (
        <>
            <h3 className="text-xl sm:text-2xl font-serif mb-4 sm:mb-6 lg:mb-8 text-gray-800">Your House Sales History ({data.length})</h3>
            <div className="space-y-3 sm:space-y-4">
                {data.map(s => (
                    <div key={s.id} className="bg-white p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-lg sm:rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md hover:shadow-lg transition duration-200">
                        <div className="mb-2 sm:mb-0">
                            <p className="font-bold text-gray-900 text-base sm:text-lg">{s.title}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Location: {s.location}</p>
                            <p className="text-lg sm:text-xl font-semibold text-[#C3903E] mt-2">Sold for: {s.price}</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 flex-shrink-0 text-left sm:text-right">Sold on: {s.date}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

const DashboardNav = ({ currentView, setCurrentView }) => {
    const navItems = [
        { key: 'profile', title: 'My Profile', description: 'Manage your contact information and password here.' },
        { key: 'saved-properties', title: 'Saved Properties', description: 'Manage your saved properties here.' },
        { key: 'saved-searches', title: 'Saved Searches', description: 'Save your search criteria and get notified.' },
        { key: 'house-rent', title: 'House Rent', description: 'View history of properties you have rented.' },
        { key: 'apartments-bought', title: 'Apartments Bought', description: 'View history of apartments purchased.' },
        { key: 'house-sold', title: 'House Sold', description: 'Track and view details of houses sold.' },
    ];

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {navItems.map(item => (
                <div
                    key={item.key}
                    onClick={() => setCurrentView(item.key)}
                    className={`
                        bg-gray-50 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border border-gray-200 transition duration-300 cursor-pointer shadow-sm
                        hover:shadow-lg hover:translate-y-[-2px]
                        ${currentView === item.key ? 'bg-white ring-2 ring-[#C3903E] border-[#C3903E] shadow-xl' : ''}
                    `}
                >
                    <h3 className="text-sm sm:text-base lg:text-xl font-semibold mb-1 sm:mb-2 text-gray-900 leading-tight">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-tight line-clamp-2">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

const AppContent = ({ currentView }) => {
    const data = MOCK_DATA[currentView] || [];
    
    switch (currentView) {
        case 'profile':
            return <ProfileView />;
        case 'saved-properties':
            return <PropertyListView data={data} title="Your Saved Properties" isSaved={true} />;
        case 'saved-searches':
            return <SavedSearchesView data={data} />;
        case 'house-rent':
            return <PropertyListView data={data} title="Your Rental History" isSaved={false} />;
        case 'apartments-bought':
            return <PropertyListView data={data} title="Your Apartment Purchase History" isSaved={false} />;
        case 'house-sold':
            return <SoldHousesView data={data} />;
        default:
            return (
                <div className="text-center py-8 sm:py-10 bg-gray-50 rounded-lg sm:rounded-xl">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 px-4">Welcome to your Account Dashboard!</h3>
                    <p className="text-sm sm:text-base text-gray-500 mt-2 px-4">Select an option above to manage your account details and property interests.</p>
                </div>
            );
    }
}

export default function App() {
    const [currentView, setCurrentView] = useState('apartments-bought'); 
    const {user} = useStateContext();
    const navigate = useNavigate();

    // checks if user is admin and redirects him to admin page
    useEffect(() => {
        // if (user?.email === 'admin@gmail.com') {
        //     navigate("/admin");
        // }

        // if (user?.is_admin) {
        //     navigate("/admin");
        // }

        if (!user || !user.is_admin) {
            navigate("/dashboard");
        }
        
    }, [user, navigate]); 

    if (!localStorage.getItem('ACCESS_TOKEN')) {
        return <div className="text-center p-4 text-red-600">
            Please log in to your account
        </div>;
    }

    return (
        <div 
            className="bg-white min-h-screen flex flex-col font-sans"
            style={{ 
                '--primary-color': PRIMARY_COLOR,
                '--footer-bg': FOOTER_BG
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Georgia:wght@400;700&display=swap');
                
                .font-serif { font-family: 'Georgia', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 4px; }
                ::-webkit-scrollbar-track { background: #f3f4f6; }
                
                .bg-\\[\\#C3903E\\] { background-color: ${PRIMARY_COLOR}; }
                .text-\\[\\#C3903E\\] { color: ${PRIMARY_COLOR}; }
                .ring-\\[\\#C3903E\\] { --tw-ring-color: ${PRIMARY_COLOR}; }
                .border-\\[\\#C3903E\\] { border-color: ${PRIMARY_COLOR}; }
                .hover\\:bg-\\[\\#AF8238\\]:hover { background-color: #AF8238; }
                .bg-\\[\\#191919\\] { background-color: ${FOOTER_BG}; }
                
                .line-clamp-1 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }
                .line-clamp-2 {
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                
                @media (min-width: 475px) {
                    .xs\\:inline { display: inline; }
                    .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
            `}</style>

            <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 w-full">

                <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 lg:mb-6 font-medium">
                    <a href="#" className="hover:underline">Home</a> &gt; My Account
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 mb-4 sm:mb-6 lg:mb-10">My Account</h2>

                <WelcomeMessage user={user} />
                
                <DashboardNav 
                    currentView={currentView} 
                    setCurrentView={setCurrentView} 
                />
                
                <div id="dashboard-content">
                    <AppContent currentView={currentView} />
                </div>

            </main>

            {/* <Footer /> */}
        </div>
    );
}