import React from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../Components/Sidebar/SideBar";
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? <><SideBar/>{children}</>: <Navigate to="/" replace />;
}
function useAuth() {
  let token = localStorage.getItem("token");
  if (token) {
      return true;
    
  } else {
    return false;
  }
}
export default PrivateRoute;






