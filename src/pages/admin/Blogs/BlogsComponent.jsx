// BlogsComponent.jsx
import React from 'react';
import { DEFAULT_BLOG_IMAGE } from '../shared/constants';
import Errors from '../../../components/Errors';

export default function BlogsComponent({  errors = {}, blogs, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-800">Blog Posts ({blogs.length})</h3>
        <button 
          onClick={onAdd}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          <i className="fas fa-plus mr-1 sm:mr-2"></i> Add Post
        </button>
      </div>

      {Object.keys(errors).length > 0 && <Errors errors={errors} />}
      {/* {Object.keys(errors || {}).length > 0 && <Errors errors={errors} />} */}

      
      {blogs.length === 0 ? (
        <p className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg text-sm sm:text-base">No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
              <img 
                // src={blog.image_url || `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${blog.image}` || DEFAULT_BLOG_IMAGE}
                src={blog.image_url || blog.image || DEFAULT_BLOG_IMAGE}
                alt={blog.title} 
                className="w-full h-32 sm:h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_BLOG_IMAGE; }}
              />
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">

                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {Array.isArray(blog.tags) ? blog.tags.join(" | ") : blog.tags}
                  </span>

                  <span className="text-xs text-gray-500">{blog.reading_time}</span>
                </div>
                <p className="font-bold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2">{blog.title}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500 mb-3 pb-3 border-b">
                  <i className="fas fa-user mr-1"></i>
                  <span className="truncate">{blog.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2 sm:space-x-3">
                  <button 
                    onClick={() => onEdit(blog)}
                    className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 font-semibold transition"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>
                  <button 
                    onClick={() => onDelete(blog.id)}
                    className="text-xs sm:text-sm text-red-500 hover:text-red-700 font-semibold transition"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}