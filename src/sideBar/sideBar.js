import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';
import NotefulContext from '../notefulContext';

export default function sideBar(props) {
  /* const folders = props.folders.map(folder => (
            <NavLink 
                className='folder-link' 
                key={folder.id} 
                to={`/folder/${folder.id}`}>
                {folder.name}
            </NavLink>
        ))*/

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
            <button className="add-folder">Add Folder</button>
          </div>
        );
      }}
    </NotefulContext.Consumer>
  );
}
