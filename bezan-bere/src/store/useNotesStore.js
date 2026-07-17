import { create } from "zustand";
import {
  fetchNotes,
  addNoteApi,
  deleteNoteApi,
  updateNoteContentApi,
  updateNotePositionApi,
} from "../api/notesApi";

const useNotesStore = create((set, get) => ({
  notes: [],

  loadNotes: async () => {
    try {
      const data = await fetchNotes();
      set({ notes: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  },

  addNote: async (title, content, deadline) => {
    const newNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      creationDate: new Date().toLocaleDateString(),
      deadline,
      x: Math.random() * 300,
      y: Math.random() * 300,
    };

    set((state) => ({ notes: [...state.notes, newNote] }));

    try {
      await addNoteApi(newNote);
    } catch (error) {
      console.error("Failed to add note:", error);
      set((state) => ({ notes: state.notes.filter((note) => note.id !== newNote.id) }));
    }
  },

  deleteNote: async (id) => {
    const previousNotes = get().notes;
    set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));

    try {
      await deleteNoteApi(id);
    } catch (error) {
      console.error("Failed to delete note:", error);
      set({ notes: previousNotes });
    }
  },

  updateNote: async (id, updatedTitle, updatedContent) => {
    const previousNotes = get().notes;
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note
      ),
    }));

    try {
      await updateNoteContentApi(id, updatedTitle, updatedContent);
    } catch (error) {
      console.error("Failed to update note:", error);
      set({ notes: previousNotes });
    }
  },

  updateNotePosition: async (id, x, y) => {
    const previousNotes = get().notes;
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? { ...note, x, y } : note)),
    }));

    try {
      await updateNotePositionApi(id, x, y);
    } catch (error) {
      console.error("Failed to update note position:", error);
      set({ notes: previousNotes });
    }
  },
}));

export default useNotesStore;
