import React from 'react';
import './AddFolder.css';
import config from '../config';
import NotefulContext from '../notefulContext';
import AddFolderError from './AddFolderError';
import PropType from 'prop-types';

export default class AddFolder extends React.Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      name: {
        value: '',
        touched: false
      }
    };
  }

  updateFolderName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  validateFolderName() {
    const name = this.state.name.value.trim();
    if (name.length < 1) {
      return 'A name is required';
    } else if (name.length > 50) {
      return 'The name must be less than 50 characters';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const folder = {
      name: e.target.name.value
    };
    const url = config.API_ENDPOINT + '/folders';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(folder),
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
        const name = folder.name;
        const id = data.id;
        this.context.addFolder(id, name);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <div className="add-folder-form">
        <form className="add_folder" onSubmit={this.handleSubmit}>
          <h2>Add Folder</h2>
          <label htmlFor="folder-name">Folder Name</label>
          <input
            type="text"
            name="name"
            placeholder="Not important"
            id="name"
            onChange={e => this.updateFolderName(e.target.value)}
          />
          <AddFolderError
            hasError={this.validateFolderName()}
            touched={this.state.name.touched}
          />
          <button type="submit" disabled={this.validateFolderName()}>
            Add Folder
          </button>
        </form>
      </div>
    );
  }
}

AddFolder.propType = {
  history: PropType.object,
  location: PropType.object,
  match: PropType.object
};
