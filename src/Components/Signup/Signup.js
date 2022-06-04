import React,{Component} from "react";
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
import Swal from "sweetalert2";
import { axiosPost } from "../../Utils/AxiosApi";
import { headers, URL } from "../../Utils/Constant";

export default class signup extends Component{
    state={
        name:"",
        email:"",
        contactNumber:"",
        password:"",
        file:"",
        error:false
    }

    handelChange=(e)=>{
        var target=e.target;
        var name=target.name;
        var value=target.value;
        this.setState({[name]:value})
    }

    handleFileChnage=(e)=>{
        var target = e.target;
        var name=target.name;
        this.setState({[name]:target.files[0]})
    }

    hnadleSignup=(e)=>{
        e.preventDefault();

        let formData=new FormData();
        let user={
            name:this.state.name,
            email:this.state.email,
            contactNumber:this.state.contactNumber,
            password:this.state.password
        }
        if(user.name==""||user.email==""||user.password==""){
                this.setState({
                    error:true
                    })
        swal("Error","Fill All the fields","error");
        return;
        }
        formData.append('user',JSON.stringify(user));
        if(this.state.file!=""){
            formData.append('file',this.state.file);
        }

        axiosPost(URL.registerUser,formData,(response)=>{
           
            if(response.data.success){
                this.setState({
                    name:"",
                    email:"",
                    contactNumber:"",
                    password:"",
                    file:""
                }) 
                swal("Success",response.data.message,"success");   
            }
        },(err)=>{
             swal("Error",err.response.data.message,"error");  
        });
    }

    render(){
        return(
            <div className="landing w-100">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 col-sm-12 col-md-12 w-50">
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
              onChange={this.handelChange}
              value={this.state.name}
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
               onChange={this.handelChange}
               value={this.state.email}
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
               onChange={this.handelChange}
               value={this.state.contactNumber}
            />
          </Col>
        </FormGroup>
       
        
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="file"  id="exampleFile"  onChange={this.handleFileChnage} />
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
               onChange={this.handelChange}
               value={this.state.password}
            />
          </Col>
        </FormGroup>
         <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button onClick={this.hnadleSignup}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
      </div>
      </div>
      </div>
        )
    }
}