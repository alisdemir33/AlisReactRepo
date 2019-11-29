import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

export default class CardSummary extends Component {
  renderSummary() {
    let total = 0;
    this.props.cart.map(item => (total += item.quantity));

    let emptyCart = (
      <NavItem color="info">
        <NavLink>Hey, Your Cart is Empty!!</NavLink>
      </NavItem>
    );

    if (total > 0) {
      return (
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Total Cart Item(s) <Badge color="info">{total}</Badge>
          </DropdownToggle>
          <DropdownMenu right>
            {this.props.cart.map(item => (
              <DropdownItem key={item.product.id}>
                <Badge
                  onClick={() => this.props.removeFromCart(item.product)}
                  color="danger"
                >
                  x
                </Badge>
                {item.product.productName}
                <Badge color="success"> {item.quantity} </Badge>
              </DropdownItem>
            ))}
            <DropdownItem divider />
            <DropdownItem>
              <Link to="cart">Cart List</Link>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else {
      return emptyCart;
    }
  }

  render() {
    return <div>{this.renderSummary()}</div>;
  }
}
