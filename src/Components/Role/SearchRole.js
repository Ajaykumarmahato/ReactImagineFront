import React, { useState } from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
  } from "reactstrap";

function SearchRole(props){



    
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
                 placeholder="Role Name"
               />
             </Col>
           </FormGroup>
           <FormGroup>
             <Col className="d-flex justify-content-end">
               <Button onClick={(e)=>props.getRoles()} className="btn btn-success">Search</Button>
             </Col>
           </FormGroup>
         </Form>
        </>
    );
}

export default SearchRole;