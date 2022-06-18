const router = require("express").Router();
const { createNote } = require("../../lib/notes.js");
const { note } = require("../../db/db.json");

router.get("/notes", (req, res) => {
  let results = note;
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, note);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post("/notes", (req, res) => {
  // set id based on what thenext index of the array will be
  req.body.id = note.length.toString();
  const notes = createNote(req.body, note);
  res.json(notes);
});

module.exports = router;
