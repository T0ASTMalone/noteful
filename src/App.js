import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import SideBar from './sideBar/sideBar';
import Notes from './notes/notes';
import Note from './note/note';
import NoteNav from './NoteNav/NoteNav';
import Folder from './Folder/Folder';
import NotefulContext from './notefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NavError from './NavError';
import config from './config';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    redirect: false
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/folders`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          folders: data
        });
      })
      .catch(error => {
        console.error(error);
      });

    fetch(`${config.API_ENDPOINT}/api/notes`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          notes: data
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getNote(noteId) {
    return this.state.notes.find(note => {
      return note.id.toString() === noteId;
    });
  }

  addFolder = (folderId, folderName) => {
    const folder = { name: folderName, id: folderId };
    this.setState({ folders: [...this.state.folders, folder] });
  };

  addNote = newNote => {
    this.setState({ notes: [...this.state.notes, newNote] });
  };

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  getFolderName(noteId) {
    let id = this.state.notes.find(note => {
      let folderId;
      if (note.id === noteId) {
        folderId = note.folderId;
      }
      return folderId;
    });
    let folder = this.state.folders.find(folder => {
      return folder.id === id.folderId;
    });
    return folder.name;
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };
    return (
      <NotefulContext.Provider value={value}>
        <div className="App">
          <header className="header">
            <h1>
              <Link className="app-name" to="/">
                Noteful
              </Link>
            </h1>
          </header>
          <div className="wrapper">
            <nav>
              <NavError>
                <Switch>
                  <Route
                    exact
                    path={['/', '/folder/:folderId', '/addFolder', '/addNote']}
                    component={SideBar}
                  />
                  <Route path="/note/:noteId" component={NoteNav} />
                </Switch>
              </NavError>
            </nav>
            <main>
              <Switch>
                <Route exact path="/" component={Notes} />
                <Route path="/folder/:folderId" component={Folder} />
                <Route
                  path="/note/:noteId"
                  component={props => (
                    <Note note={this.getNote(props.match.params.noteId)} />
                  )}
                />
                <Route path="/addFolder" component={AddFolder} />
                <Route path="/addNote" component={AddNote} />
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
