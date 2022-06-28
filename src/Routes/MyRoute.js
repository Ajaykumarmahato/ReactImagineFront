import React from 'react';
import { Routes, Route} from "react-router-dom";

import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";
import Category from "../Components/Category/Category";
import Signup from "../Components/Signup/Signup";
import PrivateRoute from '../Routes/PrivateRoute';
import Role from '../Components/Role/Role';
function MyRoute(){
   
        return (
           
             <div className="d-flex">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
              <Route
              path="/dashboard"
              element={<PrivateRoute>
                <Home/>
              </PrivateRoute>}
              />
            <Route
              path="/category"
              element={<PrivateRoute>
                <Category/>
              </PrivateRoute>}
            />
            <Route
              path="/role"
              element={<PrivateRoute>
                <Role/>
              </PrivateRoute>}
            />
            <Route path="*" element={<>nothin found</>} />
          </Routes>
        </div>
        )
}
export default MyRoute;