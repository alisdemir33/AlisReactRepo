import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'

class Checkout extends Component {
  /* state = {
    ingredients: null
  /*   {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    } 
    ,
    price: 0
  }; */

  componentWillMount() {
    //this.props.onPurchaseInit();

    //  console.log()
    /*  this.setState({
            ingredients:this.props.location.state.currentIngredients
        }) */

    /*  const query = new URLSearchParams(this.props.location.search);
     const ingredients = {};
     let totPrice = 0;
     for (let param of query.entries()) {
       // ['salad', '1']
       if (param[0] === "price") {
         totPrice = +param[1];
       } else {
         ingredients[param[0]] = +param[1];
       } 
     }*/

    /*     this.setState({
          ingredients: ingredients,
          price: totPrice.toFixed(2)
        }); */
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
    let summary = <Redirect to="/"> </Redirect>
    console.log('purchased??:'+this.props.purchased)
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
     

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkOutCanceled={this.checkOutCanceledClicked}
            checkOutContinued={this.checkOutContinuedClicked}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;

  }
}

const mapStateToProps = state => {

  return {
    ingredients: state.burgerReducer.ingredients, //state.ResultReducer.results
    totalPrice: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased
  };
   
};

export default connect(mapStateToProps)(Checkout);
