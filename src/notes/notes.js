import React from 'react';
import './notes.css';
import { Link } from 'react-router-dom';

class Notes extends React.Component {
    getModifiedString(date) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'

        })
    }

    render() {
        const Notes = this.props.notes.map((note, i) => (
            <div className='note' key={i}>
                <Link to={`/note/${note.id}`}><h2 className='note-name'>{note.name}</h2></Link>
                <span className="date-modified">Date modified on {this.getModifiedString(note.modified)}</span>
                <button className='delete-note'>Delete Note</button>
            </div>
        ))

        return(
            <div className='notes'>
                {Notes}
                <button className='add-note'>Add Note</button>
            </div>
        )
    }
}

export default Notes;