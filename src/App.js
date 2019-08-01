import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import dummyStore from './dummy-store';
import SideBar from './sideBar/sideBar';
import Notes from './notes/notes';
import Note from './note/note';
import NoteNav from './NoteNav/NoteNav';
import Folder from './Folder/Folder';

class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    this.setState(dummyStore);
  }

  getNotes(folderId) {
    const notes = this.state.notes.filter(note => {
      return note.folderId === folderId;
    })
    return notes
  }

  getNote(noteId) {
    return this.state.notes.find(note => {
      return note.id === noteId;
    })
  }

  getFolderName(noteId) {
    let id = this.state.notes.find(note => {
      let folderId;
      if(note.id === noteId) {
        folderId = note.folderId;
      }
      return folderId
    })
    let folder = this.state.folders.find(folder => {
      return folder.id === id.folderId
    })
    return folder.name;
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <div className="wrapper">
          <nav>
          <Switch>
            <Route 
              exact
              path={['/' , '/folder/:folderId']}
              render={(props) => <SideBar folders={this.state.folders}/>}/>
            <Route 
              path='/note/:noteId' 
              render={(props) => <NoteNav 
                folderName={this.getFolderName(props.match.params.noteId)}
                history={props.history}/>}
              />
          </Switch>
          </nav>
          <main>
            <Switch>
              <Route exact path='/' render={(props) => <Notes  notes={this.state.notes}/>}/>
              <Route path='/folder/:folderId' render={(props) => <Folder notes={this.getNotes(props.match.params.folderId)}/>}/>
              <Route path='/note/:noteId' render={(props) => <Note note={this.getNote(props.match.params.noteId)}/>}/>
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
