import React from "react";
import { useParams } from "react-router-dom";

export default function BuyDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Buy Property Detail Page</h1>
      <p className="mt-4 text-gray-600">
        You are viewing property with ID: {id}
      </p>
    </div>
  );
}
