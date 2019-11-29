import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class CartList extends Component {
  renderCartList() {
    return (
      <Table stripped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category ID</th>
            <th>Product Name</th>
            <th>Unit In Stock</th>
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
              <td>{cartItem.product.id}</td>
              <td>{cartItem.product.categoryid}</td>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeFromCart(cartItem.product)}
                >
                  x
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.props.removeOneFromCart(cartItem.product)}
                >
                  -
                </Button>
              </td>
              <td>
                <Button
                  color="success"
                  onClick={() => this.props.addToCart(cartItem.product)}
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
