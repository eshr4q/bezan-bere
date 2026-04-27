import React, { useState } from "react";

const AddHabit = React.memo(function AddHabit({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAdd(trimmedName);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-4 w-full text-pink-700">
      <input
        className="border px-3 py-2 rounded w-full focus:outline-none focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
        placeholder="New habit..."
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button className="bg-pink-500 text-white px-4 py-2 rounded w-full sm:w-auto">
        Add
      </button>
    </form>
  );
});

export default AddHabit;