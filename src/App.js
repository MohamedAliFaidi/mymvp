import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  // states
  const [notes, setNotes] = useState(null);
  const [addForm, setAddForm] = useState({
    title: "",
    body: "",
  });
  const [editForm, setEditForm] = useState({
    _id: null,
    title: "",
    body: "",
  });
  // use effect
  useEffect(() => {
    fetNotes();
  }, []);

  // functions
  const fetNotes = async () => {
    // Fetch notes from the server
    const response = await axios.get("http://localhost:3000/notes");
    // set fetched notes on state
    setNotes(response.data.notes);
  };

  const addAndUpdateNoteForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddForm({ ...addForm, [name]: value });
    console.log({ name, value });
  };

  const addNote = async (e) => {
    e.preventDefault();
    //create a new note
    const response = await axios.post("http://localhost:3000/notes", addForm);
    console.log(response.data);
    // update the notes state
    setNotes([...notes, response.data.note]);
    // reset the add form
    setAddForm({ title: "", body: "" });
  };

  const deleteNote = async (_id) => {
    // delete a note
    const response = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(response);
    // update the notes state
    const newNotes = [...notes].filter((note) => note._id !== _id);
    setNotes(newNotes);
  };

  const handleUpdateForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditForm({ ...editForm, [name]: value });
  };

  const toggleupdate = (note) => {
    // set new state  for edit form
    setEditForm({ _id: note._id, title: note.title, body: note.body });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = editForm;
    // update request
    const response = await axios.put(
      `http://localhost:3000/notes/${editForm._id}`,
      { title, body }
    );
    //update the notes state
    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note._id === editForm._id);
    newNotes[index] = response.data.note;
    setNotes(newNotes);
    // reset the edit form
    setEditForm({ _id: null, title: "", body: "" });

  };

  return (
    <div className="App">
      <div>
        <h2>Notes :</h2>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <button onClick={() => deleteNote(note._id)}>Delete</button>
                <button onClick={() => toggleupdate(note)}>Update</button>
              </div>
            );
          })}
      </div>

      {editForm._id && (
        <div>
          <h2>update</h2>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateForm}
              value={editForm.title}
              name="title"
            />
            <textarea
              onChange={handleUpdateForm}
              value={editForm.body}
              name="body"
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}

      {!editForm._id && (
        <div>
          <h2>Add a new note :</h2>
          <form onSubmit={addNote}>
            <input
              onChange={addAndUpdateNoteForm}
              value={addForm.title}
              name="title"
              type="text"
              placeholder="Title"
            />
            <textarea
              onChange={addAndUpdateNoteForm}
              value={addForm.body}
              name="body"
              placeholder="Body"
            />
            <button type="submit">Add note</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
