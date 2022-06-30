import React from "react";
import { Spinner } from "reactstrap";

function FullWindowSpinner(props){

    return(
        <>
        {props.display?(
            <div className="fullWindow-Spinner">
            <div>
              <Spinner color="white"></Spinner>
            </div>
            <div style={{ fontSize: "16px", marginTop: "15px" }}>
              {props.text}
            </div>
          </div>
        ):null}
        
        </>
    );
}

export default FullWindowSpinner;