import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: null,
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        console.log(response);
        this.setState({ orders: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    let toRender = <Spinner></Spinner>;
    let orders;
    
    if (this.state.orders != null) {
        orders = Object.keys(this.state.orders).map((item, i) => (            
        <Order key={this.state.orders[item].key} 
        ingredients={this.state.orders[item].ingredients}  
         price={this.state.orders[item].price}/>
      ));
    }

    /*  if(this.state.orders != null){       
        orderList = this.state.orders
        .map(order => {
          return <Order key={order.price} ingredients={order.ingredients} price={order.price}></Order>
        });  
    }
        
        let toRender=orderList;

        if(this.state.loading)
        toRender=<Spinner></Spinner>
        else
        toRender=orderList;
 */
    return <div>{orders}</div>;
  }
}
export default Orders;
