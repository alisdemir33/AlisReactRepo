import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData: orderData,
    },
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload: error,
  };
};

export const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_STARTED,
  };
};

export const purchaseOrder = (order,token) => {
  return (dispatch) => {
    dispatch(purchaseOrderStart());

    axios
      .post('/orders.json?auth='+token, order)
      .then((response) => {
        /* this.setState({ loading: false }, () => {
            this.props.history.push("/");
          }); */
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, order));
        this.props.history.push("/");
       // alert("Order is accepted!");
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
        // this.setState({ loading: false });
        //alert("Order is NOT accepted!");
      });
  };
};

export const pruchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrders = (token,userId) => {
    console.log('before dispatchh fetch orders')
    return (dispatch) => {
    console.log('before dispatch fetch orders')
    dispatch(fetchOrdersStart())
   
    const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';

    const  jwtConfig = {
      headers: {
         Authorization: "Bearer " + token
      }
   }
   
    axios
    //.get('/orders.json'+queryParams)
    .get('/Sample/GetOrders',jwtConfig)
    .then((response) => {
      console.log('--->'+response);
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
     // this.setState({ orders: fetchedOrders, loading: false });
    })
    .catch((error) => {
      console.log(error)
      //this.setState({ error: true, loading: false });
        dispatch(fetchOrdersFailed(error))
       // throw error
    });
}
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_STARTED
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: orders
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: error
  };
};
