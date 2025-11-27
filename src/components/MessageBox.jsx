import React, { useState, useEffect } from "react";

function MessageBox({ message }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Hide message after 5 seconds
    const timer = setTimeout(() => setShowMessage(false), 5000);
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  if (!showMessage) return null;

  return (
    <div className="bg-green-100 text-green-800 p-3 rounded text-center mb-4">
      {message}
    </div>
  );
}

export default MessageBox;
