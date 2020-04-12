import * as actionTypes from './actions'

const initialState = {
    ingredients: {
        bacon:1,
        cheese:1,
        meat:1,
        salad:1
    },

    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

const reducer = (state = initialState, action) => {

    let oldCount = state.ingredients[action.payload];
    
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
          
           let updatedCount1 = oldCount + 1;
           const updatedIngredients = {
            ...state.ingredients
          };
            updatedIngredients[action.payload] = updatedCount1;
            const priceAddition = INGREDIENT_PRICES[action.payload];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition; 
            
            console.log('--'+updatedIngredients['salad']+'np'+newPrice)
        
            return {
                ...state,
                ingredients:updatedIngredients,
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
            ingredients:updatedIngredients1,
            totalPrice: newPrice1          
            }

        default:
            return state;

    }
}

export default reducer;
