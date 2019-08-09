import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';
import NotefulContext from '../notefulContext';
import PropType from 'prop-types';

export default function sideBar(props) {
  function makeFolderButtons(folders) {
    return folders.map(folder => (
      <NavLink
        className="folder-link"
        key={folder.id}
        to={`/folder/${folder.id}`}
      >
        {folder.name}
      </NavLink>
    ));
  }

  return (
    <NotefulContext.Consumer>
      {value => {
        return (
          <div className="side-bar">
            {makeFolderButtons(value.folders)}
            <NavLink to="/addFolder" className="add-folder">
              Add Folder
            </NavLink>
          </div>
        );
      }}
    </NotefulContext.Consumer>
  );
}

sideBar.propType = {
  history: PropType.object,
  location: PropType.object,
  match: PropType.object
};
