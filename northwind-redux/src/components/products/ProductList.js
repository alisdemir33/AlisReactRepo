import React, { Component } from "react";
import { connect } from "react-redux";
import { Table,Badge,Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as  cartActions  from "../../redux/actions/cartActions";
import {Link} from "react-router-dom";
const alertfy = require("alertifyjs");

class ProductList extends Component {
  componentDidMount() {   
    this.props.actions.getProducts(this.props.currentCategory.categoryId);   
  }

  addToCart = (product) =>{
    this.props.actions.addToCart(product);
      alertfy.success(product.productName+'Added!');
  }

  render() {
    return (
      <div>
        <Badge color="warning">Product</Badge>
        <h3>
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>{" "}
        </h3>
        {
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Quantity Per Unit</th>
                <th>Units In Stock</th>
                <th>Add</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.products.map(product => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>
                    <Link to={"/saveproduct/" + product.id}>
                      {product.productName}
                    </Link>
                  </td>
                  <td>{product.unitPrice}</td>
                  <td>@{product.quantityPerUnit}</td>
                  <td>{product.unitsInStock}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => this.addToCart(product)}
                    >
                      ekle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators( productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
