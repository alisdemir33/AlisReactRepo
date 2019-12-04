import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getCategories} from '../../redux/actions/categoryActions'

 class CategoryList extends Component {
  render() {
    return (
      <div>
        <h3> categories </h3>
        <h3>Current : {this.props.currentCategory.categoryName}</h3>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentCategory: state.changeCategoryReducer
  }
}


function mapDispatchToProps(dispatch){
  return {actions:
    {getCategories: bindActionCreators(getCategories,dispatch)}}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);


