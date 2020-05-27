import * as actionTypes from '../actions/actionTypes'

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

    let oldCount ;//= state.ingredients[action.payload];

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            oldCount = state.ingredients[action.payload];
            let updatedCount1 = oldCount + 1;
            const updatedIngredients = {
                ...state.ingredients
            };
            updatedIngredients[action.payload] = updatedCount1;
            const priceAddition = INGREDIENT_PRICES[action.payload];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            console.log('--' + updatedIngredients['salad'] + 'np' + newPrice)

            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice
            }

        case actionTypes.REMOVE_INGREDIENT:

            oldCount = state.ingredients[action.payload];
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
            }

        case actionTypes.INIT_INGREDIENT:
           // let price = INGREDIENT_PRICES['bacon'] + INGREDIENT_PRICES['meat'];
           console.log('ing is'+  action.payload)
                 const sum = Object.keys(action.payload)
                .map(igKey => {
                  return  INGREDIENT_PRICES[igKey];
                })
                .reduce((sum, el) => {
                  return sum + el;
                }, 0);  

           console.log('sum is'+  sum)
            return {
                ...state,
                ingredients: action.payload,
                totalPrice: state.totalPrice+sum
            }

        case actionTypes.INIT_INGREDIENT_FAILED:

            return {
                ...state,
                ingredients: null,
                totalPrice: 0,
                error: true
            }

        default:
            return state;

    }
}

export default burgerReducer;
