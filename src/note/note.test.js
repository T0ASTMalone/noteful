import React from 'react';
import ReactDOM from 'react-dom';
import Note from './note';
import renderer from 'react-test-renderer';

describe('Note', () => {
  it('renders the component without crashing', () => {
    const tree = renderer.create(<Note />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
