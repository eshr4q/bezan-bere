import React, { useState, useMemo } from "react";
import { getSeason, seasonBg } from "./utils/season";
import HabitTracker from "./components/HabitTracker";
import Wall from "./components/Wall";
import useHabitStore from "./store/useHabitStore";

export default function App() {
  const [activeTab, setActiveTab] = useState("habits");
  const month = useHabitStore((state) => state.month);

  const season = useMemo(() => getSeason(month), [month]);

  return (
    <div className={`min-h-screen transition-colors duration-700 p-8 ${seasonBg[season]}`}>
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8 border-b border-pink-200 pb-4">
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeTab === "habits"
                ? "bg-pink-500 text-white shadow-md scale-105"
                : "bg-white/50 text-pink-600 hover:bg-white/80"
            }`}
          >
            Habit Tracker
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeTab === "notes"
                ? "bg-pink-500 text-white shadow-md scale-105"
                : "bg-white/50 text-pink-600 hover:bg-white/80"
            }`}
          >
            Procrastinotes
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "habits" ? <HabitTracker /> : <Wall />}

      </div>
    </div>
  );
}
