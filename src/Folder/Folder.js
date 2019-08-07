import React from 'react';
import Notes from '../notes/notes';
import FolderError from './FolderError';
import PropType from 'prop-types';

class Folder extends React.Component {
  render() {
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

Folder.propType = {
  history: PropType.object,
  location: PropType.object,
  match: PropType.shape({
    params: PropType.shape({
      folderId: PropType.string.isRequired
    }).isRequired
  }).isRequired
};

export default Folder;
