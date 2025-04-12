const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'notes.json');

function loadNotes() {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(dataFile, JSON.stringify(notes, null, 2));
}

function getNotes() {
  return loadNotes();
}

function addNote(title) {
  const notes = loadNotes();
  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title,
  };
  notes.push(newNote);
  saveNotes(notes);

  return newNote;
}

function deleteNode(id) {
  let notes = loadNotes();
  const initialLength = notes.length;

  notes = notes.filter(note => note.id !== id);
  if (notes.length === initialLength) {
    return false;
  }
  saveNotes(notes);
  return true;
}

function updateNote(id, title) {
  const notes = loadNotes();
  const note = notes.find(n => n.id === id);
  if(!note){
    return null;
  }

  note.title = title;
  saveNotes(notes);

  return note;
}

module.exports = {
  getNotes,
  addNote,
  deleteNode,
  updateNote,
}