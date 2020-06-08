import * as actionTypes from "../actions/actionTypes";
import {updateObject } from '../util'

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_STARTED: return purchaseBurgerStarted(state, action);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
    case actionTypes.FETCH_ORDERS_STARTED: return fetchOrdersStarted(state, action)
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    default: return state;
  }
};


const purchaseBurgerStarted = (state, action) => {
  return updateObject(state, { loading: true });
}
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
}
const purchaseBurgerSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
     orders: state.orders.concat(...action.payload)
  });
}
const purchaseBurgerFailed = (state, action) => {
  return updateObject(state,
    { loading: false, 
      error: action.payload });
}
const fetchOrdersStarted = (state, action) => {
  return updateObject(state, {
    loading: true,
    error:null
  });
}
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload,
    loading: false
  });
}
const fetchOrdersFailed = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false
  });
}

export default orderReducer;
