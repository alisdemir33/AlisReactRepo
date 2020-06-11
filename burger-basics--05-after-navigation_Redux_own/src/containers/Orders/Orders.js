import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/index";

class Orders extends Component {
/*   state = {
    orders: [],
    loading: true
  };
 */
  componentDidMount() {
   console.log('ORders will be fetched..')
    this.props.onFetchOrders(this.props.token);

    console.log('Orders fetched..')
    /* axios
      .get("/orders.json")
      .then(response => {
        console.log(response);

        const fetchedOrders = [];
        for (let key in response.data){
            fetchedOrders.push(
                {
                    ...response.data[key],
                    id:key
                });

        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });*/

  }

  render() {
 
    let ordersPlaceHolder =<Spinner/>
    if(!this.props.loading){
      ordersPlaceHolder = this.props.orders.map( (order) =>{
            return <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            />
        } ) 
    }
    
    return (
    <div>
        {
        ordersPlaceHolder
        }
        </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    orders : state.orderReducer.orders,
    loading : state.orderReducer.loading,
    error: state.orderReducer.error,
    token:state.authReducer.token

  }
}

const mapDispatchToProps = (dispatch) => {
return{
  onFetchOrders : (token) =>{ 
    dispatch(orderActions.fetchOrders(token));
  }
}
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler( Orders,axios));
