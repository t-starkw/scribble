const router = require('express').Router();
const store = require('../db/store')


// GET request for reading notes in db storage and return notes as json
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});
// POST request for saving new note -> add to db storage -> return note to client
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));

});
// **DELETE request to recieve id of note to delete -> read all notes from storage -> remove note with given id -> rewrite notes to db
router.delete('/notes/:id', (req, res) => {
  store
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});


module.exports = router;