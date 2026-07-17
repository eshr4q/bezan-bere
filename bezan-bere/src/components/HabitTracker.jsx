import React, { useEffect, useMemo } from "react";
import useHabitStore from "../store/useHabitStore";
import { getMonthDays } from "../utils/calendar";
import MonthSelector from "./MonthSelector";
import CalendarGrid from "./CalendarGrid";
import AddHabit from "./AddHabit";

export default function HabitTracker() {
  const year = useHabitStore((state) => state.year);
  const month = useHabitStore((state) => state.month);
  const habits = useHabitStore((state) => state.habits);
  const setMonth = useHabitStore((state) => state.setMonth);
  const loadHabits = useHabitStore((state) => state.loadHabits);
  const addHabit = useHabitStore((state) => state.addHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const toggleDay = useHabitStore((state) => state.toggleDay);
  const editHabitName = useHabitStore((state) => state.editHabitName);

  // Fetch data & Polling
  useEffect(() => {
    loadHabits();
    const interval = setInterval(loadHabits, 5000);
    return () => clearInterval(interval);
  }, [year, month, loadHabits]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this habit?")) {
      deleteHabit(id);
    }
  };

  const days = useMemo(() => getMonthDays(year, month), [year, month]);

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-pink-600 tracking-tight">
            Bezan Bere{" "}
            <span className="text-sm font-normal text-pink-600">{year}</span>
          </h1>
          <p className="text-pink-600">Tick the damn box!</p>
        </div>

        <div className="flex items-center gap-4">
          <MonthSelector month={month} setMonth={setMonth} />
        </div>
      </header>

      <section className="mb-8 bg-white/40 p-4 rounded-2xl inline-block border-2 border-pink-200">
        <AddHabit onAdd={addHabit} />
      </section>

      <main className="w-full pb-4">
        <CalendarGrid
          habits={habits}
          days={days}
          month={month}
          onToggle={toggleDay}
          onDelete={handleDelete}
          onEditName={editHabitName}
        />
      </main>

      {habits.length === 0 && (
        <div className="text-center py-20 text-gray-400 italic">
          No habits yet. Add one above to get started!
        </div>
      )}
    </>
  );
}
