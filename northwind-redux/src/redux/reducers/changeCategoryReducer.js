import * as actiontypes from '../actions/actionTypes'
import initialState from './initialState';

export default function changeCategoryReducer(state=initialState.currentCategory,action){
    switch (action.type) {
        case actiontypes.CHANGE_CATEGORY:
        return action.payload           
           
    
        default:
           return state;
    }
}