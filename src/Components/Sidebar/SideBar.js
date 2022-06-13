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
import { Link } from "react-router-dom";
import { axiosGet } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";

function SideBar() {

  const [sideBarOpen,setSideBarOpen]=useState(false);
  const [modules,setModules]=useState([]);


   useEffect=()=>{
    getModules();
  }

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
                    <SubMenu title={module.name}>
                    {module.sub_modules.map((subModule,id)=>{
                      return(
                        <MenuItem>{subModule.name}<Link to={subModule.ui_url}/></MenuItem>
                      )
                    })}
                    </SubMenu>
                  ):(
                    <MenuItem>{module.name}<Link to={module.ui_url}/></MenuItem>
                  )
                )
              })
              ):null}
            </Menu>  
          </SidebarContent>
          <SidebarFooter>Logout</SidebarFooter>
        </ProSidebar>
      </div>
    );
}
export default SideBar;
