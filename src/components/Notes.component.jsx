import React, { useState, useEffect } from "react";
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Container } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NotesApp = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const storedUser = currentUser ? JSON.parse(currentUser) : null;
  const {handleLogout} = useAuth();
  const isAuthenticated = !!storedUser;

  useEffect(() => {
    if(!isAuthenticated){
      navigate("/");
    }
  }, [isAuthenticated, storedUser])
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [notes, searchTerm]);
  
  // Save notes to local storage whenever notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Function to handle adding a new note
  const addNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote(""); // Clear the input field
    }
  };

  // Function to handle deleting a note
  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Button onClick={handleLogout}>Logout</Button>
      {notes?.length > 0 && <TextField
        fullWidth
        label="Search Notes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginTop: 2 }}
      />}
      <Typography variant="h4" align="center" gutterBottom>
        Notes App
      </Typography>
      <TextField
        fullWidth
        label="Enter your note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={addNote}>Add Note</Button>
      <List sx={{ marginTop: 2 }}>
        {filteredNotes.map((note, index) => (
          <ListItem key={index}>
            <ListItemText primary={note} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default NotesApp;
