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
import swal from "sweetalert";
import { axiosPost } from "../../Utils/AxiosApi";
import { headers, URL } from "../../Utils/Constant";

function Signup(){
  
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [contactNumber,setContactNumber]=useState('');
    const [password,setPassword]=useState('');
    const [file,setFile]=useState('');
    const [error,setError]=useState(false);

    function handleSignup(e){
        e.preventDefault();
        setError(false);

        let formData=new FormData();
        let user={
            name:name,
            email:email,
            contactNumber:contactNumber,
            password:password
        }
        if(user.name==""||user.email==""||user.password==""){
          setError(true);
          swal("Error","Fill All the fields","error");
          return;
        }
        formData.append('user',JSON.stringify(user));
        if(file!=""){
            formData.append('file',file);
        }

        axiosPost(URL.registerUser,formData,(response)=>{
           
            if(response.data.success){
                setName('');
                setEmail('');
                setContactNumber('');
                setPassword('');
                setFile('');
                swal("Success",response.data.message,"success");   
            }
        },(err)=>{
             swal("Error",err.response.data.message,"error");  
        });
    }

        return(
            <div className="landing w-100">
        <div className="container">
         <div className="signup_form">
           <div className="card">
                <div className="card-header">Signup</div>
                <div className="card-body">
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
              placeholder="Name"
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="example" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="email"
              id="example"
              placeholder="Email Address"
               onChange={(e)=>setEmail(e.target.value)}
               value={email}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleContact" sm={2}>
            Contact Number
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="contactNumber"
              id="exampleContact"
              placeholder="Contact Number"
               onChange={(e)=>setContactNumber(e.target.value)}
               value={contactNumber}
            />
          </Col>
        </FormGroup>
       
        
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="file"  id="exampleFile"  onChange={(e)=>setFile(e.target.files[0])} />
          </Col>
        </FormGroup>
       
         <FormGroup row>
          <Label for="examplePassword" sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="examplePassword"
               onChange={(e)=>setPassword(e.target.value)}
               value={password}
            />
          </Col>
        </FormGroup>
         <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button  onClick={(e)=>handleSignup(e)}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
        )
}

export default Signup;