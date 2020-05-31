import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../util'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.9
};

const burgerReducer = (state = initialState, action) => {

    let oldCount ; //= state.ingredients[action.payload];

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
          // ---------------long way ------------------
      /*   oldCount = state.ingredients[action.payload];
            let updatedCount1 = oldCount + 1;
            const updatedIngredients = {
                ...state.ingredients
            };
            updatedIngredients[action.payload] = updatedCount1;
            const priceAddition = INGREDIENT_PRICES[action.payload];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice
            } */
            // ------------max way---------------
        /*     return {
                    ...state,
                    ingredients :{
                        ...state.ingredients,
                        [action.payload]: state.ingredients[action.payload]+1
                    },
                    totalPrice: state.totalPrice+  INGREDIENT_PRICES[action.payload]
            }*/
 
            //----------with update object max way---------------
            const updatedIngredient = { [action.payload]:state.ingredients[action.payload]+1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient );
            const updatedTotalPrice = state.totalPrice+  INGREDIENT_PRICES[action.payload];
            return updateObject(state, {ingredients:updatedIngredients,totalPrice : updatedTotalPrice});           
         

        case actionTypes.REMOVE_INGREDIENT:

          /*   oldCount = state.ingredients[action.payload];
            if (oldCount <= 0) {
                return state;
            }
            const updatedCount = oldCount - 1;
            const updatedIngredients1 = {
                ...state.ingredients
            };

            updatedIngredients1[action.payload] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[action.payload];
            const oldPrice1 = state.totalPrice;
            const newPrice1 = oldPrice1 - priceDeduction;

            return {
                ...state,
                ingredients: updatedIngredients1,
                totalPrice: newPrice1
            } */

            oldCount = state.ingredients[action.payload];
            if (oldCount <= 0) {
                return state;
            }          
          
            const updatedIngredient1 = { [action.payload]:state.ingredients[action.payload]-1}
            const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1 );
         
            const newTotalPrice = state.totalPrice - INGREDIENT_PRICES[action.payload];
            return updateObject(state,{ingredients:updatedIngredients1, totalPrice:newTotalPrice})
          


        case actionTypes.INIT_INGREDIENT:
            //normally total price is fixed but if we have a default burder with some ingredient then initila total price sholud be computed..
            //so we are calculating and due to in firebase all ingrdients are 0 then totalPrice is also 4, money for bread..
           state.totalPrice=4;//cost of the bread...Ekmek
           console.log(action.payload)
                  let sumArr = Object.keys(action.payload)
                .map(igKey => {
                  return  INGREDIENT_PRICES[igKey] * action.payload[igKey];
                })

                console.log(sumArr)
                
                let sum = sumArr.reduce((sum, el) => {
                    return   sum + el;
                }, 0);  

           console.log('sum is'+  sum)
           
           return  updateObject(state,
            { ingredients: action.payload, 
                totalPrice: state.totalPrice+sum,
                error:false});          
          

        case actionTypes.INIT_INGREDIENT_FAILED:

            return updateObject(state,
               { ingredients: null,
                totalPrice: 0,
                error: true});
            

        default:
            return state;

    }
}

export default burgerReducer;
