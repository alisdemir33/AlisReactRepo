import * as actiontypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCategoryListReducer(
  state = initialState.categoryList,
  action
) {
  switch (action.type) {
    case actiontypes.GET_CATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
