import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchHabits, toggleDay, addHabit, deleteHabit } from "../api/habitApi";
import { getMonthDays } from "../utils/calendar";
import MonthSelector from "./MonthSelector";
import CalendarGrid from "./CalendarGrid";
import AddHabit from "./AddHabit";

export default function HabitTracker({ month, setMonth, year }) {
  const [habits, setHabits] = useState([]);

  // Fetch data & Polling
  useEffect(() => {

    let isMounted = true; // prevent memory leak on switching between tabs

    const loadData = async () => {
      try {
        const data = await fetchHabits(year);
        if (isMounted) setHabits(data.habits || []);
      } catch (err) {
        console.error("Network error:", err);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [year]);

  // Handlers

  {/*Gonna have to make changes to have habits per months not through the whole year*/}

  const handleAdd = useCallback(async (name) => {
    try {
      const response = await addHabit(name, year);
      if (response && response.habit) {
        setHabits((prev) => [...prev, response.habit]);
      } else {
        const data = await fetchHabits(year);
        setHabits(data.habits || []);
      }
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  }, [year]);

  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Delete this habit?")) {
      try {
        await deleteHabit(id, year);
        setHabits((prev) => prev.filter((h) => h.id !== id));
      } catch (err) {
        console.error("Error deleting habit:", err);
      }
    }
  }, [year]);

  const handleToggle = useCallback(async (habitId, date, value) => {
    // Optimistic UI Update (آپدیت سریع در ظاهر قبل از ریسپانس سرور) not sure if it's the best solution tho
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId ? { ...h, days: { ...h.days, [date]: value } } : h
      )
    );

    try {
      await toggleDay(year, habitId, date, value);
    } catch (err) {
      console.error("Error toggling day, reverting...", err);
      // Rollback در صورت خطا
      const data = await fetchHabits(year);
      setHabits(data.habits || []);
    }
  }, [year]);

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
        <AddHabit onAdd={handleAdd} />
      </section>

      <main className="w-full pb-4">
        <CalendarGrid
          habits={habits}
          days={days}
          onToggle={handleToggle}
          onDelete={handleDelete}
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
