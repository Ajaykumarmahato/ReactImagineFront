import React, { Component } from "react";
import { fileUrl } from "../../Utils/Constant";

function CategoryDetail(props) {
 
    return (
      <>
        {/* <img className="img-fluid image" src={fileUrl+'/'+props.category.media[0].id+'/'+props.category.media[0].file_name}/> */}
        <p>{props.category.description}</p>
      </>
    );
}
export default CategoryDetail;
