import { create } from "zustand";
import {
  fetchHabits,
  addHabit as addHabitApi,
  deleteHabit as deleteHabitApi,
  toggleDay as toggleDayApi,
  updateHabitName as updateHabitNameApi,
} from "../api/habitApi";

const useHabitStore = create((set, get) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  habits: [],

  setMonth: (month) => set({ month }),

  loadHabits: async () => {
    const { year, month } = get();
    try {
      const data = await fetchHabits(year, month);
      set({ habits: data?.habits || [] });
    } catch (err) {
      console.error("Network error:", err);
      set({ habits: [] });
    }
  },

  addHabit: async (name) => {
    const { year, month } = get();
    try {
      const response = await addHabitApi(name, year, month);
      if (response?.habit) {
        set((state) => ({ habits: [...state.habits, response.habit] }));
      } else {
        await get().loadHabits();
      }
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  },

  deleteHabit: async (id) => {
    const { year, month } = get();
    try {
      await deleteHabitApi(id, year, month);
      set((state) => ({ habits: state.habits.filter((h) => h.id !== id) }));
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  },

  toggleDay: async (habitId, date, value) => {
    const { year, month } = get();

    // Optimistic UI update
    set((state) => ({
      habits: state.habits.map((h) =>
        h.id === habitId ? { ...h, days: { ...h.days, [date]: value } } : h
      ),
    }));

    try {
      await toggleDayApi(year, month, habitId, date, value);
    } catch (err) {
      console.error("Error toggling day, reverting...", err);
      await get().loadHabits();
    }
  },

  editHabitName: async (id, newName) => {
    const previousHabits = get().habits;
    const { year, month } = get();

    // Optimistic UI update
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, name: newName } : h)),
    }));

    try {
      await updateHabitNameApi(id, newName, year, month);
    } catch (error) {
      console.error("Error updating name:", error);
      set({ habits: previousHabits });
    }
  },
}));

export default useHabitStore;
