import React from 'react';
import { Routes, Route , Navigate } from "react-router-dom";

import Login from "../Components/Login/Login";
import SideBar from "../Components/Sidebar/SideBar";
import Home from "../Components/Home/Home";
import Category from "../Components/Category/Category";
import Signup from "../Components/Signup/Signup";
function MyRoute(){
   
      const isLoggedIn=localStorage.getItem('isLoggedIn');
        return (
           
             <div className="d-flex">
          <Routes>
            {/* free routes start */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
            {/* free routes end */}

            {/*auth routes start */}
              <Route
              path="/dashboard"
              element={isLoggedIn?(<Home />):(<Navigate to="/login" />)}
              />
            
            <Route
              path="/category"
              element={isLoggedIn?(<Category />):(<Navigate to="/login" />)}
            />
            {/* auth routes end */}


            <Route path="*" element={<>nothin found</>} />
          </Routes>
        </div>
        )
}
export default MyRoute;