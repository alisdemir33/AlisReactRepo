import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as authActions from "../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from "axios";
import { updateObject } from "../../shared/util";
import SignupExplanation from "./SignupExplanation";
import CardImage from '../../components/IdentityCard/IdCard'

class Signup extends Component {
  state = {
    // ingredients: null,
    signUpForm: {
      tckn: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "TC Kimlik Numarası",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
      },

      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Adınız",
        },

        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: false,
        },
        valid: false,
      },
      surname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Soyadınız",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: false,
        },
        valid: false,
      },

     

      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "E-Posta",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
      },

      emailRepeat: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "E-Posta Tekrar",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: true,
        },
        valid: false,
      },
      cuzdanSeri: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nüfus Cüzdan Seri",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: false,
        },
        valid: false,
      },

      cuzdanNo: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nüfus Cüzdan No",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: false,
        },
        valid: false,
      },

    },
    formIsValid: false,
    loading: false,
    isNewIdCard: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  componentDidMount() {
    if (this.props.redirectPath !== "/") this.props.onSetAuthRedirectPath();
  }

  handleChecked = () => {
    this.setState({ isNewIdCard: !this.state.isNewIdCard });

    var formCopy = this.state.signUpForm;
    if (!this.state.isNewIdCard) {     
     
      delete formCopy.cuzdanNo;

    } else {
      formCopy.cuzdanNo = {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nüfus Cüzdan No",
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          isNumeric: false,
        },
        valid: false,
      };
    }
    this.setState({ signUpForm: formCopy });
  };

  loginHandler = (event) => {
    event.preventDefault();
    this.props.onSignup(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSignUp
    );
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

  redirectToLoginHandler = (event) => {
    event.preventDefault();
    this.props.history.push("/auth");
    /* this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    }); */
    // alert('Redirect o login page..')
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const clonedFormElement = updateObject(
      this.state.signUpForm[inputIdentifier],
      {
        value: event.target.value,
        touched: true,
        valid: this.checkValidity(
          event.target.value,
          this.state.signUpForm[inputIdentifier].validation
        ),
      }
    );

    const formCopy = updateObject(this.state.signUpForm, {
      [inputIdentifier]: clonedFormElement,
    });

    let formIsValid = true;
    for (let identifier in formCopy) {
      if (!formCopy[identifier].valid) {
        formIsValid = false;
      }
    }
    this.setState({ signUpForm: formCopy, formIsValid: formIsValid });
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
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key],
      });
    }

    let formWithElements = <Spinner></Spinner>;

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
      errorDiv = <div>ERROR On Login ! {this.props.error.message}</div>;
    }

    let form = (
      <form onSubmit={this.loginHandler}>
        <div
          style={{
            margin: "5px 0px 20px 5px",
            width: "auto",
            backgroundColor: "#B72327",
            color: "White",
            padding: "5px 0px 5px 15px",
            textAlign: "center",
          }}
        >
          YENİ ÜYE KAYIT FORMU
        </div>
       
        {formWithElements}
        <input type="checkbox" onChange={this.handleChecked} />
        Yeni Kimlik Sahibiyim!
          < CardImage cardType={this.state.isNewIdCard}></CardImage>
        <Button btnType="Success">KAYDET</Button>
        <Button clicked={this.redirectToLoginHandler} btnType="Danger">
          GİRİŞ
        </Button>
        {errorDiv}
        <SignupExplanation></SignupExplanation>
      </form>
    );

    if (this.props.isAuthenticated) {
      if (this.props.building)
        form = <Redirect to={this.props.redirectPath}></Redirect>;
      else form = <Redirect to="/"></Redirect>;
    }

    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.userId !== null,
    building: state.burgerReducer.building,
    redirectPath: state.authReducer.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (userName, password, method) => {
      dispatch(authActions.authAttempt(userName, password, method));
    },
    onSetAuthRedirectPath: () => {
      dispatch(authActions.setAuthRedirectPath("/"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup, axios);
