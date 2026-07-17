const path = require('path');
const fs = require('fs');

const notesFilePath = path.join(__dirname, '../data/notes.json');
const notesDir = path.dirname(notesFilePath);

const readNotes = () => {
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  if (!fs.existsSync(notesFilePath)) {
    fs.writeFileSync(notesFilePath, JSON.stringify([], null, 2));
    return [];
  }

  const fileContent = fs.readFileSync(notesFilePath, 'utf8').trim();
  if (!fileContent) return [];

  const notes = JSON.parse(fileContent);
  if (!Array.isArray(notes)) {
    throw new Error('notes.json must contain an array');
  }

  return notes;
};

const writeNotes = (notes) => {
  fs.mkdirSync(notesDir, { recursive: true });
  fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 2));
};

const getNotes = (req, res) => {
  try {
    const notes = readNotes();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error reading notes' });
  }
};

const addNote = (req, res) => {
  try {
    const notes = readNotes();
    const newNote = req.body;

    if (!newNote || typeof newNote.id !== 'string') {
      return res.status(400).json({ message: 'A note with a string id is required' });
    }

    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json({ message: 'Note added successfully', note: newNote });
  } catch (error) {
    res.status(500).json({ message: 'Error adding note' });
  }
};

const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    const notes = readNotes();
    const filteredNotes = notes.filter(note => note.id !== id);

    if (filteredNotes.length === notes.length) {
      return res.status(404).json({ message: 'Note not found' });
    }

    writeNotes(filteredNotes);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};

const updateNoteContent = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const notes = readNotes();

    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (title !== undefined) notes[noteIndex].title = title;
    if (content !== undefined) notes[noteIndex].content = content;
    writeNotes(notes);
    res.status(200).json({ message: 'Note updated successfully', note: notes[noteIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

const updateNotePosition = (req, res) => {
  try {
    const { id } = req.params;
    const { x, y } = req.body;

    if (typeof x !== 'number' || typeof y !== 'number') {
      return res.status(400).json({ message: 'x and y must be numbers' });
    }

    const notes = readNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }

    notes[noteIndex].x = x;
    notes[noteIndex].y = y;
    writeNotes(notes);
    res.status(200).json({ message: 'Position updated successfully', note: notes[noteIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating position' });
  }
};

module.exports = {
  getNotes,
  addNote,
  deleteNote,
  updateNotePosition,
  updateNoteContent
};
