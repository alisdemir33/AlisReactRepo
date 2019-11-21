import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";

function App() {

    let productInfo={title:"ProductList"}
    let categoryInfo={title:"CategoryList"}
  return (
    <div>
      <Container>
        <Row>
          <Navi></Navi>
        </Row>
        <Row>
          <Col xs="3">
            <CategoryList info={productInfo} />
          </Col>
          <Col xs="9">
            <ProductList info={categoryInfo}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App;