import React from 'react';
import './note.css';

class Note extends React.Component {
    getModifiedString(date) {
        let newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'

        })
    }

    render() {
        const note = this.props.note;
        return (
            <div className='note-route'>
                <div className="note">
                    <h2>{note.name}</h2>
                    <p className='date-modified'>Date Modified on {this.getModifiedString(note.modified)}</p>
                    <button className='delete-note'>Delete Note</button>
                </div>
                <p className="content">{note.content}</p>
            </div>
        )
    }
}

export default Note