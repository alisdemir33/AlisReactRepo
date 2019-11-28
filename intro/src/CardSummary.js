import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from "reactstrap";

export default class CardSummary extends Component {
  render() {
   let total=0;
         this.props.cart.map(item => (
            total+=  item.quantity));
    
    return (
      <div>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>         
           Total Cart Item(s) <Badge color="info">{total}</Badge>
          </DropdownToggle>
          <DropdownMenu right>           
              {
                this.props.cart.map(item => ( 
               <DropdownItem key={item.product.id}><Badge color="danger" onClick={()=>this.props.removeFromCart}>x</Badge>{item.product.productName} 
               <Badge color="success"> {item.quantity} </Badge></DropdownItem>              
            ))}
           
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}
