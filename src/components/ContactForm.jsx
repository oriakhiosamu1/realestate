import React from 'react'

const ContactForm = ({formData, handleInputChange, handleSubmit}) => {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 sm:p-6">
        <h3 className="font-bold text-base sm:text-lg mb-4">REQUEST INFORMATION</h3>
        <div className="space-y-4">
            <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
            type="tel"
            name="phone"
            placeholder="Phone with Country Code"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />

            <div>
            <h4 className="font-bold text-sm sm:text-base mb-3">SCHEDULE A PROPERTY TOUR</h4>
            <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="tourType"
                    value="in-person"
                    checked={formData.tourType === 'in-person'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                />
                <span className="text-xs sm:text-sm">In Person or On Site Tour</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="tourType"
                    value="virtual"
                    checked={formData.tourType === 'virtual'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                />
                <span className="text-xs sm:text-sm">Virtual Online Tour</span>
                </label>
            </div>
            </div>

            <div>
            <h4 className="font-bold text-sm sm:text-base mb-3">SIGN UP FOR THE NEWSLETTER</h4>
            <label className="flex items-start gap-2 cursor-pointer">
                <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1"
                />
                <span className="text-xs sm:text-sm">Sign Up for Newsletter</span>
            </label>
            </div>

            <button
            onClick={handleSubmit}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
            Submit
            </button>

            <p className="text-xs text-gray-600 leading-relaxed">
            By clicking 'Submit' I agree to the Privacy Policy and Terms of Service, and consent for Christie's International Real Estate, its franchisees, affiliates and/or agents to call, text or email me about my inquiry using contact information I provided including via automated telephone dialing system and/or artificial or prerecorded voice, and such consent is not a condition of any potential purchase. Standard data and message rates may apply. You may unsubscribe at any time.
            </p>
        </div>
    </div>
  )
}

export default ContactForm