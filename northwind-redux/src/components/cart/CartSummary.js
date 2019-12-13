import React, { Component } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";

class CartSummary extends Component {
  
  removeFromCart = (product) =>{
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " sepetten silindi")
  }
  
  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(cartItem => (
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger" onClick={()=> this.removeFromCart(cartItem.product)} >-</Badge>
              {cartItem.product.productName}
          <Badge color="success" >{cartItem.quantity}</Badge>
              </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>Sepete git</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
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
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
