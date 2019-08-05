import React from 'react';

export default class FolderError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Could not display these notes</h2>;
    }
    return this.props.children;
  }
}
