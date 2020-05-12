import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Login from './Components/Login';
import UserSelection from './Components/UserSelection';
import ContentMenu from './Components/ContentMenu';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/user" exact component={UserSelection}></Route>
          <Route path="/main" exact component={ContentMenu}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
