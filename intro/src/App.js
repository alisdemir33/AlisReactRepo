import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";

export default class App extends Component {
  state = {
    currentCategory: { id: 0, categoryName: "No Selection" },
    products: [],
    cart:[]
  };
  componentDidMount = () => {
    this.getProducts();
  }

  addToCart = (product) =>{
    let newCart= this.state.cart;
    var addedItem=newCart.find( cart => cart.product.id === product.id);
    if(addedItem){
      addedItem.quantity+=1;
    }else{
      newCart.push({product:product,quantity:1});  
    }    
    this.setState({cart:newCart});
  }


  changeCategory = category => {
   console.log(category);
    this.setState({ currentCategory: category });
    this.getProducts(category.id)
  };

  getProducts = (categoryId) => {
    let url="http://localhost:3000/products";
    if(categoryId){
      url=url+"?categoryId="+categoryId;
    }
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }))
      .catch(error => console.log(error));
  };

  render() {
    let productInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };

    return (
      <div>
        <Container>
         
            <Navi cart={this.state.cart}></Navi>
         
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
