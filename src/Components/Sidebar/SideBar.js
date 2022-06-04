import React, { Component } from "react";
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

class SideBar extends Component {
  state = {
    sidebarOpen: false,
    modules: this.props.modules,
  };


  componentDidMount(){
    this.getModules();
  }

  getModules=()=>{
    let permissions =localStorage.getItem('permissions');
    debugger;
  }

  render() {
    return (
      <div className="sidebar">
        <ProSidebar collapsed={this.state.sidebarOpen}>
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
}
export default SideBar;
