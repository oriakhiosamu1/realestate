// import React from 'react'

// const RelatedStories = () => {
//   return (
//     <div>
//         <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Stories</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[
//             {
//             title: "One Home and No Longer: 6 Open-Plan Living Spaces That Redefine Comfort",
//             category: "HOME TOURS",
//             image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop"
//             },
//             {
//             title: "Splash in Style: 4 Private Indoor Pools",
//             category: "HOME TOURS",
//             image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop"
//             },
//             {
//             title: "Property Insights: What Does $15 Million Buy Around the World?",
//             category: "HOME TOURS",
//             image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&h=300&fit=crop"
//             }
//         ].map((story, idx) => (
//             <div key={idx} className="group cursor-pointer">
//             <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
//                 <img 
//                 src={story.image} 
//                 alt={story.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//             </div>
//             <p className="text-xs text-gray-500 mb-2">{story.category}</p>
//             <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-gray-600">{story.title}</h3>
//             <button className="text-xs sm:text-sm underline mt-2">Read More</button>
//             </div>
//         ))}
//         </div>
//     </div>
//   )
// }

// export default RelatedStories








import React, { useEffect, useState } from "react";
import { X, User, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient/axiosClient";

const RelatedStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/related-stories")
        .then((res) => {
            setStories(Array.isArray(res.data.data) ? res.data.data : []);
            setLoading(false);
            console.log(res)
        })
        .catch(() => {
            setStories([]);
            setLoading(false);
        });
    }, []);



  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading related stories…</p>;
  }

  return (
    <>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Stories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                <img
                  src={story.image_url}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="text-xs text-gray-500 mb-2">
                {Array.isArray(story.tags)
                  ? story.tags.join(" | ")
                  : story.tags}
              </p>

              <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-gray-600">
                {story.title}
              </h3>

              <button
                onClick={() => openModal(story)}
                className="text-xs sm:text-sm underline mt-2"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10 rounded-t-xl sm:rounded-t-2xl">
              <span className="px-2.5 py-1 bg-yellow-800 text-white text-xs font-semibold rounded-full">
                {Array.isArray(selectedPost.tags)
                  ? selectedPost.tags.join(" | ")
                  : selectedPost.tags}
              </span>

              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl font-bold mb-4">
                {selectedPost.title}
              </h2>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 border-b pb-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-yellow-800" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-yellow-800" />
                  {new Date(selectedPost.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-yellow-800" />
                  {selectedPost.reading_time}
                </div>
                {selectedPost.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-yellow-800" />
                    {selectedPost.location}
                  </div>
                )}
              </div>

              <img
                src={selectedPost.image_url}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              {[selectedPost.excerpt, selectedPost.content, selectedPost.conclusion]
                .filter(Boolean)
                .map((block, idx) =>
                  block.split("\n\n").map((p, i) => (
                    <p
                      key={`${idx}-${i}`}
                      className="text-gray-700 mb-4 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))
                )}

              <div className="mt-8 pt-6 border-t">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold mb-2">
                    Need Expert Advice?
                  </h3>
                  <p className="mb-4">
                    Our experienced real estate agents are here to help.
                  </p>
                  <button
                    onClick={() => navigate("/agents")}
                    className="px-6 py-3 bg-yellow-800 text-white rounded-lg"
                  >
                    Contact an Agent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedStories;
