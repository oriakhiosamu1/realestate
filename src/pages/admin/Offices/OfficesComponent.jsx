import React from "react";

export default function OfficesComponent({ offices, onEdit, onDelete, onAdd }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Offices({offices.length})</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <i className="fas fa-plus mr-1 sm:mr-2"></i> Add Office
        </button>
      </div>

      {offices.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No offices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Languages</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {offices.map((office) => (
                <tr key={office.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{office.name}</td>
                  <td className="py-3 px-4">{office.location}</td>
                  <td className="py-3 px-4">{office.phone}</td>
                  <td className="py-3 px-4">
                    {/* {office.languages?.join(", ") || "—"} */}
                    {office.languages}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onEdit(office)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => onDelete(office.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
