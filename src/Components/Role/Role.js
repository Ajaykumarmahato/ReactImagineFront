import React, { useEffect, useState } from "react";
import { RiDeleteBin7Line,RiAddCircleLine,RiEditBoxLine} from "react-icons/ri";
import { BiSearchAlt} from "react-icons/bi";
import swal from "sweetalert";
import { axiosGet, axiosPost } from "../../Utils/AxiosApi";
import { pagination, URL } from "../../Utils/Constant";
import checkPermission from "../../Utils/PermissionChecker";
import FullWindowSpinner from "../Spinner/FullWindowSpinner";
import SmallSpinner from "../Spinner/SmallSpinner";
import WindowModal from "../WindowModal/WindowModal";
import EditRolePermissionForm from "./EditRolePermissionForm";
import RoleForm from "./RoleForm";
import SearchRole from "./SearchRole";
import Pagination from "../Pagination/Pagination";

function Role(){


    const [roles, setRoles]=useState([]);
    const [spinner, setSpinner]=useState(true);
    const [addRoleModalOpen, setAddRoleModalOpen]=useState(false);
    const [editRolePermissionModalOpen, setEditRolePermissionModalOpen]=useState(false);
    const [roleId, setRoleId]=useState("");
    const [submitSpinner, setSubmitSpinner]=useState(false);
    const [searchRoleModalOpen,setSearchRoleModalOpen]=useState(false);
  const [pageNumber,setPageNumber]=useState(1);
  const [totalPage,setTotalPage]=useState(null);
  const [searchParam,setSearchParam]=useState("");



    useEffect(()=>{
        getRoles();
    },[pageNumber])

  const toggleSearchRole = () => {
      setSearchRoleModalOpen(!searchRoleModalOpen);
    };

    const toggleAddRoleModal=()=>{
      
      setAddRoleModalOpen(!addRoleModalOpen);
    }

    const toggleEditRolePermissionModal=(roleId)=>{
      setRoleId(roleId);
      setEditRolePermissionModalOpen(!editRolePermissionModalOpen);
    }

    const getRoles=()=>{
      const data={
        pageNumber:pageNumber,
        name:searchParam
      }
      let url=searchParam===""?URL.roles:URL.searchRole;
        axiosPost(url,data,(response)=>{
          debugger;
            if(response.data.success){
                setTotalPage(Math.ceil(response.data.data.total/pagination));
                setRoles(response.data.data.roles);
                if(searchRoleModalOpen){
                  toggleSearchRole()
                }
                setSpinner(false);
            }
        },(error)=>{

        })
    }

    

    const deleteRole=(roleId)=>{
      swal({
            title: "Warning",
            text:
              "Are you sure you want to delete this record.",
            icon: "error",
            dangerMode: true,
            closeOnClickOutside: false,
            outsideClick: false,
            buttons: {
              cancel: true,
              confirm: true,
            },
          }).then((willDelete) => {
            if (willDelete) {
              setSubmitSpinner(true);
              axiosGet(`${URL.deleteRole}/${roleId}`,(response)=>{
                if(response.data.success){
              setSubmitSpinner(false);

                  swal('Success',response.data.message,'success');
                  getRoles();
                }
              },
              (error)=>{
              setSubmitSpinner(false);

                swal('Error',error.response.data.message,'error');
              })

            }else{
              swal('Info','Your record is safe','info');
            }
          });
    }

    const handleNext=()=>{
      setPageNumber(pageNumber+1);
    
    }
    const handlePrevious=()=>{
      setPageNumber(pageNumber-1);
    }

    const resetSearchForm=()=>{
      setSearchParam("");
      setPageNumber(1);
    }

    return (
<>
<FullWindowSpinner text="Please Wait. Deleting..." display={submitSpinner} />

 <div className="landing">
 <div className="d-flex justify-content-between">
         {checkPermission('create','Role')?(
           <button
            className="btn btn-primary m-4"
              onClick={toggleAddRoleModal}
          >
            Add <RiAddCircleLine title="Add" className="add-icon"/>
          
          </button>
          
         ):null}
          {checkPermission('search','Role')?(
            <>
           <button
            className="btn btn-warning m-4 text-light"
            onClick={toggleSearchRole}
          >
            Search <BiSearchAlt title="Search" className="search-icon"/>
          </button>
           <button
           className="btn btn-danger m-4 text-light"
           onClick={resetSearchForm}
         >
           Reset <BiSearchAlt title="Search" className="search-icon"/>
         </button></>
         ):null}
         </div>
           <div className="tableContainerDiv" >
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
                
            </thead>
            <tbody>
             
              {roles.length>0?(
                roles.map((role, idx)=>{
                    return(
                        <>
                         <tr>
                      <th>{idx+1}</th>
                      <td>{role.name}</td>
                      <td >
                        {checkPermission('update','Role')?(
                          <RiEditBoxLine className="edit-icon" title="view/edit permissions" onClick={(e)=>toggleEditRolePermissionModal(role.id)} />
                        ):null}
                      </td>
                      <td >
                        {checkPermission('delete','Role')?(
                          <RiDeleteBin7Line title="delete" className="delete-icon" onClick={()=>deleteRole(role.id)}  />
                        ):null}
                      </td>
                    </tr>
                        </>
                    )
                })
                
              ):(<tr>
                  <td colSpan={5} className="text-center">
                  {spinner ? (
                      <>
                      <SmallSpinner color="#0000FF" size={30} />
                      <br></br>Loading Data...
                      </>
                  ) : (
                      'No Roles'
                  )}
                  </td>
                </tr>)}
                {roles.length>0?(
                  <tr>
                  <td colSpan={5} className="text-center">
                    <Pagination pageNumber={pageNumber} totalPage={totalPage}  handleNext={handleNext} handlePrevious={handlePrevious}/>
                  </td>
                </tr>
                ):null}
                 
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

                  {/* Role search modal start */}
        <WindowModal
          size={'md'}
          titleModal="Search Role"
          openModal={searchRoleModalOpen}
          toggleModal={()=>toggleSearchRole()}
          footerModal={null}
          bodyModal={
            <>
              <SearchRole getRoles={getRoles} searchParam={searchParam} setSearchParam={setSearchParam}/>
            </>
          }
        />
        {/* Role search modal end */}
                 
              
            </tbody>
          </table>
        </div>
        </div>
        </>
    );
}
export default Role;