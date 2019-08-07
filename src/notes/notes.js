import React from 'react';
import './notes.css';
import { NavLink } from 'react-router-dom';
import NotefulContext from '../notefulContext';
import PropsTypes from 'prop-types';
import NotesError from './NotesError';
import config from '../config';

class Notes extends React.Component {
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
    this.props.history.push('/');
    const url = config.API_ENDPOINT + '/notes/' + noteId;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    let folderNotes = [];
    if (!this.props.notes) {
      folderNotes = this.context.notes;
    } else {
      folderNotes = this.context.notes.filter(
        note => note.folderId === this.props.notes
      );
    }

    const Notes = folderNotes.map((note, i) => (
      <div className="note" key={i}>
        <NavLink to={`/note/${note.id}`}>
          <h2 className="note-name">{note.name}</h2>
        </NavLink>
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
      <NotesError>
        <div className="notes">
          {Notes}
          <NavLink to="/addNote" className="add-note">
            Add Note
          </NavLink>
        </div>
      </NotesError>
    );
  }
}

Notes.propTypes = {
  notes: PropsTypes.string,
  history: PropsTypes.object
};

export default Notes;
