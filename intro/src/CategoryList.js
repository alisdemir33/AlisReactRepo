import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { createSecureContext } from "tls";

export default class CategoryList extends Component {
  state = {
    categories: [],   
    currentCategory: { id: 0, categoryName: "Not Selected" }
  };

  componentDidMount (){
    this.getCategories();
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>        
          {this.state.categories.map(category => (
            <ListGroupItem
              onClick={() => this.props.changeCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h3>{this.props.currentCategory.categoryName}</h3> */}
      </div>
    );
  }
}
