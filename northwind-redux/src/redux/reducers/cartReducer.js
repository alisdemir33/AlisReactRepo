import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        c => c.productId === action.payload.product.id
      );

      if (addedItem) {
        //sepette var ise bulup, quantity'si bir artırılıyor..
        var newState = this.state.map(cartItem => {
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
        return [...state,{...action.payload}];
      }

    default:
      return state;
  }
}
