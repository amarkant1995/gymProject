import React, { Component } from "react";
import  SchemeService from '../SchemeMaster/SchemeService'
export default class AddPlan extends Component {
  constructor() {
    super();

    this.state = {
        masterScheme:[],
        form:{
            PlanID:0,
            PlanName:"",
            PlanAmount:0,
            ServiceTax:0,
            ServicetaxAmount:0,
            SchemeID:0,
            PeriodID:0
        },
        formError:{

        }
    };
  }

  componentDidMount(){

    SchemeService.getAll().then((res)=>
    {
      console.log(res.data);
      this.setState({
        masterScheme:res.data
      });
    }
    )
  }
  render() {
    return (
      <React.Fragment>
        <div class="col-md-8 m-auto">
          <div class="card card-success">
            <div class="card-header">
              <h3 class="card-title">Add Plan</h3>
            </div>
            <div className="card-body">
              <form>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Add Plan Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Plan Name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Period</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter  Period..."
                          disabled=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Scheme</label>
                        <select class="form-control" id="exampleSelectRounded0">
{
this.state.masterScheme.map((Item)=><option>

  {{}}
</option>)
  
}                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Plan Amount</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Plan Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label>Service Tax</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Plan Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-success">
                    Add Plan
                  </button>{" "}
                  &nbsp; &nbsp;
                  <button type="reset" class="btn btn-danger float-right">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
