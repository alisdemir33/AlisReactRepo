import React, { Component } from "react";
import { connect } from "react-redux";
import { Table,Badge,Button } from "reactstrap";
import { bindActionCreators } from "redux";
import { getProducts } from "../../redux/actions/productActions";
import {Link} from "react-router-dom"

class ProductList extends Component {
  componentDidMount() {
    alert(this.props.currentCategory.categoryId);
    this.props.actions.getProducts(this.props.currentCategory.categoryId);
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
      getProducts: bindActionCreators(getProducts, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
