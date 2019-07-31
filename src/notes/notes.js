import React from 'react';
import './notes.css';
import { Link } from 'react-router-dom';

class Notes extends React.Component {
    render() {
        const Notes = this.props.notes.map((note, i) => (
            <div className='note' key={i}>
                <Link to={`/note/${note.id}`}><h2 className='note-name'>{note.name}</h2></Link>
                <p>Date modified on {note.modified}</p>
                <button>Delete</button>
            </div>
        ))

        return(
            <div className="notes">
                {Notes}
            </div>
        )
    }
}

export default Notes;