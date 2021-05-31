import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect, withRouter} from 'react-router-dom';
import AuthService from "./../services/auth.service";

class SignIn extends Component{

    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          loading: false,
          message: ""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      handleLogin(e) {
            e.preventDefault();
        
            this.setState({
              message: "",
              loading: true
            });
          
       // this.form.validateAll();

            AuthService.login(this.state.username, this.state.password).then(
              () => {

                  const role=JSON.parse(localStorage.getItem('role'))
                  if(role=='Passenger'){
                    this.props.history.push("/home")
                  }else if(role=='Administrator'){
                    this.props.history.push("/admin-dash")
                  }else if(role=='BusController'){
                    this.props.history.push("/bus-dashboard")
                  };
                //  this.props.history.push("/home")
                window.location.reload();
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            );
              

        
    }

  /* ---*/

render(){
    
 if (localStorage.getItem('user')){
    return <Redirect to={'/home'} />
}
    
return (

  <form onSubmit={this.handleLogin} class= "form-signin">
    
    <div class="container-fuild pt-3 px-lg-5 px-5 mt-lg-5 mt-2">
      <div class="mt-5">
          <h1>
             <u>Login</u>
          </h1>
             
          <br></br>
          <br></br>  
  
       <div class="row">
          <div class="col-12 col-lg-8 px-4 col-sm-12">
          
          <div class="input-group mb-3 px-2">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-envelope-open fa-lg"></i></span>
             <input type="text" class="form-control" name="username" 
                 onChange={this.onChangeUsername}
                 value={this.state.username} placeholder="Email" required="required"/>
            </div>

            <div class="input-group mb-3 px-2">
          <span class="input-group-text" id="basic-addon1"><i class="fas fa-user-lock fa-lg"></i></span>
            <input type="password" class="form-control" name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                placeholder="Password" required="required"/>
            </div>
         
          <br></br>
          
           <div class="form-group text-center">
              <button type="submit"
                class="btn btn-primary btn-lg"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span class="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
           </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
           
  
          </div>

          
          <div class="col-12 col-lg-4 px-4 col-sm-12">
            
          <img src="images/login.jpeg" alt="login" class="ml-5"/>
          </div>
                   
        </div>
  
      </div>
  
    </div>

    
  </form>



    );
  }
  }
  
  export default withRouter(SignIn);