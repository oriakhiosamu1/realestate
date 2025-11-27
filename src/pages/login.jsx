// import React, { useEffect, useState } from 'react';
// import { Search, Map, User, ChevronDown, Menu, X } from 'lucide-react';
// import axiosClient from '../axiosClient/axiosClient';
// import Errors from '../components/Errors.jsx';
// import { useNavigate } from 'react-router-dom';
// import { useStateContext } from '../context/ContextProvider';
// import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

// // Component for the Input fields used in the form
// const FormInput = ({ label, type = 'text', handleChange, name, value }) => (
//   <div className="mb-4">
//     <label htmlFor={label} className="text-sm font-semibold text-gray-800 sr-only">{label}</label>
//     <input
//       type={type}
//       id={label}
//       name={name}
//       value={value}
//       placeholder={label}
//       onChange={handleChange}
//       className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
//     />
//   </div>
// );

// const FormInputLogin = ({ label, type = 'text', handleChange, name, value }) => (
//   <div className="mb-4">
//     <label htmlFor={label} className="text-sm font-semibold text-gray-800 sr-only">{label}</label>
//     <input
//       type={type}
//       id={label}
//       name={name}
//       value={value}
//       placeholder={label}
//       onChange={handleChange}
//       className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
//     />
//   </div>
// );

// // Component for the Right Panel Benefits
// const BenefitsPanel = () => (
//   <div className="bg-white rounded-lg shadow-2xl relative overflow-hidden h-full min-h-[500px]">
//     {/* Background Image - Beautiful luxury interior */}
//     <div
//       className="absolute inset-0 z-0 bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80')`,
//       }}
//     />
//     {/* Dark overlay for better text readability */}
//     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0"></div>
    
//     <div className="relative z-10 text-white p-8 h-full flex flex-col justify-end">
//       <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg">
//         <h2 className="text-2xl font-serif mb-6 text-center">Benefits of Registering</h2>
        
//         {/* Benefit 1 */}
//         <div className="mb-5">
//           <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">SAVE LISTINGS</h3>
//           <p className="text-sm text-gray-200 leading-relaxed">Save listings and schedule to receive Email Alerts if the Saved Listing has an Open House or Price Reduction.</p>
//         </div>
        
//         {/* Benefit 2 */}
//         <div className="mb-5">
//           <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">SAVE SEARCHES</h3>
//           <p className="text-sm text-gray-200 leading-relaxed">Save Searches and schedule to receive Email Alerts of New Listings, Open Houses, or Price Reductions for listings matching your Saved Search Criteria.</p>
//         </div>
        
//         {/* Benefit 3 */}
//         <div>
//           <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">AUTO-FILLED EMAILS</h3>
//           <p className="text-sm text-gray-200 leading-relaxed">Email Forms are completed automatically with your User Profile information for faster, easily submissions.</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );




// // Main Application Component========================================================================================================================================
// const App = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();
//   const {setUser, setToken, user} = useStateContext();

//   const [login, setLogin] = useState({
//     email: "",
//     password: ""
//   });

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     phone: "",
//     email: "",
//     password: "",
//     password_confirmation: ""
//   });

//   // Universal change handler==========================================================================================================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Login form change handler=========================================================================================================================================
//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;

//     setLogin((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }

//   // handles form submission=========================================================================================================================================
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     setLoading(true);

//     axiosClient.post('/register', formData)
//       .then(({ data }) => {
//         console.log('Registration successful:', data);
//         setLoading(false);
//         setUser(data.user);
//         setToken(data.token);
//         navigate('/dashboard');
//       })
//       .catch((error) => {
//         console.error('Registration error:', error);

//         const responseErrors = error.response;
//         const msg = responseErrors?.data?.message || "Something went wrong";

//         if (responseErrors?.status === 401) {
//           setErrors({ general: [msg] });
//         } else {
//           setErrors({ email: [msg] });
//         }

//         setLoading(false);
//       });
//   }

//   // handles login submission=========================================================================================================================================
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     axiosClient.post('/login', login)
//     .then(({ data }) => {
//       console.log('Login was successful:', data);
//       setLoading(false);
//       setUser(data.user);
//       setToken(data.token);

//       if (data.user.is_admin) {
//         navigate("/admin");
//       } else {
//         navigate("/dashboard");
//       }

//       // navigate('/dashboard');
//     })
//     .catch((error) => {
//       console.error('Login error:', error);

//       const responseErrors = error.response;
//       const msg = responseErrors?.data?.message || "Something went wrong";

//       if (responseErrors?.status === 401) {
//         setErrors({ general: [msg] });
//       } else {
//         setErrors({ email: [msg] });
//       }

//       setLoading(false);
//     });
//   }

//   // auto-clear errors after 5 seconds=========================================================================================================================================
//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       const timer = setTimeout(() => setErrors({}), 5000);
//       return () => clearTimeout(timer); // cleanup if errors change
//     }
//   }, [errors]);

//   const handleToggle = (e) => {
//     e.preventDefault();
//     setIsRegister(!isRegister);
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       {/* Main Registration/Login Content */}
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
//           {/* Left Column - Form */}
//           <div className="lg:order-1 order-2">
//             <div className="max-w-md mx-auto lg:mx-0">
//               <h2 className="text-2xl font-light text-gray-800 mb-8 text-center lg:text-left">
//                 {isRegister ? 'Register Today!' : 'Sign In'}
//               </h2>

//               {isRegister ? (
//                 // --- Register Form ---
//                 <div>
//                   <FormInput label="First Name*" handleChange={handleChange} name='first_name' value={formData.first_name} />
//                   <FormInput label="Last Name*" handleChange={handleChange} name='last_name' value={formData.last_name} />
//                   <FormInput label="Phone with Country Code" handleChange={handleChange} name='phone' value={formData.phone} />
//                   <FormInput label="Email Address*" type="email" handleChange={handleChange} name='email' value={formData.email} />
//                   <FormInput label="Password*" type="password" handleChange={handleChange} name='password' value={formData.password} />
//                   <FormInput label="Confirm Password*" type="password" handleChange={handleChange} name='password_confirmation' value={formData.password_confirmation} />

//                   {/* Legal Text */}
//                   <p className="text-xs text-gray-500 mt-6 mb-4 leading-relaxed">
//                     By joining this site you agree to our <a href="#" className="text-amber-700 hover:text-amber-800 font-semibold underline">Terms and Conditions</a> and our <a href="#" className="text-amber-700 hover:text-amber-800 font-semibold underline">Privacy Policy</a>.
//                   </p>

//                   {Object.keys(errors).length > 0 && <Errors errors={errors} />}

//                   {/* Sign Up Button (Tan Color) */}
//                   <button
//                     onClick={handleSubmit}
//                     className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 uppercase text-sm tracking-widest"
//                   >
//                     {/* {loading ? 'Registering...' : 'Sign Up'} */}
//                     {loading ? (<ClipLoader size={20} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Sign Up</>)}
//                   </button>

//                   {/* Already have an account link */}
//                   <p className="text-center text-sm text-gray-600 mt-6">
//                     Already have an account? <a href="#" onClick={handleToggle} className="text-amber-700 hover:text-amber-800 font-semibold">Sign In</a>.
//                   </p>
//                 </div>
//               ) : (
//                 // --- Login Form (Simplified) ---
//                 <div>
//                   <FormInputLogin label="Email Address" type="email"  handleChange={handleLoginChange} name='email' value={login.email} />
//                   <FormInputLogin label="Password" type="password" handleChange={handleLoginChange} name='password' value={login.password} />

//                   {Object.keys(errors).length > 0 && <Errors errors={errors} />}
                  
//                   <button
//                     onClick={handleLogin}
//                     className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 uppercase text-sm tracking-widest mt-6"
//                   >
//                     {/* {loading ? 'Logging in...' : 'Sign In'} */}
//                     {loading ? (<BeatLoader size={10} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Sign In</>)}
//                   </button>
                  
//                   <p className="text-center text-sm text-gray-600 mt-6">
//                     Need an account? <a href="#" onClick={handleToggle} className="text-amber-700 hover:text-amber-800 font-semibold">Register Today!</a>
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Image and Benefits */}
//           <div className="lg:order-2 order-1 min-h-[400px]">
//             <BenefitsPanel />
//           </div>
//         </div>
//       </main>

//       {/* --- Footer Email Subscription Section --- */}
//       {/* <section className="border-t border-gray-200 mt-10 pt-10 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-5xl mx-auto">
//           <h3 className="text-xl font-light text-gray-800 mb-6">
//             Get luxury real estate updates in your inbox
//           </h3>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
//             <input
//               type="email"
//               placeholder="Email Address*"
//               className="flex-grow p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
//             />
//             <button className="py-2 px-6 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 text-sm">
//               Subscribe
//             </button>
//           </div>
          
//           <p className="text-xs text-gray-400 mt-4 leading-tight">
//             This site is protected by reCAPTCHA and the Google <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a> apply.
//           </p>
//         </div>
//       </section> */}
//     </div>
//   );
// };

// export default App;






import React, { useEffect, useState } from 'react';
import { Search, Map, User, ChevronDown, Menu, X, Eye, EyeOff } from 'lucide-react';
import axiosClient from '../axiosClient/axiosClient';
import Errors from '../components/Errors.jsx';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

// Component for the Input fields used in the form
const FormInput = ({ label, type = 'text', handleChange, name, value }) => (
  <div className="mb-4">
    <label htmlFor={label} className="text-sm font-semibold text-gray-800 sr-only">{label}</label>
    <input
      type={type}
      id={label}
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
    />
  </div>
);

const FormInputLogin = ({ label, type = 'text', handleChange, name, value }) => (
  <div className="mb-4">
    <label htmlFor={label} className="text-sm font-semibold text-gray-800 sr-only">{label}</label>
    <input
      type={type}
      id={label}
      name={name}
      value={value}
      placeholder={label}
      onChange={handleChange}
      className="w-full p-2 border-b border-gray-300 focus:border-amber-700 focus:ring-0 outline-none placeholder-gray-500 text-sm"
    />
  </div>
);

// Component for the Right Panel Benefits
const BenefitsPanel = () => (
  <div className="bg-white rounded-lg shadow-2xl relative overflow-hidden h-full min-h-[500px]">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80')`,
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0"></div>
    
    <div className="relative z-10 text-white p-8 h-full flex flex-col justify-end">
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg">
        <h2 className="text-2xl font-serif mb-6 text-center">Benefits of Registering</h2>
        
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">SAVE LISTINGS</h3>
          <p className="text-sm text-gray-200 leading-relaxed">Save listings and schedule to receive Email Alerts if the Saved Listing has an Open House or Price Reduction.</p>
        </div>
        
        <div className="mb-5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">SAVE SEARCHES</h3>
          <p className="text-sm text-gray-200 leading-relaxed">Save Searches and schedule to receive Email Alerts of New Listings, Open Houses, or Price Reductions for listings matching your Saved Search Criteria.</p>
        </div>
        
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-yellow-400">AUTO-FILLED EMAILS</h3>
          <p className="text-sm text-gray-200 leading-relaxed">Email Forms are completed automatically with your User Profile information for faster, easily submissions.</p>
        </div>
      </div>
    </div>
  </div>
);

// Main Application Component
const App = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken, user } = useStateContext();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  // Universal change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Login form change handler
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  // handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosClient.post('/register', formData)
      .then(({ data }) => {
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        const responseErrors = error.response;
        const msg = responseErrors?.data?.message || "Something went wrong";
        setErrors(responseErrors?.status === 401 ? { general: [msg] } : { email: [msg] });
        setLoading(false);
      });
  };

  // handles login submission
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosClient.post('/login', login)
      .then(({ data }) => {
        setLoading(false);
        setUser(data.user);
        setToken(data.token);
        navigate(data.user.is_admin ? "/admin" : "/dashboard");
      })
      .catch((error) => {
        const responseErrors = error.response;
        const msg = responseErrors?.data?.message || "Something went wrong";
        setErrors(responseErrors?.status === 401 ? { general: [msg] } : { email: [msg] });
        setLoading(false);
      });
  };

  // auto-clear errors after 5 seconds
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="lg:order-1 order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              <h2 className="text-2xl font-light text-gray-800 mb-8 text-center lg:text-left">
                {isRegister ? 'Register Today!' : 'Sign In'}
              </h2>

              {isRegister ? (
                <div>
                  <FormInput label="First Name*" handleChange={handleChange} name='first_name' value={formData.first_name} />
                  <FormInput label="Last Name*" handleChange={handleChange} name='last_name' value={formData.last_name} />
                  <FormInput label="Phone with Country Code" handleChange={handleChange} name='phone' value={formData.phone} />
                  <FormInput label="Email Address*" type="email" handleChange={handleChange} name='email' value={formData.email} />

                  <div className="mb-4 relative">
                    <FormInput
                      label="Password*"
                      type={showPassword ? "text" : "password"}
                      handleChange={handleChange}
                      name='password'
                      value={formData.password}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                  </div>

                  <div className="mb-4 relative">
                    <FormInput
                      label="Confirm Password*"
                      type={showPassword ? "text" : "password"}
                      handleChange={handleChange}
                      name='password_confirmation'
                      value={formData.password_confirmation}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 mb-4 leading-relaxed">
                    By joining this site you agree to our <a href="#" className="text-amber-700 hover:text-amber-800 font-semibold underline">Terms and Conditions</a> and our <a href="#" className="text-amber-700 hover:text-amber-800 font-semibold underline">Privacy Policy</a>.
                  </p>

                  {Object.keys(errors).length > 0 && <Errors errors={errors} />}

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 uppercase text-sm tracking-widest"
                  >
                    {loading ? (<ClipLoader size={20} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Sign Up</>)}
                  </button>

                  <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <a href="#" onClick={handleToggle} className="text-amber-700 hover:text-amber-800 font-semibold">Sign In</a>.
                  </p>
                </div>
              ) : (
                <div>
                  <FormInputLogin label="Email Address" type="email"  handleChange={handleLoginChange} name='email' value={login.email} />

                  <div className="mb-4 relative">
                    <FormInputLogin
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      handleChange={handleLoginChange}
                      name='password'
                      value={login.password}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                  </div>

                  {Object.keys(errors).length > 0 && <Errors errors={errors} />}
                  
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-[#D4C39B] hover:bg-[#c9b489] text-white font-semibold rounded-md shadow-md transition duration-200 uppercase text-sm tracking-widest mt-6"
                  >
                    {loading ? (<BeatLoader size={10} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Sign In</>)}
                  </button>
                  
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Need an account? <a href="#" onClick={handleToggle} className="text-amber-700 hover:text-amber-800 font-semibold">Register Today!</a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:order-2 order-1 min-h-[400px]">
            <BenefitsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
