import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Favorite from './components/Favorite';
import Main from './components/Main';
import Header from './components/Header';

 class App extends Component {
  render() {
    return (
      <>

      <Router>
        <Header/>
        <Switch>

          <Route exact path="/">
            <Main/>
          </Route>
          <Route exact path="/fav">
            <Favorite/>
          </Route>

        </Switch>

      </Router>
        
      </>
    )
  }
}

export default App

