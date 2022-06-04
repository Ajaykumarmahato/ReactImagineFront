import React,{Component} from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "../Components/Login/Login";
import SideBar from "../Components/Sidebar/SideBar";
import Home from "../Components/Home/Home";
import Category from "../Components/Category/Category";
import Signup from "../Components/Signup/Signup";
export default class MyRoute extends Component{
    render(){
        return (
           
             <div className="d-flex">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SideBar /> <Home />
                </>
              }
            />
            <Route
              path="/category"
              element={
                <>
                  <SideBar /> <Category />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                   <Signup />
                </>
              }
            />
            <Route path="*" element={<>nothin found</>} />
          </Routes>
        </div>
        )
    }
}