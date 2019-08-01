import React from 'react';
import Notes from '../notes/notes';

class Folder extends React.Component {
    render() {
        return (
            <div className="folder">
                <Notes notes={ this.props.notes } />
            </div>
        )
    }
}

export default Folder