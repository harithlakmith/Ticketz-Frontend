import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import authHeader from "./../services/auth-header";

class Select_Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busNo: JSON.parse(localStorage.getItem("userInfo")).BusNo,
      route: 0,
      date: undefined,
      time: undefined,
      routes: [],
      Seats: 0,
      test: undefined,
      nextPage: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.SelectRoute = this.SelectRoute.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  SelectRoute = () => {
    var value = new URLSearchParams(this.props.location.search);
    var s = value.get("s");

    axios
      .post(
        window.$API_SERVER + "Session",
        {
          BusNo: this.state.busNo,
          RId: parseInt(this.state.route),
          Date: this.state.date,
          StartTime: this.state.date + "T" + this.state.time + ":00",
          Seats: parseInt(s),
        },
        { headers: authHeader() }
      )
      .then((json) => {});
    this.setState({
      nextPage: true,
    });
  };

  componentDidMount() {
    axios
      .get(window.$API_SERVER + "Route", { headers: authHeader() })
      .then((res) => {
        console.log(res);
        this.setState({
          routes: res.data,
        });
      });
  }

  render() {
    if (JSON.parse(localStorage.getItem("role")) != "BusController") {
      return <Redirect to={"/sign-in"} />;
    }
    if (this.state.nextPage == true) {
      return <Redirect to={"/bus-dashboard"} />;
    }

    const { routes, busNo } = this.state;
    const routeList = routes.length ? (
      routes.map((route) => {
        return (
          <option value={route.RId}>
            {route.RNum} : {route.StartHolt}-{route.StopHolt}
          </option>
        );
      })
    ) : (
      <div className="center">No Routes available</div>
    );

    return (
      <div>
        <div class=" d-none d-lg-block">
          <div class="container p-3 mt-5">
            <div class="card   p-4 mt-5">
              <div class="headgd p-2">
                <h1 class="card-title  text-light text-center ">
                  <i class="fas fa-bus"></i>&nbsp;&nbsp;<u>Add Session</u>
                </h1>

                <h5 class="text-light text-center ">
                  Please fill in this form to reserve your sessions!
                </h5>
              </div>
              <br></br>
              <br></br>

              <div class="row">
                <div class="col-lg-6 ">
                  <div class="form-inline ">
                    <div class="col-lg-4   h5 ">My Bus&nbsp;:&nbsp; </div>

                    <div class="col-lg-5  ">
                      <input type="text" value={busNo} disabled="true"></input>
                    </div>
                  </div>

                  <br></br>
                  <div class="form-inline  " action="" method="get">
                    <div class="col-lg-4    h5 ">Route&nbsp;:&nbsp; </div>

                    <div class="col-lg-5">
                      <div class="dropdown">
                        <select
                          type="text"
                          pattern="[0-9]*"
                          name="route"
                          onChange={this.handleChange}
                          value={this.state.route}
                          required="required"
                        >
                          <option value="">Select Your Route</option>
                          {routeList}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline ">
                    <div class="col-lg-4    h5 ">
                      Date of Journey&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-lg-5">
                      <input
                        type="date"
                        pattern="[0-9]*"
                        name="date"
                        onChange={this.handleChange}
                        value={this.state.date}
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline ">
                    <div class="col-lg-4    h5 ">
                      Start Time of Your Journey&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-lg-5">
                      <input
                        type="time"
                        name="time"
                        onChange={this.handleChange}
                        value={this.state.time}
                      ></input>
                    </div>
                  </div>
                </div>

                <div class="col-lg-5  h5 ">
                  <br></br>
                  <br></br>
                  <br></br>
                  <img
                    class="img-fluid align-center"
                    src="images/bus.png"
                    alt="bus"
                  />
                </div>
              </div>
              <br></br>
              <div class="col-lg-4  h5 ">
                <div class="form-group">
                  <a
                    type="button"
                    onClick={this.SelectRoute}
                    class="btn btn-primary btn-lg"
                  >
                    RESERVE THIS SESSION
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" d-lg-none">
          <div class="container p-3 mt-5">
            <div class="card   p-4 mt-5">
              <div class="headgd p-2">
                <h1 class="card-title  text-light text-center ">
                  <i class="fas fa-bus"></i>&nbsp;&nbsp;<u>Add Session</u>
                </h1>

                <h5 class="text-light text-center ">
                  Please fill in this form to reserve your sessions!
                </h5>
              </div>
              <br></br>
              <br></br>

              <div class="row">
                <div class="col-md-12 col-sm-12 ">
                  <div class="form-inline ">
                    <div class="col-md-4 col-sm-4   h5 ">
                      My Bus&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-md-5 col-sm-5  ">
                      <input type="text" value={busNo} disabled="true"></input>
                    </div>
                  </div>

                  <br></br>
                  <div class="form-inline  " action="" method="get">
                    <div class="col-md-4 col-sm-4    h5 ">
                      Route&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-md-5 col-sm-5">
                      <div class="dropdown">
                        <select
                          type="text"
                          pattern="[0-9]*"
                          name="route"
                          onChange={this.handleChange}
                          value={this.state.route}
                          required="required"
                        >
                          <option value="">Select Your Route</option>
                          {routeList}
                        </select>
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline ">
                    <div class="col-md-4 col-sm-4    h5 ">
                      Date of Journey&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-md-5 col-sm-5">
                      <input
                        type="date"
                        pattern="[0-9]*"
                        name="date"
                        onChange={this.handleChange}
                        value={this.state.date}
                      ></input>
                    </div>
                  </div>
                  <br></br>
                  <div class="form-inline  ">
                    <div class="col-md-4 col-sm-4  h5 ">
                      Start Time of Your Journey&nbsp;:&nbsp;{" "}
                    </div>

                    <div class="col-md-5 col-sm-5">
                      <input
                        type="time"
                        name="time"
                        onChange={this.handleChange}
                        value={this.state.time}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div class="col-md-6 col-sm-6  h5 ">
                <div class="form-group">
                  <a
                    type="button"
                    onClick={this.SelectRoute}
                    class="btn btn-primary btn-lg"
                  >
                    RESERVE THIS SESSION
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Select_Route);
