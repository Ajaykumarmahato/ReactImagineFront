import React from "react";
import {
  Button
} from "reactstrap";
function Pagination(props){


    return (
        <>
        <div className="paginationContainer d-flex justify-content-center">
            <Button onClick={props.handlePrevious} className="btn btn-primary">Prev</Button>
            <Button onClick={props.handleNext} className="btn btn-primary">Next</Button>
            <p>{props.currentPage} of {props.totalPage}</p>
        </div>
        </>
    );


}


export default Pagination;