import React from "react";
import { useState } from "react";

const HabitRow = React.memo(({ habit, days, year, month, onToggle, onDelete, onEditName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(habit.name);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() !== '' && editValue !== habit.name) {
      onEditName(habit.id, editValue.trim());
    } else {
      setEditValue(habit.name); // ریست کردن به نام قبلی اگر خالی بود
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(habit.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white/40 p-4 rounded-xl border-2 border-pink-200 shadow-sm mb-4">
      {/* Task header and shits*/}
<div className="habit-info flex justify-between items-center mb-4">
  
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="border px-3 py-2 rounded focus:outline-none focus:border-pink-700 focus:ring-1 focus:ring-pink-700"
          />
        ) : (
          <span className="font-bold text-lg text-pink-600" onClick={handleNameClick} title="برای ویرایش کلیک کنید">
            {habit.name}
          </span>
        )}
     <button
          onClick={() => onDelete(habit.id)}
          className="text-pink-500 hover:text-white hover:bg-pink-500 font-bold w-8 h-8 rounded transition-colors flex items-center justify-center"
          title="حذف تسک"
        >
          ✕
        </button>
      </div>

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