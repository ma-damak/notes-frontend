import { useEffect, useState } from "react";

import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import notesService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    notesService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const notesToShow = showAll ? notes : notes.filter((n) => n.important);

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    notesService.create(noteObject).then((createdNote) => {
      setNotes([...notes, createdNote]);
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (note) => {
    notesService
      .update(note.id, {
        ...note,
        important: !note.important,
      })
      .then((updatedNote) =>
        setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)))
      )
      .catch(() => {
        setErrorMessage(
          `The note "${note.content}" has already been deleted from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== note.id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note)}
          />
        ))}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Important only" : "Show all"}
      </button>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button>Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
