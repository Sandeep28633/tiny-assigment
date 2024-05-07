import "./App.css";
import Login from "./components/Login.component";
import Register from "./components/Register.component";

import NotesApp from "./components/Notes.component";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NotesApp />} />
      </Routes>
    </Router>
  );
}

export default App;
