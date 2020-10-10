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
import CardImage from "../../components/IdentityCard/IdCard";

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
          isEmail: true,
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
          isEmail: true,
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
    message: "",
    errorStatus:false
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

  signupHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};
    for (let formElemIdentifier in this.state.signUpForm) {
      formData[formElemIdentifier] = this.state.signUpForm[
        formElemIdentifier
      ].value;
    }

    // dispatch(signupStart());

    let url = "https://localhost:44384/sample/signup";

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post(url, formData, axiosConfig)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false , errorStatus:true,  message:response.data.resultExplanation});
      })
      .catch((error) => {
        debugger;
        console.log(error);
        if (error.response != null || error.response !== undefined)
          this.setState({ errorStatus:true,  message: error.response.message, loading: false });      
        else 
          this.setState({ errorStatus:true, message : "Bağlantı Hatası:"+error, loading: false });
      });
  };

  redirectToLoginHandler = (event) => {
    event.preventDefault();
    this.props.history.push("/auth");
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key,
        config: this.state.signUpForm[key],
      });
    }

    let mainFormBody = <Spinner></Spinner>;

    let checkBoxRelated = (
      <div>
        <input type="checkbox" onChange={this.handleChecked} checked={this.state.isNewIdCard} />
        Yeni Kimlik Sahibiyim!
        <CardImage cardType={this.state.isNewIdCard}></CardImage>
      </div>
    );

    let formWithElements = <Spinner></Spinner>;

    if (!this.state.loading) {
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

      mainFormBody = (
        <div>
          {formWithElements}
          {checkBoxRelated}
        </div>
      );
    }

    let errorDiv = null;
    if (this.state.errorStatus) {
      errorDiv = <div>{this.state.message}</div>;
    }
    let form = (
      <form onSubmit={this.signupHandler}>
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

        {mainFormBody}

        <Button btnType="Success">KAYDET</Button>
        <Button clicked={this.redirectToLoginHandler} btnType="Danger">
          GİRİŞ
        </Button>
        {errorDiv}
        <SignupExplanation></SignupExplanation>
      </form>
    );

    /*    if (this.props.isAuthenticated) {
      if (this.props.building)
        form = <Redirect to={this.props.redirectPath}></Redirect>;
      else form = <Redirect to="/"></Redirect>;
    } */

    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
   // loading: state.authReducer.loading,
   // error: state.authReducer.error,
    isAuthenticated: state.authReducer.userId !== null,
   // building: state.burgerReducer.building,
    redirectPath: state.authReducer.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*   onSignup: (formData) => {
      dispatch(authActions.signupAttempt(formData));
    }, */
    onSetAuthRedirectPath: () => {
      dispatch(authActions.setAuthRedirectPath("/"));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup, axios);
