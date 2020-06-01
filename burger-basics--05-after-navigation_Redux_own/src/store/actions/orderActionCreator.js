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

export const purchaseOrder = (order) => {
  return (dispatch) => {
    dispatch(purchaseOrderStart());

    axios
      .post("/orders.json", order)
      .then((response) => {
        /* this.setState({ loading: false }, () => {
            this.props.history.push("/");
          }); */
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, order));
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

export const fetchOrders = () => {
    console.log('before dispatchh')
    return (dispatch) => {
    console.log('before dispatch')
    dispatch(fetchOrdersStart())
   
    axios
    .get("/orders.json")
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
      //this.setState({ error: true, loading: false });
        dispatch(fetchOrdersFailed(error))
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
    payload: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: error,
  };
};
