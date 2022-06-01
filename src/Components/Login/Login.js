import React, { Component } from "react";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChnage = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    console.log([this.state.email, this.state.password]);
  };

  render() {
    return (
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
                      onChange={this.handleChnage}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                      onChange={this.handleChnage}
                    ></input>
                  </div>
                  <div className="form-group mt-2">
                    <button
                      className="btn btn-success form-control"
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
