import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      debugger;
      var addedItem = state.find(
        c => c.product.id === action.payload.product.id
      );

      if (addedItem) {
        //sepette var ise bulup, quantity'si bir artırılıyor..
        var newState = state.map(cartItem => {
          if (cartItem.product.id === action.payload.product.id) {
            //sepette var ise cartItemın kopyasını alıp bir artırıp KOPYASInı sepete atıyoruz.
            //return Object.assign({}, addedItem, {quantity: addedItem.quantity + 1 });
              return {...addedItem, quantity:addedItem.quantity+1};
          } else {
            return cartItem;
          }
        });
        return newState;
      } else {
        //ilk defa sepete ekleniyor ise
        return [...state,  {...action.payload}];
      }

    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        cartItem => action.payload.id !== cartItem.product.id
      );
      return newState2;

    case actionTypes.REMOVE_ONE_FROM_CART:
       // debugger;
      var itemToRemove = state.find(
        cartItem => cartItem.product.id === action.payload.id
      );     
      
      let newCart = state.filter(item => item.product.id !== itemToRemove.product.id);

      if (itemToRemove.quantity !== 1) {
       let newItem={...itemToRemove, quantity : itemToRemove.quantity -= 1 }
        // itemToRemove.quantity -= 1;
        return [...newCart, newItem].sort(function(a, b){
          var x = a.product.productName.toLowerCase();
          var y = b.product.productName.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
      }else{      
        return newCart;
      }    

    default:
      return state;
  }
}
