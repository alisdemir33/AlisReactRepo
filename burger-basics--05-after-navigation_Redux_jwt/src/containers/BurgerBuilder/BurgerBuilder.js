import React, { Component } from "react";

import Auxi from "../../hoc/AuxFolder/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
//import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/index'

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
   // error: false--->redux state e tasındı.. çunku fetch ingredirent tasındı..
  };

   componentDidMount() {
    this.props.onInitIngredient(this.props.token);
    /*  console.log(this.props)
     axios
       .get("/ingredients.json")
       .then(response => {
         console.log(response);
         this.setState({ ingredients: response.data });
       })
       .catch(error => {
         this.setState({ error: true });
       }); */
   }
 
  updatePurchaseState() {
  
    const sum = Object.keys(this.props.ingredients)
      .map(igKey => {
        return this.props.ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
   
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
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }
      else{
        this.props.onSetAuthRedirectPath('/checkout')
        this.props.history.push('/auth')
      }

  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {


    /*  this.props.history.push({
      pathname: '/checkout',
      state : { currentIngredients : this.state.ingredients}
     }); */

  /*   const queryParams = [];
    for (let item in this.props.ingredients) {
      console.log(item + ' --' + encodeURIComponent(item) + '--' + encodeURIComponent(this.props.ingredients[item]));
      queryParams.push(encodeURIComponent(item) + '=' + encodeURIComponent(this.props.ingredients[item]));
    }

    queryParams.push('price=' + this.state.totalPrice);

    const queryString = queryParams.join('&'); */
/* 
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    }); */
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');

    
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner></Spinner>;

    
    console.log(this.props.error);

    let burger = this.props.error ? <p> Broken</p> : <Spinner></Spinner>;   

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
            isAuth={this.props.isAuthenticated}          
          />
        </Auxi>
      );
      if (!this.state.loading){
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        );}
        else{
          if(this.props.error){
            orderSummary = <p> Broken</p>
          }
        }
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
    ingredients: state.burgerReducer.ingredients, //state.ResultReducer.results
    totalPrice: state.burgerReducer.totalPrice,
    error:state.burgerReducer.error ,
    isAuthenticated:state.authReducer.token !== null,
    token:state.authReducer.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return {
    onAddIngredient: (itemValue) => {
      dispatch(burgerBuilderActions.addIngredient(itemValue));      
    },

    onRemoveIngredient: (itemValue) => {
      dispatch( burgerBuilderActions.removeIngredient(itemValue));    
    },

    onInitIngredient : (token) => {
      dispatch (burgerBuilderActions.initIngredientsFromServer(token));
    },

    onPurchaseInit: () => {
      dispatch(burgerBuilderActions.pruchaseInit())
    },

    onSetAuthRedirectPath: (path) =>{
      dispatch (burgerBuilderActions.setAuthRedirectPath(path))
    } 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
