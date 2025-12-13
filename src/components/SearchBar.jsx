import React, { useState } from "react";
import { Search } from "lucide-react";
import axiosClient from "../axiosClient/axiosClient";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;

        setLoading(true);

        axiosClient
        .post("/search", {query: query,})
        .then((response) => {
            setResults(response.data);
        })
        .catch((error) => {
            console.error("Search error:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleSaveSearch = (propertyId) => {
        axiosClient.post("/save-search", {search: query,property_id: propertyId,})
        .then(() => {
            alert("Search saved");
        })
        .catch((error) => {
            if (error.response?.status === 409) {
                alert("Already saved");
            } else {
                console.error(error);
            }
        });
    };

  return (
    <div className="relative max-w-xl mx-auto">
      {/* SEARCH BAR (UNCHANGED STYLING) */}
      <div className="bg-white rounded-full shadow-2xl p-1 xs:p-1.5 sm:p-2 max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto flex items-center border border-gray-200">
        <input
          type="text"
          placeholder="Search Location or Property"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow pl-3 pr-1 py-1.5 xs:py-2 text-gray-900 focus:outline-none placeholder-gray-500 text-[10px] xs:text-xs sm:text-sm w-full"
        />
        <button
          onClick={handleSearch}
          className="p-1 xs:p-1.5 rounded-full text-gray-700 hover:text-yellow-800 transition flex-shrink-0"
          aria-label="Search"
        >
          <Search size={16} className="xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div className="bg-white mt-3 rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
            >
              <div>
                <Link to  = {`/rent/${item.id}`} className="hover:underline">
                    <p className="text-sm font-medium text-gray-900">
                    {item.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                    {item.location}
                    </p>
                </Link>
              </div>

                <button onClick={() => handleSaveSearch(item.id)} className="text-[11px] px-3 py-1 border border-yellow-700 text-yellow-700 rounded-full hover:bg-yellow-700 hover:text-white transition">
                    Save Search
                </button>

            </div>
          ))}
        </div>
      )}

      {loading && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Searching...
        </p>
      )}
    </div>
  );
};

export default SearchBar;
