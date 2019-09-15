import React from 'react';
import PropTypes from 'prop-types';

class AddNoteError extends React.Component {
  render() {
    if (!this.props.hasError /* || this.props.touched === false */) {
      return <></>;
    } else return <div className="error">{this.props.hasError}</div>;
  }
}

AddNoteError.propTypes = {
  hasError: PropTypes.string,
  touched: PropTypes.bool
};

export default AddNoteError;
