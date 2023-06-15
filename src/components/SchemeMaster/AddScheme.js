import React, { Component } from "react";
import SchemeService from "./SchemeService";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddDeleteTableRows from "../Controls/AddDeleteTableRows";
export default class AddScheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: [
        { Id: 1, empName: "Amar" },
        { Id: 2, empName: "gaurav" },
        { Id: 3, empName: "Anuj" },
      ],
      form: {
        SchemeID: 0,
        SchemeName: "",
        Status: false,
      },
      formErrors: {
        SchemeName: null,
        Status: false,
      },
      SchemeList: [],
    };
  }
  componentDidMount() {
    this.getAllScheme();
  }

  getAllScheme() {
    SchemeService.getAll().then((response) => {
      console.log("response.data All schemes", response.data);
      this.setState({ SchemeList: response.data });
      console.log(response.data);
    });
  }
  validateField = (name, value, refValue) => {
    let errorMsg = null;
    debugger;
    switch (name) {
      case "SchemeName":
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

      case "Status":
        if (!value) errorMsg = "Please select Status.";
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

  ChangeHandler = (e) => {
    // const value =
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // this.setState({ ...this.state, [e.target.name]: value });
    const { name, value, checked } = e.target;
    const { form, formErrors } = this.state;

    let formObj = {};
    if (name === "Status") {
      debugger;
      // handle the change event of language
      if (checked) {
        // push selected value in list
        formObj = { ...form };
        console.log("formObj", formObj);
        formObj = {
          ...form,
          [name]: checked,
        };
      } else {
        // remove unchecked value from the list
        formObj = {
          ...form,
          [name]: false,
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
          name === "Status" ? this.state.form["Status"] : value
        );
        formErrorsObj = { ...formErrors, [name]: errorMsg };
      }
      this.setState({ formErrors: formErrorsObj });
    });
  };
  removeItem = (Id) => {
    alert(this.state.employee.length);
    if (!(this.state.employee.length <= 1)) {
      let ItemArr = this.state.employee.filter((Item) => Item.Id !== Id);
      this.setState({ employee: ItemArr });
    } else {
      alert("you can not deete at least one item ");
    }
  };
  post = (e) => {
    e.preventDefault();
    const { form, formErrors } = this.state;
    const errorObj = this.validateForm(form, formErrors, this.validateField);

    if(this.state.form.SchemeID>0){
      if (Object.keys(errorObj).length !== 0) {
        this.setState({ formErrors: { ...formErrors, ...errorObj } });
        return false;
      } else {
        const data = {
          SchemeID:this.state.form.SchemeID,
          SchemeName: this.state.form.SchemeName,
          Status: this.state.form.Status,
        };
        console.log(data);
        SchemeService.updateScheme(data)
          .then((res) => {
            console.log("add", res.ReasonPhrase);
            if (res.ReasonPhrase == "OK") {
              toast.success("Success Notification !", {
                position: toast.POSITION.TOP_RIGHT,
              });
  
              this.getAllScheme();
            }
          })
          .catch((error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          });
      }
      
    }
else{
  if (Object.keys(errorObj).length !== 0) {
    this.setState({ formErrors: { ...formErrors, ...errorObj } });
    return false;
  } else {
    const data = {
      SchemeName: this.state.form.SchemeName,
      Status: this.state.form.Status,
    };
    console.log(data);
    SchemeService.addScheme(data)
      .then((res) => {
        console.log("add", res.ReasonPhrase);
        if (res.ReasonPhrase == "OK") {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_RIGHT,
          });

          this.getAllScheme();
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      });
  }
  
}    
    
    e.target.reset();

  };
  getDetailsById = (id) => {
    SchemeService.getSchemeById(id).then((res) => {
      this.setState({
        form: {
          SchemeID: res.data.SchemeID,
          SchemeName: res.data.SchemeName,
          Status: res.data.Status,
        },
      });
    });
  };
  removeScheme=(id)=>{
if(window.confirm('do you want to delete this records?')
){
  SchemeService.deleteRow(id).then((res) => {
  console.log("deleterow",res)
  if(res.ReasonPhrase=="OK") {
    toast.success("record delete successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });

let temp=this.state.SchemeList.filter((Item)=>Item.SchemeID!==id);
    this.setState({SchemeList:temp});
  } 
  });

}

  }
  render() {
    const { form, formErrors } = this.state;
    console.log("form", form);

    return (
      <React.Fragment>
        {/* SchemeName is {console.log("this.state", this.state)} */}
        {/* <span style={{color: "red"}}>{this.state.formErrors["SchemeName"]}</span> */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form onSubmit={this.post}>
                <div className="mb-3">
                  <label className="form-label">SchemeName </label>
                  <input
                    value={form.SchemeName}
                    type="text"
                    name="SchemeName"
                    className="form-control"
                    onChange={(e) => this.ChangeHandler(e)}
                  />
                  {formErrors.SchemeName && (
                    <span className="err">{formErrors.SchemeName}</span>
                  )}
                </div>

                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="Status"
                    checked={form.Status}
                    value={form.Status}
                    onChange={(e) => this.ChangeHandler(e)}
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Status
                  </label>
                  {formErrors.Status && (
                    <span className="err">{formErrors.Status}</span>
                  )}
                </div>

                <button type="submit" class="btn btn-primary">
                  Add Scheme
                </button>
              </form>
            </div>
            <div className="col-12 mt-4">
              <div className="row">
                <ToastContainer />
                <table class="table" border={1}>
                  <thead>
                    <tr>
                      <th scope="col">Sr No</th>
                      <th scope="col">Scheme Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.SchemeList.length > 0 ? (
                      this.state.SchemeList.map((Item, index) => (
                        <tr key={index}>
                          <td>{Item.SchemeID}</td>
                          <td>{Item.SchemeName}</td>
                          <td>
                            <span
                              data-placement="top"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <button
                                className="btn btn-primary btn-xs"
                                onClick={(e) =>
                                  this.getDetailsById(Item.SchemeID)
                                }
                              >
                                <i className="fa fa-pencil">Edit</i>
                              </button>
                            </span>
                            ||{" "}
                            <span
                              data-placement="top"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              <button onClick={(e) =>
                                  this.removeScheme(Item.SchemeID)
                                }
                                 className="btn btn-danger btn-xs">
                                <i className="fa fa-trash">Delete</i>
                              </button>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <th colSpan={3}>No Records are found!</th>
                      </tr>
                    )}
                  </tbody>
                </table>
                <AddDeleteTableRows></AddDeleteTableRows>
                {/* <ul className="list-group">
                  {this.state.employee.map((item) => (
                    <li className="list-group-item">
                      {item.empName}
                      <button onClick={(e) => this.removeItem(item.Id)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
