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
import DatePicker from "react-datepicker";
import { axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import swal from "sweetalert";
import moment from "moment";

function NominalAccountForm(props){

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [amount,setAmount]=useState("");
    const [date, setDate] = useState(new Date());

    const insertNominalAccount=(e)=>{
       
        debugger;
        let data={
            title,
            description,
            amount,
            date:moment(date).format("YYYY-MM-DD"),
            isIncome:props.isIncome
        }
        debugger;
       axiosPost(URL.nominalAccounts,data,(response)=>{
            if(response.data.success){
                swal('Success',response.data.message,'success');
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