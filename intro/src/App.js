import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";

export default class App extends Component {
  
    state = { 
        currentCategory: {categoryId:0 , categoryName : "No Selection"}
        }

  changeCategory = category => {
    this.setState({ currentCategory: category });
  };

  render() {
   let productInfo = { title: "ProductList" };
 let  categoryInfo = { title: "CategoryList" };

    return (
      <div>
        <Container>
          <Row>
            <Navi></Navi>
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} />
            </Col>
            <Col xs="9">
              <ProductList currentCategory={this.state.currentCategory} info={productInfo} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
