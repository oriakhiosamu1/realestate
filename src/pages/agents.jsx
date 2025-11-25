import React, { useState, useMemo } from "react";
import { Mail, Phone, Search, MapPin, ChevronLeft, ChevronRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

// --- Constants ---
const AGENTS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

// Shared class for contact buttons to match the gold-border look from the screenshot
const GOLD_BUTTON_CLASSES = "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm border border-yellow-300 rounded-md text-gray-700 hover:bg-yellow-50 hover:border-yellow-600 transition duration-200";

// --- 1. Enhanced Agent Data Structure ---
// NOTE: I've added enough agents to demonstrate pagination logic effectively
const initialAgents = [
  { name: "Eric Walstrom", license: "6502382714 (MI)", affiliation: "Properties REMI Christie's International Real Estate", location: "Birmingham, MI", languages: ["English", "Spanish"], image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=500&auto=format&fit=crop", email: "eric@luxestates.com", phone: "+1 248 555 1234", isMasterCircle: true, },
  { name: "Alex J. Irrer", license: "6502382715 (MI)", affiliation: "Properties REMI Christie's International Real Estate", location: "Birmingham, MI", languages: ["English"], image: "https://images.unsplash.com/photo-1603415526960-f7e0328a4531?q=80&w=500&auto=format&fit=crop", email: "alex@luxestates.com", phone: "+1 248 555 5678", isMasterCircle: true, },
  { name: "Corey Hasting", license: "SK3133787 (FL)", affiliation: "Christie's International Real Estate First Coast", location: "Atlantic Beach, FL", languages: ["English"], image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop", email: "corey@luxestates.com", phone: "+1 904 555 9012", isMasterCircle: false, },
  { name: "Maya Kandrova", license: "444555666 (SP)", affiliation: "Christie's International Real Estate Costa Del Sol", location: "Marbella, Spain", languages: ["English", "Spanish", "Russian"], image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop", email: "maya@luxestates.com", phone: "+34 987 654 321", isMasterCircle: true, },
  { name: "Erik Vashbinder", license: "123456789 (SP)", affiliation: "Christie's International Real Estate Costa Del Sol", location: "Marbella, Spain", languages: ["German", "English", "Spanish"], image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop", email: "erik@luxestates.com", phone: "+34 600 111 222", isMasterCircle: true, },
  { name: "Scott Strellnauer", license: "RRE-BRO-LUC-940 (MT)", affiliation: "PureWest Christie's International Real Estate", location: "Whitefish, MT", languages: ["English"], image: "https://images.unsplash.com/photo-1506794778202-dfa688970220?q=80&w=500&auto=format&fit=crop", email: "scott@luxestates.com", phone: "+1 406 555 3344", isMasterCircle: false, },
  // Additional Agents for multiple pages
  { name: "Maxime Dubus", license: "SPG 01 (FR)", affiliation: "SPG ONE SA Christie's International Real Estate", location: "Geneva, Switzerland", languages: ["English", "French"], image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=500&auto=format&fit=crop", email: "maxime@luxestates.com", phone: "+41 22 731 0101", isMasterCircle: true, },
  { name: "Olga Garcia Hernandez", license: "900111 (ES)", affiliation: "Global Asset Properties, Madrid", location: "Madrid, Spain", languages: ["English", "Spanish", "French"], image: "https://images.unsplash.com/photo-1596815967073-fa7b49463c7c?q=80&w=500&auto=format&fit=crop", email: "olga@luxestates.com", phone: "+34 912 345 678", isMasterCircle: true, },
  { name: "Jane Doe", license: "112233 (CA)", affiliation: "Calgary Luxury Homes", location: "Calgary, Canada", languages: ["English"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop", email: "jane@luxestates.com", phone: "+1 403 111 2222", isMasterCircle: false, },
  { name: "Kenzi Smith", license: "778899 (AU)", affiliation: "Sydney Waterfront Assets", location: "Sydney, Australia", languages: ["English"], image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop", email: "kenzi@luxestates.com", phone: "+61 2 9000 1111", isMasterCircle: true, },
];


// --- 2. Agent Card Component (Refined to match visual layout) ---
const AgentCard = ({ agent, index }) => {
    const imgSrc = agent.image || `https://placehold.co/600x600/F9FAFB/333333?text=${agent.name.split(' ').map(n => n[0]).join('')}`;

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08 } }
    };

    return (
        <motion.div
            className="flex bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition hover:shadow-xl duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
        >
            {/* Agent Image - Fixed width on desktop, flexible on mobile */}
            <div className="w-1/3 min-w-[120px] max-w-[200px] flex-shrink-0">
                <img
                    src={imgSrc}
                    alt={agent.name}
                    className="w-full h-full aspect-[4/5] object-cover" 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x500/F9FAFB/333333?text=${agent.name.split(' ').map(n => n[0]).join('')}`;
                    }}
                />
            </div>
            
            {/* Agent Details */}
            <div className="p-4 sm:p-5 flex flex-col justify-between w-full">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-0.5">{agent.name}</h3>
                    
                    {/* License Details */}
                    <p className="text-sm text-gray-500 mb-1">
                        License No. <span className="font-medium text-gray-700">{agent.license}</span>
                    </p>
                    
                    {/* Affiliation */}
                    <p className="text-sm text-gray-600 mb-2">{agent.affiliation}</p>

                    {/* Location & Languages */}
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                        <MapPin size={12} className="mr-1 text-gray-400" />
                        {agent.location}
                    </div>

                    {agent.languages && agent.languages.length > 0 && (
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold">Speaks:</span> {agent.languages.join(', ')}
                        </p>
                    )}
                </div>

                {/* Contact Buttons */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <a href={`tel:${agent.phone}`} className={GOLD_BUTTON_CLASSES} title={`Call ${agent.name}`}>
                        <Phone size={16} /> Call
                    </a>
                    <a href={`mailto:${agent.email}`} className={GOLD_BUTTON_CLASSES} title={`Email ${agent.name}`}>
                        <Mail size={16} /> Email
                    </a>
                </div>
            </div>
        </motion.div>
    );
};


// --- 3. Pagination Component (Styled to match the second screenshot) ---
const Pagination = ({ totalAgents, agentsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalAgents / agentsPerPage);

    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
        
        // Adjust start if we hit the end bound
        const finalStartPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);

        for (let i = finalStartPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`text-sm px-2 pb-0.5 text-gray-700 font-medium transition duration-200 ${
                        i === currentPage 
                            ? 'border-b-2 border-yellow-600' 
                            : 'hover:text-yellow-600'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Add '...' if necessary
        if (endPage < totalPages) {
            pages.push(<span key="ellipsis" className="text-sm px-2 text-gray-500 pb-0.5">...</span>);
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className="text-sm px-2 pb-0.5 text-gray-700 font-medium hover:text-yellow-600 transition duration-200"
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    const ChevronButton = ({ direction, disabled, onClick }) => {
        const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition duration-300 ${
                    disabled
                        ? 'border-gray-200 text-gray-400'
                        : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'
                }`}
            >
                <Icon size={20} />
            </button>
        );
    };

    return (
        <div className="flex justify-center items-center space-x-3 mt-10">
            <ChevronButton 
                direction="left"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />
            
            <div className="flex items-end space-x-3 h-10">
                {renderPageNumbers()}
            </div>
            
            <ChevronButton 
                direction="right"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </div>
    );
};

// --- 4. Main Application Component ---
const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isMasterCircle, setIsMasterCircle] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Reset page when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, isMasterCircle]);

    // 1. Filter Agents based on search and toggle
    const filteredAgents = useMemo(() => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return initialAgents.filter(agent => {
            const matchesSearch = agent.name.toLowerCase().includes(lowerSearchTerm) ||
                                  agent.location.toLowerCase().includes(lowerSearchTerm) ||
                                  agent.affiliation.toLowerCase().includes(lowerSearchTerm) ||
                                  (agent.languages && agent.languages.some(lang => lang.toLowerCase().includes(lowerSearchTerm)));
            
            const matchesFilter = !isMasterCircle || agent.isMasterCircle;

            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, isMasterCircle]);

    // 2. Paginate the filtered results
    const paginatedAgents = useMemo(() => {
        const startIndex = (currentPage - 1) * AGENTS_PER_PAGE;
        const endIndex = startIndex + AGENTS_PER_PAGE;
        return filteredAgents.slice(startIndex, endIndex);
    }, [filteredAgents, currentPage]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handlePageChange = (page) => {
        if (page > 0 && page <= Math.ceil(filteredAgents.length / AGENTS_PER_PAGE)) {
            setCurrentPage(page);
        }
    };


    return (
        <div className="min-h-screen bg-white font-sans">
            <header className="pt-8 pb-4 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif text-gray-900 tracking-tight">
                        Real Estate Agents Worldwide
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* --- Search and Filter Header (Matches Screenshot) --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    {/* Search Input and Button */}
                    <div className="flex-grow flex w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search by Location, Language, or Agent Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="flex-grow p-3 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                        />
                        <button className="bg-yellow-600 hover:bg-yellow-700 px-5 flex items-center rounded-r-lg transition duration-150">
                            <Search size={20} className="text-white" />
                        </button>
                    </div>

                    {/* Master Circle Toggle */}
                    <button
                        onClick={() => setIsMasterCircle(!isMasterCircle)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-yellow-600 transition duration-300 whitespace-nowrap"
                        title="Toggle Masters Circle Agents"
                    >
                        Masters Circle
                        <div 
                           className={`w-10 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                               isMasterCircle ? 'bg-yellow-500' : 'bg-gray-300'
                           }`}
                        >
                            <span 
                                className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                    isMasterCircle ? 'translate-x-4' : 'translate-x-0'
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* --- Results Count --- */}
                <div className="mb-6 py-2 border-b border-gray-200">
                    <p className="text-base font-semibold text-gray-700">
                        {filteredAgents.length} Agents
                    </p>
                </div>

                {/* --- Agent Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {paginatedAgents.length > 0 ? (
                        paginatedAgents.map((agent, index) => (
                            <AgentCard key={agent.license} agent={agent} index={index} />
                        ))
                    ) : (
                        <div className="lg:col-span-2 text-center py-16 bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                            <Search size={32} className="mx-auto mb-4" />
                            <p className="text-xl font-medium">No agents match your criteria.</p>
                            <p>Try adjusting your filters or search term.</p>
                        </div>
                    )}
                </div>
                
                {/* --- Pagination --- */}
                <Pagination
                    totalAgents={filteredAgents.length}
                    agentsPerPage={AGENTS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </main>
        </div>
    );
};

export default App;