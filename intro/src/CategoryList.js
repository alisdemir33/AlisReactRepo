import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { createSecureContext } from "tls";

export default class CategoryList extends Component {
  state = {
    categories: [
      { categoryId: 1, categoryName: "Beverages" },
      { categoryId: 2, categoryName: "Condiments" },
      { categoryId: 3, categoryName: "Steaks" }
    ],
    currentCategory: { categoryId: 0, categoryName: "Not Selected" }
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          <ListGroupItem>ali</ListGroupItem>
          {this.state.categories.map(category => (
            <ListGroupItem
              onClick={() => this.props.changeCategory(category)}
              key={category.categoryId}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h3>{this.props.currentCategory.categoryName}</h3>
      </div>
    );
  }
}
