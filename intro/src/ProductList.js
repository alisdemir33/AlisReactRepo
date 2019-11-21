import React, { Component } from "react";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h2>Product List</h2>
        <h2>Current Cat ID : {this.props.currentCategory.categoryId}</h2>
        <h2>Current Cat Name: {this.props.currentCategory.categoryName}</h2>
      </div>
    );
  }
}
