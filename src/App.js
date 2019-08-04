import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import SideBar from './sideBar/sideBar';
import Notes from './notes/notes';
import Note from './note/note';
import NoteNav from './NoteNav/NoteNav';
import Folder from './Folder/Folder';
import NotefulContext from './notefulContext';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    redirect: false
  };

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
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

    fetch('http://localhost:9090/notes', {
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
      return note.id === noteId;
    });
  }

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
      deleteNote: this.deleteNote
    };

    return (
      <NotefulContext.Provider value={value}>
        <div className="App">
          <header className="header">
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <div className="wrapper">
            <nav>
              <Switch>
                <Route
                  exact
                  path={['/', '/folder/:folderId']}
                  component={SideBar}
                />
                <Route path="/note/:noteId" component={NoteNav} />
              </Switch>
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
              </Switch>
            </main>
          </div>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;
