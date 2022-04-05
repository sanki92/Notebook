import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote } = props;
    return (
   
            <div className="card m-4 ">
            <div className="card-body">
                <div className="d-flex justify-content-end align-items-center">
                <h5 className="card-title my-1 mx-auto">{note.title}</h5>
                <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i> 
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>

    )
}
export default Noteitem 
