import React from "react";
import { Mail, Phone, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

const GOLD_BUTTON_CLASSES =
  "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-full shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300";

const agents = [
  {
    name: "Sophia Williams",
    role: "Senior Investment Advisor",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&q=80",
    email: "sophia@luxestates.com",
    phone: "+44 20 7946 0958",
  },
  {
    name: "Michael Johnson",
    role: "Global Property Consultant",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328a4531?w=500&q=80",
    email: "michael@luxestates.com",
    phone: "+971 55 123 4567",
  },
  {
    name: "Isabella Chen",
    role: "Asian Market Specialist",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1601933470928-c6c2b49a227b?w=500&q=80",
    email: "isabella@luxestates.com",
    phone: "+65 9012 3456",
  },
  {
    name: "Ethan Brown",
    role: "Luxury Asset Manager",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1603415526960-f7e0328a4531?w=500&q=80",
    email: "ethan@luxestates.com",
    phone: "+1 212 555 0198",
  },
];

const Agents = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* --- Hero Section --- */}
      <div className="relative h-[60vh] flex items-center justify-center bg-center bg-cover" 
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative text-center text-white px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Meet Our Global Experts
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Our professional agents are dedicated to guiding you through premium real estate investments worldwide.
          </p>
        </motion.div>
      </div>

      {/* --- Agents Section --- */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-serif text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
          Our Trusted Agents
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-yellow-600 font-medium">{agent.role}</p>
                <div className="flex justify-center mt-2 text-gray-500">
                  <MapPin size={16} className="mr-1" /> {agent.location}
                </div>

                <div className="flex justify-center mt-3 text-yellow-500">
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star fill="currentColor" size={18} />
                  <Star size={18} />
                </div>

                <div className="mt-5 flex justify-center gap-4">
                  <a
                    href={`mailto:${agent.email}`}
                    className="text-gray-700 hover:text-yellow-600 transition"
                    title="Send Email"
                  >
                    <Mail size={22} />
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="text-gray-700 hover:text-yellow-600 transition"
                    title="Call Agent"
                  >
                    <Phone size={22} />
                  </a>
                </div>

                <button className={`mt-6 ${GOLD_BUTTON_CLASSES}`}>
                  Contact Agent
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agents;
