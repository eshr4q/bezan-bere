const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.get('/', notesController.getNotes);
router.post('/add', notesController.addNote);
router.delete('/:id', notesController.deleteNote);
router.put('/:id/content', notesController.updateNoteContent);
router.put('/:id/position', notesController.updateNotePosition);

module.exports = router;
