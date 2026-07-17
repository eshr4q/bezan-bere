import React, { useEffect } from "react";
import Note from "./Note";
import Header from "./Header";
import useNotesStore from "../store/useNotesStore";

const Wall = () => {
  const notes = useNotesStore((state) => state.notes);
  const loadNotes = useNotesStore((state) => state.loadNotes);
  const addNote = useNotesStore((state) => state.addNote);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const updateNotePosition = useNotesStore((state) => state.updateNotePosition);

  useEffect(() => {
    loadNotes();
    const interval = setInterval(loadNotes, 5000); // Polling برای آپدیت تغییرات کاربر دوم
    return () => clearInterval(interval);
  }, [loadNotes]);

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
