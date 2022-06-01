import React, { Component } from "react";

import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";
import Home from "./Components/Home/Home";
import Category from "./Components/Category/Category";
class App extends Component {
  state = {};
  render() {
    return (
      <Router>
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
            <Route path="*" element={<>nothin found</>} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
