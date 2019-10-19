
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute'
import Login from './login';
import WeatherApp from './ekene/WeatherApp';
import Contact from './Vakif/Contact';
import Public from './startup';
import NestedRoute from './nestedroute';
import RedirectToLogin from './Redirect';
import StarRating from './StarRating';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/login'} className="nav-link"> Login </Link></li>           
            <li><Link to={'/WeatherRoute'} className="nav-link">Weather</Link></li>
            <li><Link to={'/nested'} className="nav-link">Nested Roots</Link> </li>
            <li><Link to={'/Vakif/contact'} className="nav-link">Contact</Link></li>
           <li><Link to= {'/'} className="nav-link"> Public Page</Link> </li>
           <li><Link to ={'/StarRating'} className="nav-link">Star</Link> </li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/login' component={Login} />             
              <Route exact path="/" component={Public}/>
              <Route exact path='/RedirectToLogin' component={RedirectToLogin} />
              <Route exact path ='/nested' component={NestedRoute}/>
              <ProtectedRoute exact path='/WeatherRoute' component={WeatherApp} />
              <Route exact path='/StarRating' component={StarRating} />
              <Route path='*' component={Contact} />
               
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;