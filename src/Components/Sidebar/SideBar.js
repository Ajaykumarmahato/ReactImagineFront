import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { axiosGet } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import checkPermission from "../../Utils/PermissionChecker";

function SideBar() {
debugger;
  const [sideBarOpen,setSideBarOpen]=useState(false);
  const [modules,setModules]=useState([]);

  let navigate = useNavigate();

   useEffect(()=>{
    getModules();
  },[])

  const toggleSidebar=()=>{
    setSideBarOpen(!sideBarOpen);
  }

  const getModules=()=>{
    axiosGet(URL.modules,(response)=>{
      if(response.data.success){
        setModules(response.data.data.items)
      }
    },(error)=>{

    })
  }

  const logout=()=>{
    axiosGet(URL.logout,(response)=>{
      if(response.data.success){
        localStorage.clear();
        swal('Success',response.data.message,'success');
        navigate('/');
      }
    },(error)=>{
        swal('Error',error.response.data.message,'error');
    })
  }

    return (
      <div className="sidebar">
        <ProSidebar collapsed={sideBarOpen}>
        <SidebarHeader onClick={toggleSidebar}>
        System
      </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {modules.length>0?(
              modules.map((module, idx)=>{
                return(
                  module.sub_modules.length>0?(
                    checkPermission('show-module',module.name)?(
                      <SubMenu title={module.name}>
                        {module.sub_modules.map((subModule,id)=>{
                          return(
                            checkPermission('show-module',subModule.name)?(
                              <MenuItem>{subModule.name}
                                <Link to={subModule.ui_url} exact/>
                              </MenuItem>
                            ):null
                          )
                        })}
                      </SubMenu>
                    ):null
                    
                  ):(
                    checkPermission('show-module',module.name)?(
                      <MenuItem>{module.name}
                                <Link to={module.ui_url} exact/>
                      </MenuItem>
                    ):null
                  
                  )
                )
              })
              ):null}
              <MenuItem onClick={logout}>Logout
                                
                      </MenuItem>
              
            </Menu>  
          </SidebarContent>
          {/* <SidebarFooter onClick={logout}>Logout</SidebarFooter> */}
        </ProSidebar>
      </div>
    );
}
export default SideBar;
