import * as actionTypes from "../actions/actionTypes";
import {c, updateObject } from '../util'

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_STARTED: return updateObject(state,{loading: true});
    case actionTypes.PURCHASE_INIT: return updateObject(state,{ purchased: false});
    case actionTypes.PURCHASE_BURGER_SUCCESS: return updateObject(state,{ loading: false,orders: state.orders.concat(...action.payload)});
    case actionTypes.PURCHASE_BURGER_FAILED: return updateObject(state,{loading: false,error: action.payload});
    case actionTypes.FETCH_ORDERS_STARTED:
      return updateObject(state,{
          loading:true
      });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state,{
          orders:action.payload,
          loading:false
      });

    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state,{
          error:action.payload,
          loading:false
      });

    default:
      return state;
  }
};

export default orderReducer;
