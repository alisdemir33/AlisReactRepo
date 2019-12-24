import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { validate } from "@babel/types";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({
    productName: "",
    categoryId: "",
    unitsInStock: "",
    unitPrice: ""
  });

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }

    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    debugger;
    const { name, value } = event.target;

    if (validateOnChange(name, value)) {
      setProduct(previousProduct => ({
        ...previousProduct,
        [name]: name === "categoryId" ? parseInt(value, 10) : value
      }));
    } else {
      setProduct(previousProduct => ({
        ...previousProduct
      }));
    }
  }

  function validateOnChange(name, value) {
    var regexNumber = /^\d*$/;
    var result = true;
    //console.log(name)
    if (
      name === "unitsInStock" ||
      name === "quantityPerUnit" ||
      name === "unitPrice"
    ) {
      result = regexNumber.test(value);
    }
    return result;
  }

  function isValidOnSave() {
  ;debugger
    let result=true;
    let newErrors = { ...errors };
    if (!product.productName) {
      newErrors.productName = "Product Name Boş olamaz!";
      result=false;
    }
    if (!product.unitPrice) {
      newErrors.unitPrice = "unitPrice  Boş olamaz!";
      result=false;
    }
    if (!product.unitsInStock) {
      newErrors.unitsInStock = "unitsInStock  Boş olamaz!";
      result=false;
    }
    if (!product.quantityPerUnit) {
      newErrors.quantityPerUnit = "quantityPerUnit  Boş olamaz!";
      result=false;
    }

if(!result){
    setErrors(previousErrors => (
       newErrors
    )) 
    return false;   
  }else
  return true;

    /* if (value === "") {
      setErrors(previousErrors => ({
        ...previousErrors,
        [name]: name+ " boş olamaz!"
      }   
      ));
    } else {
      setErrors(previousErrors => ({
        ...previousErrors,
        [name]: ""
      }));
    } */
  }

  function handleSave(event) {
    event.preventDefault();
    if (isValidOnSave()) {
      saveProduct(product).then(() => {
        history.push("/");
      });
    } else {
      console.log(errors);
    }
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find(product => product.id == productId) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;

  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  console.log("-------" + product);
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
