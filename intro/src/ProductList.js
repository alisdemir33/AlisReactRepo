import React, { Component } from "react";
import { Table,Button } from "reactstrap";

export default class ProductList extends Component { 
  
   /* addToChart = (product) =>{
    alert(product.productName);

   } */

  render() {
    let productList = this.props.products.map((item, key) => (
      <tr key={item.id}>
        <th scope="row">{key + 1}</th>
        <td>{item.id}</td>
        <td>{item.categoryId}</td>
        <td>{item.productName}</td>
        <td>{item.quantityPerUnit}</td>
        <td>{item.unitPrice}</td>
        <td>{item.unitsInStock}</td>
        <td><Button color="info"  onClick={ ()=> this.props.addToCart(item)} >Add</Button></td>
      </tr>
    ));

    return (
      <div>
        <h2>Product List</h2>
        <h2>Current Cat ID : {this.props.currentCategory.id}</h2>
        <h2>Current Cat Name: {this.props.currentCategory.categoryName}</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Category ID</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>{productList}</tbody>
        </Table>
      </div>
    );
  }
}
