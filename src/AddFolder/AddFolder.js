import React from 'react';
import './AddFolder.css';
import config from '../config';
import NotefulContext from '../notefulContext';

export default class AddFolder extends React.Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
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
    console.log(this.context);
    return (
      <div className="add-folder-form">
        <form className="add_folder" onSubmit={this.handleSubmit}>
          <h2>Add Folder</h2>
          <label htmlFor="folder-name">Folder Name</label>
          <input
            type="text"
            name="name"
            defaultValue="Not important"
            id="name"
          />
          <button type="submit">Add Folder</button>
        </form>
      </div>
    );
  }
}
