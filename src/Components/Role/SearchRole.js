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

    const [name,setName]=useState("");


    
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
                 name="name"
                 id="exampleEmail"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                 placeholder="Role Name"
               />
             </Col>
           </FormGroup>
           <FormGroup>
             <Col className="d-flex justify-content-end">
               <Button onClick={(e)=>props.searchRole(name)} className="btn btn-success">Search</Button>
             </Col>
           </FormGroup>
         </Form>
        </>
    );
}

export default SearchRole;