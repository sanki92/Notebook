import './App.css';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  return (
          <>
          <NoteState>
                <Router>
                <Navbar/>
                <div className="container">
                      <Routes>
                          <Route exact path="/" element={<Home/>}/>
                          <Route exact path="/about" element={<About/>}/>
                    </Routes>
                    </div>
              </Router>
         </NoteState>
          </>
  );
}

export default App;
