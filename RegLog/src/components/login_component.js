import React, { Component } from "react";
import '../assets/style/page.css'
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockOpenIcon from "@mui/icons-material/LockOpen";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",

      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    console.log(email, password);
    var responseClone;
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data, "userRegister");
          if (data.error == "All inputs are Required") {
            alert("All inputs are Required");
          }
          if (data.error == "User Not found") {
            alert("User Not found");
          }
          if (data.error == "Password not match") {
            alert("Incorrect Password");
          }
          if (data.status == "ok") {
            alert("login successful");
            window.localStorage.setItem("token", data.data);

            window.location.href = "./userDetails";
          }
        },
        function (rejectionReason) {
          console.log("Error parsing JSON from response:", rejectionReason, responseClone);
          responseClone.text().then(function (bodyText) {
            console.log("Received the following instead of valid JSON:", bodyText);
          });
        }
      );
  }
  render() {
    return (
      <div className="backlogin">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit} class="logform">
              <h3
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                Login
              </h3>

              <div className="wrap-input100  m-b-23">
                <span className="label-input100">Email address</span>

                <input
                  type="email"
                  className="input100"
                  placeholder="Enter email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <span class="focus-input100">
                  <PermIdentityIcon
                    style={{
                      position: "absolute",
                      top: "38px",
                      color: "#adadad",
                    }}
                  />
                </span>
              </div>

              <div className="wrap-input100  m-b-23">
                <span className="label-input100">Password</span>
                <input
                  type="password"
                  className="input100"
                  placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <span class="focus-input100">
                  <LockOpenIcon
                   className="icon-style"
                  />
                </span>
              </div>

              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <div class="p-t-8 p-b-31 ptr">
                    <a class="text-right" href="/forget">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
              <div className="d-grid">
                <div class="container-login100-form-btn">
                  <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button type="submit" class="login100-form-btn">
                      Login
                    </button>
                  </div>
                </div>
              </div>
              <div className="posi-sm-text">
                <span class="txt1 p-b-17">Or Sign Up Using</span>
                <br />
                <a href="/sign-up" class="txt2">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
