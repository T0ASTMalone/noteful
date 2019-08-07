import React from 'react';
import Notes from '../notes/notes';
import FolderError from './FolderError';

class Folder extends React.Component {
  render() {
    console.log(this.props);
    return (
      <FolderError>
        <div className="folder">
          <Notes
            notes={this.props.match.params.folderId}
            history={this.props.history}
          />
        </div>
      </FolderError>
    );
  }
}

export default Folder;
