import React, { useCallback } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Memoized to avoid unnecessary renders while the parent polls for updates.
const MonthSelector = React.memo(function MonthSelector({ month, setMonth }) {

  const handleChange = useCallback((e) => {
    setMonth(Number(e.target.value));
  }, [setMonth]);

  return (
    <div className="relative inline-block w-48">
      <select
        className="appearance-none w-full bg-white/70 backdrop-blur-sm border-2 border-pink-200 text-pink-600 font-semibold py-2.5 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all cursor-pointer hover:bg-white/90 hover:shadow-md"
        value={month}
        onChange={handleChange}
      >
        {months.map((m, i) => (
          <option key={m} value={i + 1} className="text-pink-600 bg-white">
            {m}
          </option>
        ))}
      </select>
      
      {/* just an icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pink-600">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
});

export default MonthSelector;