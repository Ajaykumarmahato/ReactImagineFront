import React, { useEffect, useState } from "react";
import { RiDeleteBin7Line,RiAddCircleLine,RiEditBoxLine, RiEyeLine, RiEditLine} from "react-icons/ri";
import { TbListDetails} from "react-icons/tb";
import { axiosGet } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import SmallSpinner from "../Spinner/SmallSpinner";
import WindowModal from "../WindowModal/WindowModal";
import EditRolePermissionForm from "./EditRolePermissionForm";
import RoleForm from "./RoleForm";

function Role(){


    const [roles, setRoles]=useState([]);
    const [spinner, setSpinner]=useState(true);
    const [addRoleModalOpen, setAddRoleModalOpen]=useState(false);
    const [editRolePermissionModalOpen, setEditRolePermissionModalOpen]=useState(false);
    const [roleId, setRoleId]=useState("");

    useEffect(()=>{
        getRoles();
    },[])


    const toggleAddRoleModal=()=>{
      
      setAddRoleModalOpen(!addRoleModalOpen);
    }

    const toggleEditRolePermissionModal=(roleId)=>{
      setRoleId(roleId);
      setEditRolePermissionModalOpen(!editRolePermissionModalOpen);
    }

    const getRoles=()=>{
        axiosGet(URL.roles,(response)=>{
            if(response.data.success){
                setRoles(response.data.data.items);
                setSpinner(false);
            }
        },(error)=>{

        })
    }

    return (
<>
 <div className="landing">
          <button
            className="btn btn-primary m-4"
              onClick={toggleAddRoleModal}
          >
            Add <RiAddCircleLine title="Add" className="add-icon"/>
          
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
                
            </thead>
            <tbody>
              {spinner?(
                  <SmallSpinner/>
              ):null}
              {roles.length>0?(
                roles.map((role, idx)=>{
                    return(
                        <>
                         <tr>
                      <th>{idx+1}</th>
                      <td>{role.name}</td>
                      <td><RiEditLine className="edit-icon" title="view/edit permissions" onClick={(e)=>toggleEditRolePermissionModal(role.id)} /></td>
                      <td>
                        <RiDeleteBin7Line title="delete" className="delete-icon"  />
                      </td>
                    </tr>
                        </>
                    )
                })
                
              ):<tr>
                No records...
                </tr>}
                 
                 {/* add role modal */}
                 <WindowModal
                  size={'lg'}
                  titleModal="Add Role"
                  openModal={addRoleModalOpen}
                  toggleModal={toggleAddRoleModal}
                  footerModal={null}
                  bodyModal={
                    <>
                      <RoleForm getRoles={getRoles} toggleAddRoleModal={toggleAddRoleModal}/>
                    </>
                  }
                 />
                 {/* edit role's permissions modal */}
                 <WindowModal
                  size={'lg'}
                  titleModal="Edit Permissions"
                  openModal={editRolePermissionModalOpen}
                  toggleModal={toggleEditRolePermissionModal}
                  footerModal={null}
                  bodyModal={
                    <>
                     <EditRolePermissionForm toggleEditRolePermissionModal={toggleEditRolePermissionModal} roleId={roleId} />
                    </>
                  }
                 />
                 
              
            </tbody>
          </table>
        </div>
        </>
    );
}
export default Role;