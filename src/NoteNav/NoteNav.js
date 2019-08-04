import React from 'react';
import '../sideBar/sideBar.css';
import './NoteNav.css';

function NoteNav(props) {
  return (
    <div className="side-bar">
      <button className="go-back" onClick={() => props.history.goBack()}>
        Go Back
      </button>
      <h2 className="folder-name">{props.folderName}</h2>
    </div>
  );
}

export default NoteNav;
