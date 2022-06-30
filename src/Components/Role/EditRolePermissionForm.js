import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";
import { URL } from "../../Utils/Constant";
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import swal from "sweetalert";
import FullWindowSpinner from "../Spinner/FullWindowSpinner";

function EditRolePermissionForm(props){

    const [roleModulePermissions,setRoleModulePermissions]=useState([]);
    const [permissions,setPermissions]=useState([]);
    const [submitSpinner,setSubmitSpinner]=useState(false);


    useEffect(()=>{
        getRoleModulePermissions();
    },[]);

    const getRoleModulePermissions=()=>{
        axiosGet(URL.moduleRolePermissions+`/${props.roleId}`,(response)=>{
            if(response.data.success){
                setRoleModulePermissions(response.data.data.items);
                if(response.data.data.items.length>0){
                  const permissionIds=[];
                  response.data.data.items.forEach((element)=>{
                    if(element.action.length>0){
                      element.action.forEach((actn)=>{
                        if(actn.hasPermission){
                          permissionIds.push(actn.id.toString());
                        }
                      })
                    }
                  })
                  setPermissions(permissionIds);
                }
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


    const updatePermission=(e)=>{
      setSubmitSpinner(true);
      let data={
        roleId:props.roleId,
        permissions:permissions
      }
      debugger;
      axiosPost(URL.editRolePermissions,data,(response)=>{
        if(response.data.success){
      setSubmitSpinner(false);

          swal('Success',response.data.message,'success');
          props.toggleEditRolePermissionModal(props.roleId);
        }
      },(error)=>{
      setSubmitSpinner(false);

           swal('Error',error.response.data.message,'error');
      })
    }


   

return (
    <>
    <FullWindowSpinner text="Please Wait. Saving Changes..." display={submitSpinner}/>
    <Form>
         <FormGroup>
         <div className="card">
                <div className="card-header">Choose Permissions</div>
                <div className="card-body module-permission-box">
                  {roleModulePermissions.length>0?(
                    roleModulePermissions.map((roleModulePermission,idx)=>{
                      return(
                        <div className="card">
                        <div className="card-header">{roleModulePermission.moduleName}</div>
                        <div className="card-body d-flex flex-wrap justify-content-between">
                          {roleModulePermission.action.length>0?(
                            roleModulePermission.action.map((actn,id)=>{
                              return(
                                 <FormGroup check>
                                  <Label check>
                                    <Input type="checkbox" value={actn.id} defaultChecked={actn.hasPermission} onClick={(e)=>handlePermissionCheck(e)} />{' '}
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
            <Button onClick={(e)=>updatePermission(e)} className="btn btn-success">Save Changes</Button>
          </Col>
        </FormGroup>
       
        </Form>
    </>
);
}
export default EditRolePermissionForm;