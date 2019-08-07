import React from 'react';
import PropTypes from 'prop-types';

class AddFolderError extends React.Component {
  render() {
    if (!this.props.hasError || this.props.touched === false) {
      return <></>;
    } else return <div className="error">{this.props.hasError}</div>;
  }
}

AddFolderError.propTypes = {
  hasError: PropTypes.string,
  touched: PropTypes.bool
};

export default AddFolderError;
