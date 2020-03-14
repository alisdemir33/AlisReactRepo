import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    ingredients: null,
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid:false
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: "",
        validation: {
          required: true
        },
        valid:false
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validation: {
          required: true,          
          minlength:5, 
          maxlength:5
        },
        valid:false
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid:false
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid:false
      },

      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
        
      }
    },

    price: 5,
    loading: false
  };

  //let ingredients;

  componentDidMount() {
    this.setState({
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    });
  }

  checkValidity(value, rules){
    let isValid=true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid
    }
    if(rules.minlength ){
        isValid = value.length >=rules.minlength  && isValid     
    }
    if(rules.maxlength){     
      isValid= value.length <=rules.maxlength  && isValid
  }
    return isValid;
  }

  orderHandler = event => {
    event.preventDefault();
    console.log(this.state.totalPrice);

    this.setState({ loading: true });

    const formData = {};

    for (let formElemIdentifier in this.state.orderForm) {
      formData[formElemIdentifier] = this.state.orderForm[
        formElemIdentifier
      ].value;
    }

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
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
    clonedFormElement.valid = this.checkValidity(event.target.value,clonedFormElement.validation  )
    orderFormCopy[inputIdentifier] = clonedFormElement;
    console.log(clonedFormElement)
    this.setState({ orderForm: orderFormCopy });
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
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.config.value}
          shouldValidate={item.config.validation}
          changed={event => this.inputChangedHandler(event, item.id)}
        ></Input>
      );
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formWithElements}
        <Button btnType="Success">ORDER</Button>
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

export default ContactData;
