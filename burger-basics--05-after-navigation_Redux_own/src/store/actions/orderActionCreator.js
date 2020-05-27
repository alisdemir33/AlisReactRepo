import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
       payload:{
        orderId: id,
        orderData:orderData}
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,  
        payload:error 
    }

}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_STARTED
    }

}


export const purchaseOrder = (order) => {
    
    return (dispatch) =>     
    {
        dispatch(purchaseOrderStart());

        axios
        .post("/orders.json", order)
        .then(response => {
        /* this.setState({ loading: false }, () => {
            this.props.history.push("/");
          }); */
          console.log(response.data)
          dispatch(purchaseBurgerSuccess(response.data.name, order));  
          alert("Order is accepted!");
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
            // this.setState({ loading: false });
         //alert("Order is NOT accepted!");
        });     
    }
}
