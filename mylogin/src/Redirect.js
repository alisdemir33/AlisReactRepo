import {ProtectedRoute} from './ProtectedRoute'
import WeatherApp from './ekene/WeatherApp';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Login from './login'

class RedirectToLogin extends Component {
    
    constructor (props){
        super (props);
        console.log(props);
        alert(props.history.location.state.from+'from')
    }
    render() {
      return (
        <Router>
          <div>
            <ul>
              <li>You Must Have To<b> <Link to="/login"> Login </Link> to View This Page!</b></li>             
            </ul>
            <hr/>
           {/* <Route exact path="/login" component={Login} from={this.props.history.location.state.from}/>   */}        
           <Route exact path="/login" render={(props) => (<Login redirectedFrom={this.props.location.state.from}/>)} />        
          {/*  <ProtectedRoute exact path='/WeatherRoute' component={WeatherApp} /> */}
          </div>
        </Router>
      )
    }
  }
  export default RedirectToLogin;