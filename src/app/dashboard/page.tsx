// app/tables/page.tsx
import React from 'react';

export default function TablesPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Tables</h2>
      <div className="bg-neutral-800 p-6 rounded-lg">
         <p className="text-center text-neutral-400">
          Create a table
        </p>
        <p className="text-center text-sm text-neutral-500 mt-2">
          Once you have some data to query, you can ask EZQL questions.
        </p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          Create
        </button>
      </div>
    </div>
  );
}
