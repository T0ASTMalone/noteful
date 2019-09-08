import React from 'react';
import './AddNote.css';
import NotefulContext from '../notefulContext';
import config from '../config';
import PropType from 'prop-types';
import AddNoteError from './AddNoteError';

export default class AddNote extends React.Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      folderId: {
        value: '',
        touched: true
      }
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateContent(note) {
    this.setState({ content: { value: note, touched: true } });
  }

  updateFolder(folderId) {
    this.setState({ folderId: { value: folderId, touched: false } });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push('/');
    //const dateModified = new Date().toISOString();
    const { name, content, folderId } = this.state;
    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folderId.value
      //modified: dateModified
    };
    const url = config.API_ENDPOINT + '/notes';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newNote),
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
      .then(data => {
        this.context.addNote(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length < 1) {
      return 'A note name is required';
    }
  }

  validateContent() {
    const content = this.state.content.value;
    if (content.length < 1) {
      return 'A note is required';
    }
  }

  validateFolder() {
    const folderSelected = this.state.folderId.touched;
    if (!folderSelected === false) {
      return 'A folder must be selected';
    }
  }

  render() {
    const folders = this.context.folders;
    return (
      <form className="add_note" onSubmit={this.handleSubmit}>
        <h2 className="form-label">Add Note</h2>
        <label className="input-label" htmlFor="note-name">
          Note Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Zigg"
          id="name"
          onChange={e => this.updateName(e.target.value)}
        />
        <AddNoteError
          hasError={this.validateName()}
          touched={this.state.name.touched}
        />
        <label className="input-label" htmlFor="note">
          Note
        </label>
        <textarea
          type="text"
          name="note"
          id="note"
          onChange={e => this.updateContent(e.target.value)}
        />
        <AddNoteError
          hasError={this.validateContent()}
          touched={this.state.content.touched}
        />
        <label className="input-label" htmlFor="folder-select">
          Folder
        </label>
        {folders.map(folder => (
          <label className="radio-label" htmlFor={folder.name} key={folder.id}>
            <input
              type="radio"
              name="folderId"
              id={folder.name}
              value={folder.id}
              onChange={folderId => this.updateFolder(folder.id)}
            />
            {folder.name}
          </label>
        ))}
        <AddNoteError
          hasError={this.validateFolder()}
          touched={this.state.folderId.touched}
        />
        <button
          type="submit"
          className="submit button"
          disabled={
            this.validateName() ||
            this.validateContent() ||
            this.validateFolder()
          }
          //onClick={() => this.props.history.goBack()}
        >
          Add Note
        </button>
      </form>
    );
  }
}

AddNote.propType = {
  history: PropType.object,
  location: PropType.object,
  match: PropType.object
};
