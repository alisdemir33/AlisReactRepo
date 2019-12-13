import * as actiontypes from "./actionTypes";


export function addToCart(cartItem) {
  return { type: actiontypes.ADD_TO_CART, payload: cartItem };
}

export function removeFromCart(product) {
  return { type: actiontypes.REMOVE_FROM_CART, payload: product };
}
