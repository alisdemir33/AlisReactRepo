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
        value: ""
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: ""
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: ""
      },

      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "email",
        elementConfig: {
          type: "text",
          placeholder: "Your Email"
        },
        value: ""
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

  orderHandler = event => {
    event.preventDefault();
    console.log(this.state.totalPrice);
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price
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

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
       id: key,
        config: this.state.orderForm[key]
      });
    }
    const formWithElements = formElementsArray.map((item) => {
      return (
        <Input
        key={item.id}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.config.value}
        ></Input>
      );
    });

    let form = (
      <form>
        {formWithElements}
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
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
