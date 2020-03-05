import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    ingredients: null,
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    price: 0,
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

    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Max Schwarz",
        address: {
          street: "teststreet",
          zipCode: "444",
          country: "Germany"
        },
        email: "test@test.gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        alert('Order is accepted!')
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data Please!</h4>
        <form>
          <input
            className={classes.Input}
            type="Text"
            name="Name"
            placeholder="Your Name"
          ></input>
          <input
            className={classes.Input}
            type="Email"
            name="Email"
            placeholder="Your Email"
          ></input>
          <input
            className={classes.Input}
            type="Text"
            name="Street"
            placeholder="Street Name"
          ></input>
          <input
            className={classes.Input}
            type="Text"
            name="PostalCode"
            placeholder="Postal Code"
          ></input>
          <Button clicked={this.orderHandler} btnType="Success">
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
