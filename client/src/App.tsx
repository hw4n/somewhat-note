import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Document from './components/Document';

function App() {
  return (
    <Router>
      <Link to="/">List</Link>
      <Switch>
        <Route exact path="/">
          <List/>
        </Route>
        <Route exact path="/read/:document" component={Document}/>
      </Switch>
    </Router>
  );
}

export default App;
