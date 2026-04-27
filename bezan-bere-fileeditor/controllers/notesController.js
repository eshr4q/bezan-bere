const path = require('path');
const fs = require('fs');

const notesFilePath = path.join(__dirname, '../data/notes.json');


const readNotes = () => {
  if (!fs.existsSync(notesFilePath)) {
    fs.writeFileSync(notesFilePath, JSON.stringify([]));
    return [];
  }
  return JSON.parse(fs.readFileSync(notesFilePath, 'utf8'));
};

const writeNotes = (notes) => {
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};


const getNotes = (req, res) => {
  try {
    const notes = readNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error reading notes', error });
  }
};


const addNote = (req, res) => {
  try {
    const notes = readNotes();
    const newNote = req.body;
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json({ message: 'Note added successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Error adding note', error });
  }
};


const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    let notes = readNotes();
    notes = notes.filter(note => note.id !== id);
    writeNotes(notes);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};


const updateNoteContent = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const notes = readNotes();
    
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      if (title !== undefined) notes[noteIndex].title = title;
      if (content !== undefined) notes[noteIndex].content = content;
      writeNotes(notes);
      res.status(200).json({ message: 'Note updated successfully', note: notes[noteIndex] });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
};


const updateNotePosition = (req, res) => {
  try {
    const { id } = req.params;
    const { x, y } = req.body;
    const notes = readNotes();
    
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex].x = x;
      notes[noteIndex].y = y;
      writeNotes(notes);
      res.status(200).json({ message: 'Position updated successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating position', error });
  }
};

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    updateNotePosition,
    updateNoteContent
};
