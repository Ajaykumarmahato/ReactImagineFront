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

function SideBar(props) {

  const [sideBarOpen,setSideBarOpen]=useState(false);
  const [modules,setModules]=useState(props.modules);


  function useEffect(){
    this.getModules();
  }

  function getModule(){
    let permissions =localStorage.getItem('permissions');
    debugger;
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
            <Menu iconShape="square">
              <SubMenu title="user">
                <MenuItem>Admin</MenuItem>
                <MenuItem>Customer</MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
          <SidebarFooter>Logout</SidebarFooter>
        </ProSidebar>
      </div>
    );
}
export default SideBar;
