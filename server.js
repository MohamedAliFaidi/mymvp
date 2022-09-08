//LOAD ENVIRONMENT VARIABLES
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// importing dependencies`
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/DB");
const notesController = require("./controllers/notesController");

// create express app
const app = express();

// configure express app
app.use(express.json());
app.use(cors());

//connect to database
connectDb();

// Routing

app.get("/notes", notesController.fetchNotes);

app.get("/notes/:id", notesController.fetchNoteById);

app.post("/notes", notesController.createNote);

app.put("/notes/:id", notesController.updateNote);

app.delete("/notes/:id", notesController.deleteNote);

//Server
app.listen(3000, () => {
  console.log(process.env.PORT);
});
