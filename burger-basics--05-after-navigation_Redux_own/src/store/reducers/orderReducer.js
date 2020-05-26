import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients,
    orderDetail
}

const orderReducer = (state = initialState, action){

    switch (action.type) {

        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                state
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:

            return {
                state
            }

        default:
            return state;
    }

}