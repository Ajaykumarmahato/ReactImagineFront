import React, { Component } from "react";

class CategoryDetail extends Component {
  state = {};
  render() {
    return (
      <>
        <p>{this.props.category.description}</p>
      </>
    );
  }
}
export default CategoryDetail;
