import React from 'react';
import './note.css';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../notefulContext';
import PropTypes from 'prop-types';

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
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
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
        return res;
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
        <div className="note full">
          <div className="note-info">
            <h2 className="note-name">{note.name}</h2>
            <p className="date-modified">
              Date Modified on {this.getModifiedString(note.date_modified)}
            </p>
          </div>
          <div className="button-container">
            <button
              className="delete-note"
              onClick={() => this.renderRedirect(note.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="content">{note.content}</p>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    date_modified: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default withRouter(Note);
