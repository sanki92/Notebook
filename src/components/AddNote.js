import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const handleClick = (e) =>{
            e.preventDefault();
            addNote(note.title,note.description,note.tag);
    }
    const [note, setnote] = useState({title:"",description:"", tag:"default"})
    const onChange = (e) =>{
            setnote({...note, [e.target.name]: e.target.value})
    }
    return (
     
            <div className="container my-4">
            <h3>Add a Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name='title' onChange={onChange} className="form-control" id="title" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name='description' onChange={onChange} className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name='tag' onChange={onChange} className="form-control" id="tag" />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
            </div>
    )
}

export default AddNote
