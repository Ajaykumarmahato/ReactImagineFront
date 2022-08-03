import React, { useState } from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";

function SearchCategory(props){

    
    return (
        <>
         <Form>
           <FormGroup row>
             <Label for="exampleEmail" sm={2}>
               Name
             </Label>
             <Col sm={10}>
               <Input
                 type="text"
                 name="searchParam"
                 id="exampleEmail"
                 value={props.searchParam}
                 onChange={(e)=>props.setSearchParam(e.target.value)}
                 placeholder="Category Name"
               />
             </Col>
           </FormGroup>
           <FormGroup>
             <Col className="d-flex justify-content-end">
               <Button onClick={(e)=>props.getCategories()} className="btn btn-success">Search</Button>
             </Col>
           </FormGroup>
         </Form>
        </>
    );
}

export default SearchCategory;