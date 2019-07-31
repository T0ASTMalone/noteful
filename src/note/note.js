import React from 'react';

class Note extends React.Component {
    render() {
        const note = this.props.note;
        return (
            <div className='note-route'>
                <div className="note">
                    <h2>{note.name}</h2>
                    <p>{note.modified}</p>
                    <button>Delete</button>
                </div>
                <p className="content">{note.content}</p>
            </div>
        )
    }
}

export default Note