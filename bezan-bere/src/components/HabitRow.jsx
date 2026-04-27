import React from "react";

const HabitRow = React.memo(function HabitRow({ habit, days, onToggle, onDelete }) {
  return (
    <div className="bg-white/40 p-4 rounded-xl border-2 border-pink-200 shadow-sm mb-4">
      {/* Task header and shits*/}
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-lg text-pink-600">{habit.name}</div>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-pink-500 hover:text-white hover:bg-pink-500 font-bold w-8 h-8 rounded transition-colors flex items-center justify-center"
          title="حذف تسک"
        >
          ✕
        </button>
      </div>‍

      {/* The Blocks*/}
      <div className="flex flex-wrap gap-2">
        {days.map(day => {
          // Date Generator
          const yearStr = day.getFullYear();
          const monthStr = String(day.getMonth() + 1).padStart(2, '0');
          const dayStr = String(day.getDate()).padStart(2, '0');
          const dateKey = `${yearStr}-${monthStr}-${dayStr}`;

          const checked = habit.days?.[dateKey] || false;
          const dayNumber = day.getDate(); // Daysss
  
          return (
            <button
              key={dateKey}
              onClick={() => onToggle(habit.id, dateKey, !checked)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-all shadow-sm
                ${
                  checked 
                    ? "bg-pink-500 text-white  scale-105" 
                    : "bg-pink-100 text-pink-700"
                }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default HabitRow;