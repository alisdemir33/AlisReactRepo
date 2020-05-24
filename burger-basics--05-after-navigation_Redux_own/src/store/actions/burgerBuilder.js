import * as actionTypes from './actionTypes';

export const addIngredient = (itemValue) => {

    return {
        type:actionTypes.ADD_INGREDIENT,
        payload: itemValue
    }

}

export const removeIngredient = (itemValue) => {

    return {
        type:actionTypes.ADD_INGREDIENT,
        payload: itemValue
    }

}