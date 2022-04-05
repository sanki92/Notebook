import { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) =>{
  const host = "http://localhost:5000"
    const notesInitial = []
       const [notes, setnotes] = useState(notesInitial)

      // Get all Note    
      const getNote = async () =>{
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDQ3M2NkNThjZmU1ZWZhOWEyOWY4In0sImlhdCI6MTY0MDMyOTEzNn0.dAXuT2Rvm-XuUZOj3lndg0T5RUP5M68Xu7-WLbwff6Y'
          }
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
        }

      // Add a Note    
      const addNote = async (title,description,tag) =>{
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDQ3M2NkNThjZmU1ZWZhOWEyOWY4In0sImlhdCI6MTY0MDMyOTEzNn0.dAXuT2Rvm-XuUZOj3lndg0T5RUP5M68Xu7-WLbwff6Y'
          },
        
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();

        console.log("Adding a new Note")
       const note = {
          "_id": "61c5a6ed2ee66fbaac2d33c84",
          "user": "61c4473cd58cfe5efa9a29f8",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-12-24T10:54:37.262Z",
          "__v": 0
        };
        setnotes(notes.concat(note))
      }


      // Delete a Note
      const deleteNote = async (id) =>{
       // API call
       const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDQ3M2NkNThjZmU1ZWZhOWEyOWY4In0sImlhdCI6MTY0MDMyOTEzNn0.dAXuT2Rvm-XuUZOj3lndg0T5RUP5M68Xu7-WLbwff6Y'
        }
      });
      const json = response.json();
      console.log(json)
        console.log("delete button is working with id: "+id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
      }  

      // Edit a Note 
      const editNote = async (id,title, description, tag) =>{

        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDQ3M2NkNThjZmU1ZWZhOWEyOWY4In0sImlhdCI6MTY0MDMyOTEzNn0.dAXuT2Rvm-XuUZOj3lndg0T5RUP5M68Xu7-WLbwff6Y'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Edit a Note in Client LOGIC
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id ===id){
            newNotes[index].title = title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setnotes(newNotes);
      }    
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;