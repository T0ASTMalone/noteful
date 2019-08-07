import React from 'react';
import './AddNote.css';
import NotefulContext from '../notefulContext';
import config from '../config';

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
        touched: false
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
    this.setState({ folderId: { value: folderId, touched: true } });
  }

  handleSubmit = e => {
    e.preventDefault();

    const dateModified = new Date().toISOString();
    const { name, content, folderId } = this.state;
    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folderId.value,
      modified: dateModified
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
      return 'Name is required';
    }
  }

  validateContent() {
    const content = this.state.content.touched;
    if (content.length < 1) {
      return 'Note is required';
    }
  }

  validateFolder() {
    const folder = this.state.folderId.touched;
    if (!folder) {
      return 'A folder must be selected';
    }
  }

  render() {
    const folders = this.context.folders;
    return (
      <form className="add_note" onSubmit={this.handleSubmit}>
        <h2>Add Note</h2>
        <label htmlFor="note-name">Note Name</label>
        <input
          type="text"
          name="name"
          placeholder="Zigg"
          id="name"
          onChange={e => this.updateName(e.target.value)}
        />
        <label htmlFor="note">Note</label>
        <textarea
          type="text"
          name="note"
          id="note"
          onChange={e => this.updateContent(e.target.value)}
        />
        <label htmlFor="folder-select" />
        {folders.map(folder => (
          <label htmlFor={folder.name} key={folder.id}>
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
        <button
          type="submit"
          disabled={
            this.validateName() ||
            this.validateContent() ||
            this.validateFolder()
          }
          onClick={() => this.props.history.goBack()}
        >
          Add Note
        </button>
      </form>
    );
  }
}
