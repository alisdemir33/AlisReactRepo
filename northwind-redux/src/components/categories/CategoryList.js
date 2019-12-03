import React, { Component } from 'react'
import { connect } from 'http2'

export default class CategoryList extends Component {
  render() {
    return (
      <div>
        <h3> categories </h3>
        <h3>this.props.currentCategory</h3>
      </div>
    )

  }



}

function mapStateToProps(state){
  return {
    currentCategory: state.changeCategoryReducer
  }
}
export default connect(mapStateToProps)(CategoryList);


