import React from "react";
import SideBar from "../Sidebar/SideBar";
import img from '../../../src/budget.jpg';
function Home(){
        return(
            <>
        {/* <SideBar /> */}
        <div className="landing d-flex justify-content-center">
            {/* <h1>Welcome To The Sysytem.</h1>
             */}
             <img src={img} className="w-100" />
        </div></>);
}
export default Home;