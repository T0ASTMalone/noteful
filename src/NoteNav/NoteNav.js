import React from 'react';
import '../sideBar/sideBar.css';
import './NoteNav.css';
import NotefulContext from '../notefulContext';
import PropType from 'prop-types';

class NoteNav extends React.Component {
  static contextType = NotefulContext;

  getFolderName() {
    console.log(this.props);
    const noteId = this.props.match.params.noteId;
    const note = this.context.notes.find(note => {
      return note.id === noteId;
    });
    const folder = this.context.folders.find(folder => {
      return folder.id === note.folderId;
    });
    return folder.name;
  }

  render() {
    const folderName = this.getFolderName();
    return (
      <div className="side-bar">
        <button className="go-back" onClick={() => this.props.history.goBack()}>
          Go Back
        </button>
        <h2 className="folder-name">{folderName}</h2>
      </div>
    );
  }
}

NoteNav.propType = {
  noteId: PropType.string,
  history: PropType.object
};

export default NoteNav;
