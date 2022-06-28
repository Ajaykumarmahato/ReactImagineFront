import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Select from 'react-select'
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import swal from "sweetalert";

function RoleForm(props){


    const [name,setName]=useState("");
    const [permissionsOption,setPermissionsOption]=useState([]);
    const [permissions,setPermissions]=useState([]);

    useEffect(()=>{
        getPermissions();
    },[])


    const handleSelectChange=(selected)=>{
        const permissionIds=[];
        selected.forEach((item)=>{
            permissionIds.push(item.value);
        });
        setPermissions(permissionIds);
    }

    const getPermissions=()=>{
        axiosGet(URL.permissions,(response)=>{
            if(response.data.success){
                const options=[];
                if(response.data.data.items.length>0){
                    response.data.data.items.forEach((item)=>{
                    options.push({value:item.id,label:item.name})
                    })
                }
                setPermissionsOption(options);
            }

        },(error)=>{

        })
    }

    const insertRole=(e)=>{
        e.preventDefault();
        let data={
            name:name,
            permissions:permissions
        }
        axiosPost(URL.roles,data,(response)=>{
            debugger;
            if(response.data.success){
                props.getRoles();
                setName("");
                setPermissions([]);
                props.toggleAddRoleModal();
                swal('Success',response.data.message,'success');
                
            }
        },(error)=>{
           swal('Error',error.response.data.message,'error');
        })

    }

    return(
        <>
         <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
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
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Permissions
          </Label>
          <Col sm={10}>
            <Select isMulti closeMenuOnSelect={false} options={permissionsOption} onChange={handleSelectChange} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button onClick={(e)=>insertRole(e)}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
        </>
    )
}
export default RoleForm;