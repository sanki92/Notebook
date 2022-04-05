import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;

    useEffect(() => {
        getNote();
        // eslint-disable-next-line
    }, [])
       const ref = useRef(null)
       const refClose =useRef(null)
    const updateNote = (currentNote) => {
            ref.current.click();
            setnote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }
         const handleClick = (e) =>{
             editNote(note.id, note.etitle, note.edescription, note.etag);
            refClose.current.click();
            e.preventDefault();
      
        }
        const [note, setnote] = useState({id:"",etitle:"",edescription:"", etag:"default"})
        const onChange = (e) =>{
                setnote({...note, [e.target.name]: e.target.value})
        }
    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button  ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name='etitle' onChange={onChange} className="form-control" value={note.etitle} id="etitle" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" name='edescription' onChange={onChange} className="form-control" value={note.edescription} id="edescription" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name='etag' onChange={onChange} className="form-control" value={note.etag} id="etag" />
                </div>

                
            </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button onClick={handleClick} type="button" className="btn btn-primary">Update Notes</button>
                </div>
                </div>
            </div>
            </div>
                <h3>Your Notes</h3>
                <div className="row justify-content-center mx-auto ">
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes;
