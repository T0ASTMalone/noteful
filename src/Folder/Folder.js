import React from 'react';
import Notes from '../notes/notes';

class Folder extends React.Component {
  render() {
    return (
      <div className="folder">
        <Notes
          notes={this.props.match.params.folderId}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Folder;
