import React from "react";
import { useEffect, useState } from "react";

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Hide after 5 seconds
      const timer = setTimeout(() => setVisible(false), 5000);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !visible) return null;

  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 shadow-sm transition-all duration-500 ease-in-out opacity-100">
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default SuccessMessage;
