import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import swal from "sweetalert";

function RoleForm(props){


    const [name,setName]=useState("");
    const [modulePermissions,setModulePermissions]=useState([]);
    const [permissions,setPermissions]=useState([]);


    useEffect(()=>{
        getModulePermissions();
    },[])


 

    const getModulePermissions=()=>{
        axiosGet(URL.modulePermissions,(response)=>{
            if(response.data.success){
                setModulePermissions(response.data.data.items);
            }

        },(error)=>{

        })
    }

    const handlePermissionCheck=(e)=>{
      const permissionIds=permissions;
      if(e.target.checked){
        permissionIds.push(e.target.value);
      }else{
        permissionIds.splice(permissionIds.indexOf(e.target.value), 1);
      }
      setPermissions(permissionIds);
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
         <FormGroup>
         <div className="card">
                <div className="card-header">Choose Permissions</div>
                <div className="card-body module-permission-box">
                  {modulePermissions.length>0?(
                    modulePermissions.map((modulePermission,idx)=>{
                      return(
                        <div className="card">
                        <div className="card-header">{modulePermission.moduleName}</div>
                        <div className="card-body d-flex flex-wrap justify-content-between">
                          {modulePermission.action.length>0?(
                            modulePermission.action.map((actn,id)=>{
                              return(
                                 <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" value={actn.id} onClick={(e)=>handlePermissionCheck(e)}/>{' '}
                                    {actn.name}
                                  </Label>
                                </FormGroup>
                              )
                            })
                          ):null}
                           
                        </div>
                  </div>
                      )
                    })
                  ):<>No Permissions</>}
                  
                </div>
          </div>
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