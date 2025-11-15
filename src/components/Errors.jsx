import React from 'react'

const Errors = ({errors}) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      <h4 className="font-semibold mb-2">Errors:</h4>
      <ul className="list-disc list-inside">
        {Object.entries(errors).map(([field, msgs]) =>
          msgs.map((msg, index) => <li key={`${field}-${index}`}>{msg}</li>)
        )}
      </ul>
    </div>
  )
}

export default Errors