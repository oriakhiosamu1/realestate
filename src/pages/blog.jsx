import React, { useState } from 'react';
import { X, Calendar, Clock, User, Home, MapPin, Tag } from 'lucide-react';

const RealEstateBlog = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Sample blog posts - this will be replaced with data from admin panel
  const [blogPosts] = useState([
    {
      id: 1,
      title: "Top 10 Home Buying Tips for First-Time Buyers in 2025",
      excerpt: "Purchasing your first home is an exciting milestone. Our expert agents share essential tips to help you navigate the home buying process with confidence and avoid common pitfalls...",
      content: "Purchasing your first home is an exciting milestone. Our expert agents share essential tips to help you navigate the home buying process with confidence and avoid common pitfalls.\n\nStart by getting pre-approved for a mortgage to understand your budget. This shows sellers you're serious and helps you move quickly when you find the right property. Don't skip the home inspection - it can save you thousands by identifying potential issues before you commit.\n\nConsider the neighborhood as much as the house itself. Visit at different times of day, research local schools, and check proximity to amenities. Work with an experienced real estate agent who knows the local market and can negotiate on your behalf.\n\nRemember to budget for closing costs, moving expenses, and immediate home improvements. Your dream home is out there, and with the right preparation, you'll be ready to make it yours.",
      author: "Jennifer Williams",
      date: "2025-10-18",
      readTime: "6 min read",
      category: "Buying Tips",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      location: "General"
    },
    {
      id: 2,
      title: "How to Stage Your Home for a Quick Sale",
      excerpt: "Professional staging can increase your home's value by up to 10%. Learn the secrets our top agents use to make properties irresistible to potential buyers...",
      content: "Professional staging can increase your home's value by up to 10%. Learn the secrets our top agents use to make properties irresistible to potential buyers.\n\nStart by decluttering every room - buyers need to envision their belongings in the space, not yours. Deep clean everything, including carpets, windows, and overlooked areas like baseboards. First impressions matter, so enhance your curb appeal with fresh landscaping and a welcoming entrance.\n\nNeutralize your decor by removing personal photos and bold color choices. Use soft, neutral tones that appeal to a wider audience. Maximize natural light by opening curtains and adding mirrors strategically. Create inviting spaces that showcase each room's purpose.\n\nConsider hiring a professional stager for high-value properties. They know current trends and can transform your home into a showpiece that commands top dollar. Small investments in staging often yield significant returns at closing.",
      author: "Michael Thompson",
      date: "2025-10-15",
      readTime: "5 min read",
      category: "Selling Tips",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop",
      location: "General"
    },
    {
      id: 3,
      title: "Lagos Real Estate Market Trends: What to Expect",
      excerpt: "The Lagos property market continues to evolve. Our market analysis reveals key trends that buyers, sellers, and investors need to know about right now...",
      content: "The Lagos property market continues to evolve. Our market analysis reveals key trends that buyers, sellers, and investors need to know about right now.\n\nProperty values in prime areas like Ikoyi, Victoria Island, and Lekki Phase 1 remain strong, with demand consistently outpacing supply. Emerging neighborhoods like Ajah and Epe are seeing significant development, offering better value for budget-conscious buyers.\n\nThe rental market is robust, particularly for modern apartments with amenities like 24-hour power, security, and parking. Commercial properties in major business districts command premium prices, while co-working spaces are becoming increasingly popular.\n\nInfrastructure improvements, including new road networks and the ongoing coastal development projects, are reshaping the market. Smart investors are positioning themselves in growth corridors before prices surge. Now is an excellent time to enter the market with proper guidance from experienced agents.",
      author: "Chioma Okafor",
      date: "2025-10-12",
      readTime: "8 min read",
      category: "Market Insights",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop",
      location: "Lagos"
    },
    {
      id: 4,
      title: "Investment Properties: Making Your Money Work",
      excerpt: "Real estate remains one of the most reliable investment vehicles. Discover strategies for building wealth through property investment with insights from our investment specialists...",
      content: "Real estate remains one of the most reliable investment vehicles. Discover strategies for building wealth through property investment with insights from our investment specialists.\n\nStart by defining your investment goals - are you seeking rental income, property appreciation, or both? Rental properties provide steady cash flow, while fix-and-flip projects can yield quick returns for experienced investors.\n\nLocation is crucial for investment success. Research areas with strong job growth, good schools, and planned infrastructure improvements. Properties near universities, hospitals, and business districts typically maintain strong rental demand.\n\nCalculate your potential return on investment carefully. Factor in purchase price, renovation costs, property management fees, taxes, and vacancy periods. A good investment property should generate positive cash flow from day one.\n\nDiversify your real estate portfolio across different property types and locations to minimize risk. Consider partnering with experienced investors on larger projects. With patience and the right strategy, real estate can build generational wealth.",
      author: "David Adeleke",
      date: "2025-10-09",
      readTime: "7 min read",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=400&fit=crop",
      location: "General"
    },
    {
      id: 5,
      title: "Understanding Mortgage Options in Nigeria",
      excerpt: "Navigating mortgage financing can be complex. Our financial experts break down the available mortgage options and help you choose the best fit for your situation...",
      content: "Navigating mortgage financing can be complex. Our financial experts break down the available mortgage options and help you choose the best fit for your situation.\n\nNigerian mortgage lenders typically offer conventional mortgages, NHF (National Housing Fund) loans, and equity contribution schemes. NHF loans provide the most affordable rates for eligible contributors, with interest rates significantly lower than commercial mortgages.\n\nYour credit history, income stability, and debt-to-income ratio will determine your eligibility and interest rate. Most lenders require a 30% equity contribution upfront, though some schemes offer lower entry points for first-time buyers.\n\nCompare offers from multiple lenders - interest rates, processing fees, and repayment terms can vary significantly. Consider both fixed-rate and variable-rate mortgages based on your risk tolerance and market outlook.\n\nWork with a mortgage broker who can navigate the application process and negotiate better terms on your behalf. Pre-approval strengthens your negotiating position when making offers on properties.",
      author: "Fatima Hassan",
      date: "2025-10-06",
      readTime: "9 min read",
      category: "Financing",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop",
      location: "Nigeria"
    },
    {
      id: 6,
      title: "Luxury Living: Premium Properties in High Demand",
      excerpt: "The luxury real estate market is thriving. Explore what high-net-worth buyers are looking for and why premium properties are commanding record prices...",
      content: "The luxury real estate market is thriving. Explore what high-net-worth buyers are looking for and why premium properties are commanding record prices.\n\nToday's luxury buyers seek more than just square footage - they want unique architectural designs, smart home technology, and resort-style amenities. Private elevators, wine cellars, home theaters, and infinity pools are standard expectations in the premium segment.\n\nWaterfront properties and homes with panoramic views command the highest premiums. Security is paramount, with gated estates featuring 24/7 surveillance and trained personnel increasingly popular among affluent buyers.\n\nSustainability is trending in luxury real estate. Solar power, rainwater harvesting, and energy-efficient systems appeal to environmentally conscious buyers. Smart home integration allows owners to control everything from lighting to security remotely.\n\nThe best luxury properties combine prime locations with exceptional craftsmanship and exclusive amenities. These homes aren't just residences - they're lifestyle statements that offer unparalleled comfort and prestige.",
      author: "Alexander Okonkwo",
      date: "2025-10-03",
      readTime: "6 min read",
      category: "Luxury Homes",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=400&fit=crop",
      location: "General"
    }
  ]);

  const categories = ['All', 'Buying Tips', 'Selling Tips', 'Market Insights', 'Investment', 'Financing', 'Luxury Homes'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-yellow-800 to-yellow-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Home size={32} className="sm:w-10 sm:h-10" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Real Estate Insights</h1>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-yellow-100 max-w-2xl">
            Expert advice, market trends, and valuable tips from our experienced real estate agents
          </p>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-yellow-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-44 sm:h-48 lg:h-52 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-yellow-800 text-white text-xs font-semibold rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 lg:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 hover:text-yellow-800 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b">
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-yellow-800 sm:w-4 sm:h-4" />
                    <span className="truncate max-w-[120px] sm:max-w-none">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-yellow-800 sm:w-4 sm:h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <Calendar size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <button
                    onClick={() => openModal(post)}
                    className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 text-sm sm:text-base bg-yellow-800 text-white rounded-lg hover:bg-yellow-900 transition-colors duration-200 font-medium shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <Home size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg sm:text-xl">No posts found in this category</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10 rounded-t-xl sm:rounded-t-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2.5 py-1 bg-yellow-800 text-white text-xs font-semibold rounded-full">
                  {selectedPost.category}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1.5 sm:p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {selectedPost.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 pb-4 sm:pb-6 border-b">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <User size={16} className="text-yellow-800 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span className="font-medium truncate max-w-[120px] sm:max-w-none">{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar size={16} className="text-yellow-800 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span className="truncate">{new Date(selectedPost.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock size={16} className="text-yellow-800 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                  <span>{selectedPost.readTime}</span>
                </div>
                {selectedPost.location && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin size={16} className="text-yellow-800 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                    <span>{selectedPost.location}</span>
                  </div>
                )}
              </div>
              
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-lg sm:rounded-xl mb-6 sm:mb-8 shadow-lg"
              />
              
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-6 border-t">
                <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-100">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Need Expert Advice?</h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                    Our experienced real estate agents are here to help you with all your property needs.
                  </p>
                  <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-yellow-800 text-white rounded-lg hover:bg-yellow-900 transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-sm sm:text-base">
                    Contact an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateBlog;