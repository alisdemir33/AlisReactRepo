
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute'
import Login from './login';
import WeatherApp from './ekene/WeatherApp';
import Contact from './Contact';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Login </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/WeatherRoute'} className="nav-link">Weather</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Login} />             
              <ProtectedRoute exact path='/WeatherRoute' component={WeatherApp} />
              <Route path='*' component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;