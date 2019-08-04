import React from 'react';
import './MainNotes.css';
import { Link, withRouter } from 'react-router-dom';
import NotefulContext from '../notefulContext';

class MainNotes extends React.Component {
  static contextType = NotefulContext;

  getModifiedString(date) {
    let newDate = new Date(date);
    return newDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  renderRedirect = noteId => {
    this.context.deleteNote(noteId);
    this.props.history.push('/');
  };

  render() {
    console.log(this.props.match.params);
    const Notes = this.props.notes.map((note, i) => (
      <div className="note" key={i}>
        <Link to={`/note/${note.id}`}>
          <h2 className="note-name">{note.name}</h2>
        </Link>
        <span className="date-modified">
          Date modified on {this.getModifiedString(note.modified)}
        </span>
        <button
          className="delete-note"
          onClick={() => this.renderRedirect(note.id)}
        >
          Delete Note
        </button>
      </div>
    ));

    return (
      <div className="notes">
        {Notes}
        <button className="add-note">Add Note</button>
      </div>
    );
  }
}

export default withRouter(MainNotes);
