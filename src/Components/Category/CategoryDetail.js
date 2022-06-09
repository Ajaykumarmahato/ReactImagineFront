import React, { Component } from "react";

function CategoryDetail(props) {
 
    return (
      <>
        <p>{props.category.description}</p>
      </>
    );
}
export default CategoryDetail;
