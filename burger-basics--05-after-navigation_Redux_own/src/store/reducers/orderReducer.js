import * as actionTypes from '../actions/actionTypes'

const initialState = {    
    orders:[],
    loading:false,
    error:null
};

const orderReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_BURGER_STARTED:

        return{
            ...state,
            loading:true
        }


        case actionTypes.PURCHASE_BURGER_SUCCESS:

            return {
                ...state,
                loading:false,
                orders: state.orders.concat(...action.payload)
            }
       
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
       

        default:
            return state;
    }

}

export default orderReducer;