import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCategories,
  changeCategory
} from "../../redux/actions/categoryActions";
import { getProducts } from "../../redux/actions/productActions";

import { ListGroup, ListGroupItem,Badge } from "reactstrap";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = categoryItem => {
    this.props.actions.changeCategory(categoryItem);
    this.props.actions.getProducts(categoryItem.id);
  };

  render() {
    return (
      <div>
        <h3> <Badge color="warning">Categories</Badge></h3>

        <ListGroup>
          {this.props.categories.map(categoryItem => (
            <ListGroupItem
              key={categoryItem.id}
              active={
                categoryItem.id === this.props.currentCategory.id ? true : false
              }
              onClick={() => this.selectCategory(categoryItem)}
            >
              {categoryItem.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>     
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.changeCategoryListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(getCategories, dispatch),
      changeCategory: bindActionCreators(changeCategory, dispatch),
      getProducts: bindActionCreators(getProducts, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
