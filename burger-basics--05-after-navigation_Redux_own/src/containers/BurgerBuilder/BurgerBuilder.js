import React, { Component } from "react";

import Auxi from "../../hoc/AuxFolder/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux';

/* const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}; */

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    /*  ingredients: null,
     totalPrice: 4, 
    purchasable: false, */
    purchasing: false,
    loading: false,
    error: false
  };

  /*  componentDidMount() {
     console.log(this.props)
     axios
       .get("/ingredients.json")
       .then(response => {
         console.log(response);
         this.setState({ ingredients: response.data });
       })
       .catch(error => {
         this.setState({ error: true });
       });
   } */

  updatePurchaseState() {
  let result=false;
    const sum = Object.keys(this.props.ingredients)
      .map(igKey => {
        return this.props.ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      result = sum > 0
    return sum > 0 ;
  // this.setState({purchasable : result })
  }

  addIngredientHandler = type => {
    /* const oldCount = this.props.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients); */
  };

  removeIngredientHandler = type => {
    /* const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.props.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients); */
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {


    /*  this.props.history.push({
      pathname: '/checkout',
      state : { currentIngredients : this.state.ingredients}
     }); */

    const queryParams = [];
    for (let item in this.props.ingredients) {
      console.log(item + ' --' + encodeURIComponent(item) + '--' + encodeURIComponent(this.props.ingredients[item]));
      queryParams.push(encodeURIComponent(item) + '=' + encodeURIComponent(this.props.ingredients[item]));
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });


    // alert('You continue!');
    /*    this.setState({ loading: true });
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
           this.setState({ loading: false, purchasing: false });
         })
         .catch(error => {
           this.setState({ loading: false, purchasing: false });
         }); */
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner></Spinner>;



    let burger = this.state.error ? <p> Broken</p> : <Spinner></Spinner>;
    console.log(this.props)
    if (this.props.ingredients) {
      burger = (
        <Auxi>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
             purchasable={this.updatePurchaseState()} 
       
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
          />
        </Auxi>
      );
      if (!this.state.loading)
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        );


    }

    // {salad: true, meat: false, ...}
    return (
      <Auxi>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}

const mapStateToProps = state => {

  return {
    ingredients: state.personReducer.ingredients, //state.ResultReducer.results
    totalPrice: state.personReducer.totalPrice
  };

};

const mapDispatchToProps = (dispatch) => {

  return {
    onAddIngredient: (itemValue) => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, payload: itemValue });      
    },

    onRemoveIngredient: (itemValue) => {
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: itemValue });    
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
