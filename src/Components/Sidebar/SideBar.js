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

function SideBar(props) {

  const [sideBarOpen,setSideBarOpen]=useState(false);
  const [modules,setModules]=useState(props.modules);


   useEffect=()=>{
    getModules();
  }

  function getModules(){
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
          <SidebarHeader>System</SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">

              <SubMenu title="category">
                <MenuItem>
                  List Categories <Link to="/category" />
                </MenuItem>
              </SubMenu>
            </Menu>
            {/* <Menu iconShape="square">
              <SubMenu title="user">
                <MenuItem>Admin</MenuItem>
                <MenuItem>Customer</MenuItem>
              </SubMenu>
            </Menu> */}
          </SidebarContent>
          <SidebarFooter>Logout</SidebarFooter>
        </ProSidebar>
      </div>
    );
}
export default SideBar;
