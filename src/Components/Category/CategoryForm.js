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
import { axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import swal from "sweetalert";
import FullWindowSpinner from '../Spinner/FullWindowSpinner';

function CategoryForm(props) {
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [file,setFile]=useState("");
  const [filePreviewSrc,setFilePreviewSrc]=useState("");
  const [submitSpinner,setSubmitSpinner]=useState(false);


  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
  }

  const insertCategory=(e)=>{
    e.preventDefault();
    setSubmitSpinner(true);
    let formData=new FormData();

    let category={
      name:name,
      description:description
    }

    formData.append('category',JSON.stringify(category));
    if(file!="" ){
      formData.append('file',file);
    }

    axiosPost(URL.storeCategory,formData,(response)=>{
      if(response.data.success){
      setSubmitSpinner(false);

        props.toggleAddCategory();
        props.getCategories();
        setName("");
        setDescription("");
        setFile("");
        swal("Success",response.data.message,"success");
        
      }

    },(error)=>{
    setSubmitSpinner(false);
swal('Error',error.response.data.message,'error');

    })


  }

    return (
     <>
     <FullWindowSpinner text="Please Wait. Submitting..." display={submitSpinner}/>
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
              placeholder="Category Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="description" id="exampleText" onChange={(e)=>setDescription(e.target.value)}  value={description}/>
          </Col>
        </FormGroup>
        {filePreviewSrc!=""?(
          <FormGroup row>
          <Col sm={10}>
            <img className="img-fluid image" src={filePreviewSrc}/>
          </Col>
        </FormGroup>
        ):null}
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Image
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" onChange={(e)=>handleFileChange(e)} id="exampleFile" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button onClick={(e)=>insertCategory(e)} className="btn btn-success">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
     </>
    );
}
export default CategoryForm;
