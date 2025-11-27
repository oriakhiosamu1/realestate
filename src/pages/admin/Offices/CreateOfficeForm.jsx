import React, { useState } from "react";
import { EMPTY_OFFICE } from "../shared/constants";
import { CircleLoader, BeatLoader, ClipLoader } from "react-spinners";

export default function CreateOfficeForm({ isLoading, onSave, onCancel }) {
  const [office, setOffice] = useState(EMPTY_OFFICE);

  const handleChange = (field, value) => {
    setOffice({ ...office, [field]: value });
  };

  const handleSubmit = () => {
    if (!office.name.trim()) return alert("Office name is required.");
    console.log('office submitted :', office);
    onSave("offices", office);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Create Office</h2>

        <div className="grid gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Office Name</label>
            <input
              type="text"
              value={office.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={office.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              value={office.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={office.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium mb-1">Language(s)</label>
            <input
              value={office.languages}
              onChange={(e) => handleChange("languages", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-1">
              Languages (comma-separated)
            </label>
            <input
              value={office.languages.join(", ")}
              onChange={(e) =>
                handleChange(
                  "languages",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div> */}

          {/* Coordinates */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                value={office.lat}
                onChange={(e) => handleChange("lat", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                value={office.lng}
                onChange={(e) => handleChange("lng", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {/* Create */}
            {isLoading ? (<BeatLoader size={10} color="#ffffff" />) : (<><i className="fas fa-save mr-2"></i>Create Office</>)}
          </button>
        </div>
      </div>
    </div>
  );
}
