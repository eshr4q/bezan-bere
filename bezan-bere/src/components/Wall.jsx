import React, { useState, useEffect } from "react";
import Note from "./Note";
import Header from "./Header";
import { fetchNotes, addNoteApi, deleteNoteApi, updateNoteContentApi, updateNotePositionApi } from "../api/notesApi";

const Wall = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    loadNotes();
    const interval = setInterval(loadNotes, 5000); // Polling برای آپدیت تغییرات کاربر دوم
    return () => clearInterval(interval);
  }, []);

  const updateNotePosition = async (id, x, y) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
    await updateNotePositionApi(id, x, y);
  };

  const addNote = async (title, content, deadline) => {
    const newNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      creationDate: new Date().toLocaleDateString(),
      deadline,
      x: Math.random() * 300,
      y: Math.random() * 300,
    };
    
    setNotes((prevNotes) => [...prevNotes, newNote]);
    await addNoteApi(newNote);
  };

  const deleteNote = async (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    await deleteNoteApi(id);
  };

  const updateNote = async (id, updatedTitle, updatedContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, title: updatedTitle, content: updatedContent }
          : note
      )
    );
    await updateNoteContentApi(id, updatedTitle, updatedContent);
  };

  return (
    <div className="w-full">
      <Header onAddNote={addNote} />
      <div
        className="p-4 bg-white/40 shadow-sm rounded-xl border-2 border-pink-200 relative overflow-hidden"
        style={{ height: "70vh" }}
      >
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            creationDate={note.creationDate}
            deadline={note.deadline}
            x={note.x}
            y={note.y}
            onDragStop={updateNotePosition}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Wall;
