import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import swal from "sweetalert";
import moment from "moment";
import Select from 'react-select';

function NominalAccountForm(props){

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [amount,setAmount]=useState("");
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [files, setFiles] = useState(null);




    useEffect(()=>{
      getCategories();
    },[])

    const getCategories=()=>{
    axiosGet(URL.getAllCategories,(response)=>{
      if(response.data.success){
       if(response.data.data.items.length>0){
        let options=[];
        debugger;
        response.data.data.items.forEach((item)=>{
          options.push({
            label:item.name,
            value:item.id,
          })
        });
        setCategoryOptions(options);
       }
      }
    },(error)=>{

    })
  }

  const handleFileChange=(e)=>{
    debugger;
    setFiles([...e.target.files]);
  } 


    const selectCategory=(e)=>{
      setCategoryId(e.value);
    }
    const insertNominalAccount=(e)=>{
       var formData=new FormData();

        let data={
            title,
            description,
            amount,
            categoryId,
            date:moment(date).format("YYYY-MM-DD"),
            isIncome:props.isIncome
        }
        formData.append('data',JSON.stringify(data));
        debugger;
        if(files!=null && files.length>0){
         files.forEach((file)=>{
          formData.append('files[]',file);
         });
        }
       axiosPost(URL.insertNominalAccounts,formData,(response)=>{
            if(response.data.success){
              props.toggleAddNominalAccount();
              swal('Success',response.data.message,'success');
              props.getNominalAccounts();
            }
       },(error)=>{
        swal("Error",error.response.data.message,'error');
       })
    }

    return (
        <>

        <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="title"
              id="exampleEmail"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Title"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Amount
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="amount"
              id="exampleEmail"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}
              placeholder="Amount"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Date
          </Label>
          <Col sm={10}>
           <DatePicker selected={date} onChange={(date:Date) => setDate(date)} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Category
          </Label>
          <Col sm={10}>
           <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name={categoryId}
            options={categoryOptions}
            onChange={(e)=>selectCategory(e)}
          />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Files
          </Label>
          <Col sm={10}>
            <Input type="file" name="file" onChange={(e)=>handleFileChange(e)} id="exampleFile" multiple />
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
       
        <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button onClick={(e)=>insertNominalAccount()} className="btn btn-success">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
        </>
    );
}

export default NominalAccountForm;