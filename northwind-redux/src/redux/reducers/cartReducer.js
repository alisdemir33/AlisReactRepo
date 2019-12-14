import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      debugger;
      var addedItem = state.find(c => c.product.id === action.payload.product.id
      );

      if (addedItem) {
        //sepette var ise bulup, quantity'si bir artırılıyor..
        var newState = state.map(cartItem => {
          if (cartItem.product.id === action.payload.product.id) {
            //sepette var ise cartItemın kopyasını alıp bir artırıp KOPYASInı sepete atıyoruz.
            return Object.assign({}, addedItem, {
              quantity: addedItem.quantity + 1
            });

            //  return {...addedItem, quantity:addedItem.quantity+1}}
          } else {
            return cartItem;
          }
        });
        return newState;
      } else {
        //ilk defa sepete ekleniyor ise
        return [...state, { ...action.payload }];
      }

      case actionTypes.REMOVE_FROM_CART:
        const newState2=state.filter( cartItem => action.payload.id !== cartItem.product.id);
        return newState2;

      case actionTypes.REMOVE_ONE_FROM_CART:

        //  const newStateForRemoveOne=state.filter( cartItem => action.payload.id !== cartItem.product.id);
          
          let newCart = state;
          var selectedItem = newCart.find(cart => cart.product.id === action.payload.id);
         
          newCart = state.cart.filter(
            item => item.product.id !== action.payload.id);
      
          if(selectedItem.quantity!==1){  
            selectedItem.quantity-=1;
            return [...state, { ...action.payload }];    
          }     

          return newCart;          
      

    default:
      return state;
  }
}
