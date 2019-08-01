import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';

class SideBar extends React.Component {

    render() {
        const folders = this.props.folders.map(folder => (
            <NavLink 
                className='folder-link' 
                key={folder.id} 
                to={`/folder/${folder.id}`}>
                {folder.name}
            </NavLink>
        ))
        return (
            <div className='side-bar'>
                { folders }
                <button className='add-folder'>Add Folder</button>
            </div>
        )
    }
}

export default SideBar;