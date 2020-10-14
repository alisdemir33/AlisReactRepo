import React, { Component } from "react";
import { Switch, Route, withRouter,Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Signup from "./containers/Auth/Signup";
import AnnouncementList from "./containers/Announcements/AnnouncementList";

class App extends Component {
  componentDidMount() {
    console.log("APP component is CHECKING try on auto Sign IN...");
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />  
        <Route path="/signup" component={Signup} />        
        <Route path="/" component={Auth} />             
        <Redirect to ='/'></Redirect>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/announcementlist" component={AnnouncementList} />   
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/burgerbuilder" component={BurgerBuilder} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />  
          <Route path="/signup" component={Signup} /> 
          <Route path="/" component={Auth} />
          <Redirect to ='/'></Redirect>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.userId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
