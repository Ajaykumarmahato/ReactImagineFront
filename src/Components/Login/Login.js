import React, {useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { axiosPost } from "../../Utils/AxiosApi";
import { URL } from "../../Utils/Constant";
import {useNavigate} from 'react-router-dom';
import { Spinner } from "react-bootstrap";

function Login() {
 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [spinner,setSpinner]=useState(false);
  
  let navigate = useNavigate();

  function handleLogin(){
    setSpinner(true);
    let data = {
      email: email,
      password: password,
    };

    axiosPost(
      URL.login,
      data,
      (response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem(
            "permissions",
            JSON.stringify(response.data.data.permissions)
            );
            localStorage.setItem("role", response.data.data.roles);
            localStorage.setItem("isLoggedIn", true);
            setSpinner(false);
            navigate('/dashboard',{ replace: true });
        }
      },
      (err) => {
        debugger;
      }
    );
  };

    return (
     <>
      {spinner ? (
       <div class="spinner">
       <div class="loader-spinner">
         <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg">
           <circle class="load one" cx="60" cy="60" r="20" pathLength="1" />
           <circle class="load two" cx="60" cy="60" r="10" />
           <circle class="load three" cx="60" cy="60" r="30" pathLength="1" />
         </svg>
       </div>
     </div>
      ) : null}
      <div className="landing w-100">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 col-sm-12 col-md-12 w-50">
              <div className="card">
                <div className="card-header">Login</div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="email address"
                      name="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group mt-2">
                    <button
                      className="btn btn-success form-control"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
                  <div className="card-footer d-flex justify-content-center">
                    <Link to="/signup">Register Here!</Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}
export default Login;
