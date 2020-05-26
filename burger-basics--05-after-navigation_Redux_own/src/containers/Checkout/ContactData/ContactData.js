import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
   // ingredients: null,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name"
        },
        value: "",
        touched: false,
        validation: {
          required: true          
        },
        valid: false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: "",
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        touched: false,
        validation: {
          required: true,
          minlength: 5,
          maxlength: 5
        },
        valid: false
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: 'fastest',
        validation:{},
        valid:true
      }
    },
    formIsValid:false,
    price: 5,
    loading: false
  };

  //let ingredients;

 /*  componentDidMount() {
    this.setState({
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    });
  } */

  checkValidity(value, validation) {
    let isValid = true;

    if (validation) {
      if (validation.required) {
        isValid = value.trim() !== "" && isValid;
      }
      if (validation.minlength) {
        isValid = value.length >= validation.minlength && isValid;
      }
      if (validation.maxlength) {
        isValid = value.length <= validation.maxlength && isValid;
      }
    }
    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    console.log(this.props.totalPrice);

    this.setState({ loading: true });

    const formData = {};

    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false }, () => {
          this.props.history.push("/");
        });

        alert("Order is accepted!");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const orderFormCopy = { ...this.state.orderForm };
    const clonedFormElement = { ...orderFormCopy[inputIdentifier] };
    clonedFormElement.value = event.target.value;
    clonedFormElement.touched = true;
    clonedFormElement.valid = this.checkValidity(
      event.target.value,
      clonedFormElement.validation
    );
    orderFormCopy[inputIdentifier] = clonedFormElement;
   
    let formIsValid=true;
    for(let identifier in orderFormCopy){
     if(! orderFormCopy[identifier].valid){
      formIsValid=false;
     }
    }

    console.log(formIsValid);

    this.setState({ orderForm: orderFormCopy, formIsValid:formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    const formWithElements = formElementsArray.map(item => {
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
          changed={event => this.inputChangedHandler(event, item.id)}
        ></Input>
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formWithElements}
        <Button btnType="Success" disabled ={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.state.loading) form = <Spinner></Spinner>;

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data Please!</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    ingredients: state.burgerReducer.ingredients, //state.ResultReducer.results
    totalPrice: state.burgerReducer.totalPrice
  };

};


const mapDispatchToProps = () =>{


}


export default connect(mapStateToProps,mapDispatchToProps)(ContactData);
