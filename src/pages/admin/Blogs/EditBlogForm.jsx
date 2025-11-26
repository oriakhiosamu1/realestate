// // EditBlogForm.jsx
// import React, { useState } from 'react';
// import Modal from '../shared/Modal';
// import ImageUploadPreview from '../shared/ImageUploadPreview';
// import { BLOG_CATEGORIES } from '../shared/constants';

// export default function EditBlogForm({ item, onSave, onCancel }) {
//   const [blog, setBlog] = useState(item);

//   const setField = (field, value) => setBlog(prev => ({ ...prev, [field]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave('blogs', blog);
//   };
  
//   return (
//     <Modal title={`Edit Blog: ${item.title}`} onClose={onCancel}>
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
//           <ImageUploadPreview 
//             label="Blog Cover Image"
//             currentImage={blog.image}
//             onImageChange={(url) => setField('image', url)}
//             placeholderText="Blog"
//             previewClass="w-full h-32"
//           />
//           {/* ... Field definitions (same as CreateBlogForm, but using 'blog' state) ... */}
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Title</span>
//             <input
//               type="text"
//               value={blog.title}
//               onChange={(e) => setField('title', e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Excerpt (Short description)</span>
//             <textarea
//               value={blog.excerpt}
//               onChange={(e) => setField('excerpt', e.target.value)}
//               required
//               rows="2"
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Content (Full article)</span>
//             <textarea
//               value={blog.content}
//               onChange={(e) => setField('content', e.target.value)}
//               required
//               rows="6"
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Author Name</span>
//             <input
//               type="text"
//               value={blog.author}
//               onChange={(e) => setField('author', e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Category</span>
//             <select
//               value={blog.category}
//               onChange={(e) => setField('category', e.target.value)}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             >
//               {BLOG_CATEGORIES.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Location</span>
//             <input
//               type="text"
//               value={blog.location}
//               onChange={(e) => setField('location', e.target.value)}
//               placeholder="e.g., Lagos, Nigeria, General"
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           <label className="block">
//             <span className="text-xs sm:text-sm text-gray-700 font-medium">Read Time</span>
//             <input
//               type="text"
//               value={blog.readTime}
//               onChange={(e) => setField('readTime', e.target.value)}
//               placeholder="e.g., 5 min read"
//               className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 sm:p-3 text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500"
//             />
//           </label>
//           {/* ... end fields ... */}
//         </div>
//         <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t">
//           <button 
//             type="button" 
//             onClick={onCancel} 
//             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition duration-200 font-semibold shadow-sm"
//           >
//             Cancel
//           </button>
//           <button 
//             type="submit" 
//             className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-semibold shadow-lg"
//           >
//             <i className="fas fa-save mr-2"></i> Save Changes
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// }






// EditBlogForm.jsx
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import ImageUploadPreview from '../shared/ImageUploadPreview';
import { BLOG_CATEGORIES } from '../shared/constants';

export default function EditBlogForm({ item, onSave, onCancel }) {
  const [blog, setBlog] = useState(item);

  const setField = (field, value) =>
    setBlog(prev => ({ ...prev, [field]: value }));

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Ensure tags is an array before saving
  //   const finalBlog = {
  //     ...blog,
  //     tags: typeof blog.tags === 'string'
  //       ? blog.tags.split(',').map(t => t.trim()).filter(Boolean)
  //       : blog.tags,
  //   };

  //   onSave('blogs', finalBlog);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Saving blog post:', blog);

    onSave('blogs', blog);
  };

  return (
    <Modal title={`Edit Blog: ${item.title}`} onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">

          {/* Image Upload */}
          <ImageUploadPreview
            label="Blog Cover Image"
            currentImage={blog.image}
            onImageChange={(url) => setField('image', url)}
            placeholderText="Blog Image"
            previewClass="w-full h-32"
          />

          {/* Title */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <input
              type="text"
              value={blog.title}
              onChange={(e) => setField('title', e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* IMAGE URL */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Blog Image Url</span>
            <input
              type="text"
              // value={blog.image_url}
              value={blog.image_url || ""}
              onChange={(e) => setField('image_url', e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Excerpt */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Excerpt (Short description)
            </span>
            <textarea
              value={blog.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              required
              rows="2"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Content */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Content (Full article)
            </span>
            <textarea
              value={blog.content}
              onChange={(e) => setField('content', e.target.value)}
              required
              rows="6"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Conclusion */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Conclusion</span>
            <textarea
              value={blog.conclusion}
              onChange={(e) => setField('conclusion', e.target.value)}
              rows="3"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Author */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Author Name</span>
            <input
              type="text"
              value={blog.author}
              onChange={(e) => setField('author', e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Category */}
          {/* <label className="block">
            <span className="text-sm font-medium text-gray-700">Tags</span>
            <select
              value={blog.category}
              onChange={(e) => setField('tags', e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            >
              {BLOG_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label> */}

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Tags / Categories</span>
  
            <div className="mt-2 space-y-2">
              {BLOG_CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={Array.isArray(blog.tags) && blog.tags.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setField('tags', [...(blog.tags || []), cat]);
                      } else {
                        setField(
                          'tags',
                          blog.tags.filter(t => t !== cat)
                        );
                      }
                    }}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </label>

          {/* Location */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Location</span>
            <input
              type="text"
              value={blog.location}
              onChange={(e) => setField('location', e.target.value)}
              placeholder="e.g., Lagos, Nigeria"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>

          {/* Reading Time */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Reading Time</span>
            <input
              type="text"
              value={blog.reading_time}
              onChange={(e) => setField('reading_time', e.target.value)}
              placeholder="e.g., 5 min read"
              className="mt-1 w-full border border-gray-300 rounded-lg p-3 shadow-sm"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg"
          >
            <i className="fas fa-save mr-2"></i> Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
