import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null
  /*   {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    } */
    ,
    price: 0
  };

  componentWillMount() {
    //  console.log()
    /*  this.setState({
            ingredients:this.props.location.state.currentIngredients
        }) */

    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totPrice = 0;
    for (let param of query.entries()) {
      // ['salad', '1']
      if (param[0] === "price") {
        totPrice = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({
      ingredients: ingredients,
      price: totPrice.toFixed(2)
    });
  }

  checkOutCanceledClicked = () => {
    console.log("Cancel Clicked!!");
    this.props.history.goBack();
  };

  checkOutContinuedClicked = () => {
    console.log("Continue Clicked!!");
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkOutCanceled={this.checkOutCanceledClicked}
          checkOutContinued={this.checkOutContinuedClicked}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
