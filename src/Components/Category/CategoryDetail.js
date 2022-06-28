import React, { Component } from "react";
import { fileUrl } from "../../Utils/Constant";

function CategoryDetail(props) {
 
    return (
      <>
      {props?.category?.media?.length>0?(
        <img className="img-fluid image" src={fileUrl+'/'+props.category.media[0].id+'/'+props.category.media[0].file_name}/>
      ):null}
        <p>{props.category.description}</p>
      </>
    );
}
export default CategoryDetail;
