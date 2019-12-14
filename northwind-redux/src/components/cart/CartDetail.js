import React, { Component } from 'react'
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

const alertfy = require("alertifyjs");

class CartDetail extends Component {
  renderCartList() {
    return (
      <Table stripped>
        <thead>
          <tr>
            <th>#</th>        
            <th>Product Name</th>          
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>X</th>
            <th>-</th>
            <th>+</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map(cartItem => (
            <tr key={cartItem.product.id}>
              <th scope="row">{cartItem.product.id}</th>            
              <td>{cartItem.product.productName}</td>             
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.actions.removeFromCart(cartItem.product)}
                >
                  x
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.actions.removeOneFromCart(cartItem.product)}
                >
                  -
                </Button>
              </td>
              <td>
                <Button
                  color="success"
                  onClick={() => this.props.actions.addToCart(cartItem)}
                >
                  +
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return <div>{this.renderCartList()}</div>;
  }
}


function mapStateToProps(state) {
  return {
    cart: state.cartReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
      removeOneFromCart: bindActionCreators(cartActions.removeOneFromCart, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);