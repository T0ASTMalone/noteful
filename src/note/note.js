import React from 'react';
import './note.css';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../notefulContext';

class Note extends React.Component {
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
    //this.context.deleteNote(noteId);
    this.props.history.push('/');
    fetch(`http://localhost:9090/notes/${noteId}`, {
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
    const note = this.props.note;
    return (
      <div className="note-route">
        <div className="note">
          <h2>{note.name}</h2>
          <p className="date-modified">
            Date Modified on {this.getModifiedString(note.modified)}
          </p>
          <button
            className="delete-note"
            onClick={() => this.renderRedirect(note.id)}
          >
            Delete Note
          </button>
        </div>
        <p className="content">{note.content}</p>
      </div>
    );
  }
}

export default withRouter(Note);
