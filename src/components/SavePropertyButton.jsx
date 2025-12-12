import React, { useState } from "react";
import { Heart } from "lucide-react";
import axiosClient from "../axiosClient/axiosClient";

const SavePropertyButton = ({ property }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation(); // prevent parent click
    setSaving(true);

    try {
      await axiosClient.post("/saved-properties", {
        properties_id: property.id,
        image_url: property.image_url,
        price: property.price,
        name: property.name,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        feets: property.feets,
      });

      alert("Property saved");
    } catch (error) {
      console.error(error);
      alert("Failed to save property");
    }

    setSaving(false);
  };

  return (
    <button
      className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-red-500 transition"
      onClick={handleSave}
    >
      <Heart size={18} color={saving ? "red" : "currentColor"} />
    </button>
  );
};

export default SavePropertyButton;
