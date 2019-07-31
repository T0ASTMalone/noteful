import React from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

class SideBar extends React.Component {

    render() {
        const folders = this.props.folders.map(folder => (
            <div className='folder-link' key={folder.id}>
                <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
            </div>
        ))
        return (
            <div className='sideBar'>
                { folders }
            </div>
        )
    }
}

export default SideBar;