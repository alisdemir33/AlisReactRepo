import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const sendOrderAux = (valueToStore) => {
    return {
        type: actionTypes.SUBMIT_ORDER,
        payload: valueToStore
    }
}

export const sendOrder = (order) => {
    
    return (dispatch) =>     
    {
        axios
        .post("/orders.json", order)
        .then(response => {
      /*     this.setState({ loading: false }, () => {
            this.props.history.push("/");
          }); */
          dispatch(sendOrderAux(response.data));  
          alert("Order is accepted!");
        })
        .catch(error => {
         // this.setState({ loading: false });
         alert("Order is NOT accepted!");
        });
        
        
        setTimeout(() => {
           // console.log('State before dispatch:'+ getState().ctrReducer.counter)
            dispatch(saveValue(valueToStore));
        }, 2000);

    }
}
