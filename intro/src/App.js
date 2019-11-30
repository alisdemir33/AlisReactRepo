import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";
const alertfy = require("alertifyjs");

export default class App extends Component {
  state = {
    currentCategory: { id: 0, categoryName: "No Selection" },
    products: [],
    cart: []
  };
  componentDidMount = () => {
    this.getProducts();
    //alertfy.success('Accepted');
  };

  addToCart = product => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(cart => cart.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart },()=> {alertfy.success(product.productName + " Added!");});
    
  };

  removeFromCart = product => {
    let newCart = this.state.cart.filter(
      item => item.product.id !== product.id
    );
    console.log(newCart);
    this.setState({ cart: newCart },() => {alertfy.error(product.productName + " Removed!");});    
  };

  removeOneFromCart = product => {
    let newCart = this.state.cart;
    var selectedItem = newCart.find(cart => cart.product.id === product.id);
   
    newCart = this.state.cart.filter(
      item => item.product.id !== product.id);

    if(selectedItem.quantity!==1){  
      selectedItem.quantity-=1;
      newCart.push(selectedItem);     
    }   

    this.setState({ cart: newCart },()=>{ alertfy.error(product.productName + "(One) Item Removed!");});
   
  };

  changeCategory = category => {
    console.log(category);
    this.setState({ currentCategory: category });
    this.getProducts(category.id);
  };

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
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
          <Navi
            removeFromCart={this.removeFromCart}
            cart={this.state.cart}
          ></Navi>

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={props => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                      removeOneFromCart={this.removeOneFromCart}
                      addToCart={this.addToCart}
                    />
                  )}
                />
                <Route path="/form1" component={FormDemo1}/>
                <Route path="/form2" component={FormDemo2}/>
                <Route component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
