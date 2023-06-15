import React, { Component } from "react";
import ".//Login.css";
import AuthService from "./auth.service";
import { withRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);
    // console.log("props", props);

    this.state = {
      form: {
        UserName: "",
        password: "",
      },
      formErrors: {
        UserName: null,
        password: null,
      },
      setLoading: false,
      setMessage: false,
      userLogged: false,
    };
  }
  loginClick = (e) => {
    e.preventDefault();
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);
    // console.log(errorObj, "value ", form);

    if (Object.keys(errorObj).length !== 0) {
      this.setState({ formErrors: { ...formErrors, ...errorObj } });
      return false;
    } else {
      const data = {
        Username: this.state.form.UserName,
        Password: this.state.form.password,
      };
      AuthService.loginCheck(data)
        .then((res) => {
          this.setState({ userLogged: true });
          // console.log("com", res);

          // if(res.Token!=null){

          // }

          // if(res.Token!=null){
          //     localStorage.setItem("user",JSON.stringify(res.Token))

          // }

          //this.props.history.push("/home")
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          //   this.setState({});
          //   setMessage(resMessage);
        });
    }
  };

  // getApi=()=>{
  //   fetch("https://localhost:44303/api/Authenticate")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       console.log(data)
  //     })
  // }

  validateField = (name, value, refValue) => {
    let errorMsg = null;
    switch (name) {
      case "UserName":
        if (!value) errorMsg = "Please enter Name.";
        break;
      case "email":
        if (!value) errorMsg = "Please enter Email.";
        else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        )
          errorMsg = "Please enter valid Email.";
        break;
      case "phone":
        if (!value) errorMsg = "Please enter Phone.";
        break;
      case "gender":
        if (!value) errorMsg = "Please select Gender.";
        break;
      case "password":
        if (!value) errorMsg = "Please enter Password.";
        else if (refValue && value !== refValue)
          errorMsg = "Password and Confirm Password does not match.";
        break;
      case "language":
        if (value.length === 0) errorMsg = "Please select Language.";
        break;
      default:
        break;
    }
    return errorMsg;
  };
  validateForm = (form, formErrors, validateFunc) => {
    const errorObj = {};
    Object.keys(formErrors).map((x) => {
      let refValue = null;
      if (x === "password") {
        refValue = form[x === "password"];
      }
      const msg = validateFunc(x, form[x], refValue);
      if (msg) errorObj[x] = msg;
    });
    return errorObj;
  };

  changeValue = (e) => {
    const { name, value, checked } = e.target;
    const { form, formErrors } = this.state;
    let formObj = {};
    if (name === "language") {
      // handle the change event of language
      if (checked) {
        // push selected value in list
        formObj = { ...form };
        formObj[name].push(value);
      } else {
        // remove unchecked value from the list
        formObj = {
          ...form,
          [name]: form[name].filter((x) => x !== value),
        };
      }
    } else {
      // handle change event except language field
      formObj = {
        ...form,
        [name]: value,
      };
    }
    this.setState({ form: formObj }, () => {
      if (!Object.keys(formErrors).includes(name)) return;
      let formErrorsObj = {};
      if (name === "password") {
        let refValue = this.state.form[name === "password"];
        const errorMsg = this.validateField(name, value, refValue);
        formErrorsObj = { ...formErrors, [name]: errorMsg };
        if (!errorMsg && refValue) {
          formErrorsObj.confirmPassword = null;
          formErrorsObj.password = null;
        }
      } else {
        const errorMsg = this.validateField(
          name,
          name === "language" ? this.state.form["language"] : value
        );
        formErrorsObj = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorsObj });
    });
  };
  render() 
  {
    if (this.state.userLogged) {
      return <Navigate to="/add-scheme" />;
    }
    const { form, formErrors } = this.state;
    return (
      <React.Fragment>
        <section
          className="h-100 gradient-form"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                            style={{ width: 185 }}
                            alt="logo"
                          />
                          <h4 className="mt-1 mb-5 pb-1">
                            We are The Lotus Team
                          </h4>
                        </div>
                        <form onSubmit={this.loginClick}>
                          <p>Please login to your account</p>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              name="UserName"
                              value={form.UserName}
                              onChange={this.changeValue}
                              className="form-control"
                              placeholder="Phone number or email address"
                            />
                            <label
                              className="form-label"
                              for="form2Example11"
                            >
                              Username
                            </label>
                            {formErrors.UserName && (
                              <span className="err">{formErrors.UserName}</span>
                            )}
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              name="password"
                              type="password"
                              value={form.password}
                              onChange={this.changeValue}
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              for="form2Example22"
                            >
                              Password
                            </label>
                            {formErrors.password && (
                              <span className="err">{formErrors.password}</span>
                            )}
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Log in
                            </button>
                            {/* <button onClick={()=>this.getApi()}>get Api</button>
                             */}
                            {/* <a className="text-muted" href="#!">Forgot password?</a>
                             */}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">
                          We are more than just a company
                        </h4>
                        <p className="small mb-0">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
