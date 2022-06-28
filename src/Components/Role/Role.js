import React, { useEffect, useState } from "react";
import { RiDeleteBin7Line,RiAddCircleLine,RiEditBoxLine, RiEyeLine} from "react-icons/ri";
import { TbListDetails} from "react-icons/tb";
import { axiosGet } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import SmallSpinner from "../Spinner/SmallSpinner";
import WindowModal from "../WindowModal/WindowModal";
import RoleForm from "./RoleForm";

function Role(){


    const [roles, setRoles]=useState([]);
    const [spinner, setSpinner]=useState(true);
    const [addRoleModalOpen, setAddRoleModalOpen]=useState(false);

    useEffect(()=>{
        getRoles();
    },[])


    const toggleAddRoleModal=()=>{
      setAddRoleModalOpen(!addRoleModalOpen);
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
                      <td><RiEyeLine className="eye-icon" title="view permissions" /></td>
                      <td>
                        <TbListDetails title="view" className="detail-icon"  />
                        {/* <RiEditBoxLine title="edit" className="edit-icon"/> */}
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
                 
              
            </tbody>
          </table>
        </div>
        </>
    );
}
export default Role;