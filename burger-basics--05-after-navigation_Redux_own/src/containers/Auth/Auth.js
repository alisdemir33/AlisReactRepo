import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as authActions from '../../store/actions/index'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "axios";

class Auth extends Component {

  state = {
    // ingredients: null,
    loginForm: {

      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
      },

      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
      }
    },
    formIsValid: false,
    loading: false,
    isSignUp: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  componentDidMount(){
    if(!this.props.building &&  this.props.redirectPath !=='/')
    this.props.onSetAuthRedirectPath()
  }


  loginHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignUp)
    //alert('login tried!')
    /*
    
    const formData = {};

    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
    } 

    this.props.onOrderSubmit(order);*/
  };

  signUpInSwitchHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //  console.log(event.target.value);
    const formCopy = { ...this.state.loginForm };
    const clonedFormElement = { ...formCopy[inputIdentifier] };
    clonedFormElement.value = event.target.value;
    clonedFormElement.touched = true;
    clonedFormElement.valid = this.checkValidity(
      event.target.value,
      clonedFormElement.validation
    );
    formCopy[inputIdentifier] = clonedFormElement;

    let formIsValid = true;
    for (let identifier in formCopy) {
      if (!formCopy[identifier].valid) {
        formIsValid = false;
      }
    }
    this.setState({ loginForm: formCopy, formIsValid: formIsValid });
  };

  /* inputChangedHandler = (event, controlName) => {
     const updatedControls = {
         ...this.state.controls,
         [controlName]: {
             ...this.state.controls[controlName],
             value: event.target.value,
             valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
             touched: true
         }
     };
     this.setState({controls: updatedControls});
 }*/

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let formWithElements = <Spinner></Spinner>

    if (!this.props.loading) {
      formWithElements = formElementsArray.map((item) => {
        return (
          <Input
            key={item.id}
            invalid={!item.config.valid}
            touched={item.config.touched}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            customMsg={item.config.elementConfig.placeholder}
            value={item.config.value}
            shouldValidate={item.config.validation && item.config.touched}
            changed={(event) => this.inputChangedHandler(event, item.id)}
          ></Input>
        );
      });
    }

    let errorDiv = null;
    if (this.props.error) {
      errorDiv = <div>ERROR On Login ! {this.props.error.message}</div>
    }

    let form = (
      <form onSubmit={this.loginHandler}>
        {formWithElements}
        <Button btnType="Success" >
          LOGIN
        </Button>
        <Button clicked={this.signUpInSwitchHandler} btnType="Danger" >
          Sign {this.state.isSignUp ? <b>UP</b> : <b>IN</b>}
        </Button>
        {errorDiv}
      </form>
    );

    if(this.props.isAuthenticated ){
      if( this.props.building) 
      form = <Redirect to={this.props.redirectPath}></Redirect>
      else
      form = <Redirect to='/'></Redirect>
    }


    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );


  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !==null,
    building:state.burgerReducer.building,
    redirectPath:state.authReducer.authRedirectPath
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userName, password, method) => {
      dispatch(authActions.authAttempt(userName, password, method));
    },
    onSetAuthRedirectPath: () =>{
      dispatch (authActions.setAuthRedirectPath('/'))
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth, axios);