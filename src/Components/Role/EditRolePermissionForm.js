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
import { URL } from "../../Utils/Constant";
import { axiosGet } from "../../Utils/AxiosApi";
import makeAnimated from 'react-select/animated';

function EditRolePermissionForm(props){
    const [permissionsOption,setPermissionsOption]=useState([]);
    const [defaultPermissionsOption,setDefaultPermissionsOption]=useState([]);

    const animatedComponents = makeAnimated();

    useEffect(()=>{
        existingPermissions();
        getPermissions();
    },[]);

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

    const existingPermissions=()=>{
        if(props.rolePermissions.length>0){
            const defaultOptions=[];
            props.rolePermissions.forEach((item)=>{
                defaultOptions.push({value:item.id,label:item.name})
            })
            setDefaultPermissionsOption(defaultOptions);
        }
    }

return (
    <>
    <Form>
     <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Permissions
          </Label>
          <Col sm={10}>
            <Select components={animatedComponents} isMulti closeMenuOnSelect={false} value={defaultPermissionsOption} options={permissionsOption}   />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col className="d-flex justify-content-end">
            <Button >Submit</Button>
          </Col>
        </FormGroup>
       
        </Form>
    </>
);
}
export default EditRolePermissionForm;