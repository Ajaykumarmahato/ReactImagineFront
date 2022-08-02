import React from "react";
import {
  Button
} from "reactstrap";
function Pagination(props){

    return (
        <>
        <div className="paginationContainer d-flex justify-content-center">
            <Button onClick={props.handlePrevious} className={`${props.pageNumber===1?'disabled btn btn-primary':'btn btn-primary'}`}>Prev</Button>
            <Button onClick={props.handleNext} className={`${props.pageNumber===props.totalPage?'disabled btn btn-primary':'btn btn-primary'}`}>Next</Button>
            
            <p>Page {props.pageNumber} of {props.totalPage}</p>
        </div>
        </>
    );


}


export default Pagination;