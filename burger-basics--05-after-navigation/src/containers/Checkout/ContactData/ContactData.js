import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    ingredients: null,
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
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
    console.log(this.state.totalPrice)
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: "Max Schwar",
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
        this.setState({ loading: false },
           () =>{
           this.props.history.push('/')
        });
       
        alert("Order is accepted!");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
         
          type="Text"
          name="Name"
          placeholder="Your Name"
        ></Input>
        <Input
         inputType="text"
          type="Email"
          name="Email"
          placeholder="Your Email"
        ></Input>
        <Input
          inputType="text"
          type="Text"
          name="Street"
          placeholder="Street Name"
        ></Input>
        <Input
          inputType="text"
          type="Text"
          name="PostalCode"
          placeholder="Postal Code"
        ></Input>
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
