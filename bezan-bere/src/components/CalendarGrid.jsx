import React from "react";
import HabitRow from "./HabitRow";

const CalendarGrid = React.memo(function CalendarGrid({ habits, days, onToggle, onDelete, onEditName }) {
  return (
    <div className="space-y-4">
      {habits.length === 0 ? (
        <div className="text-center text-gray-500 py-6 bg-white/30 rounded-xl border border-dashed border-gray-300">
          What are you waiting for?
        </div>
      ) : (
        habits.map(habit => (
          <HabitRow
            key={habit.id}
            habit={habit}
            days={days}
    
            onToggle={onToggle}
            onDelete={onDelete}
            onEditName={onEditName}
          />
        ))
      )}
    </div>
  );
});

export default CalendarGrid;