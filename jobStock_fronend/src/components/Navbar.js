import React, {  useState } from "react";
import { Link } from "react-router-dom";
import logoWhite from "../img/logo-white.png";
import logoblack from "../img/logo.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function Navbar({showModal, setShowModal}) {
  const UserContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("Freelancer");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [show, setShow] = useState(null)
  const Navigator = useNavigate();  
  let Euser;





  const handleLogin = () => {
    setIsLoading(true);
    axios.post("http://localhost:3003/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === false) {
          setError(response.data.message);
          toast.error("Email and password is incorrect");
        }
        if (response.data.status === true) {
          toast.success("Login Success!");
          setError(null);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          UserContext.setUser(jwtDecode(response.data.token));
          Euser = jwtDecode(response.data.token);
          console.log(Euser);
          if (Euser.role === "Freelancer") {
            window.location.href = "/user-profile";
          
          } else if (Euser.role === "Employeer") {
            window.location.href = "/employeer-profile";
          }

          setShowModal(false); // Close the modal
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  const handelSingup =()=>{
    setIsLoading(true);
    console.log(first_name +" " + last_name+" " + username +" "+ role +" "+ email +" "+ password )
    const data = {
      first_name, last_name, username, role, email,password
    }
    console.log(data)
    axios.post('http://localhost:3003/signup', data)
      .then(response => {
        console.log(response.data);
        if (response.data.status === false) {
          toast.error("Username or Email is Already Register");
        }
        if (response.data.status === true) {
          setError(null);
          setShow("Account Created Login Now")
          toast.success("Account created successfully! Login Now");

        }

      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }
 if (UserContext.user?.role === "Freelancer"){
  return (
    <nav className="navbar navbar-default navbar-fixed navbar-transparent  bootsnav">
    <div className="container">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"><i
                className="fa fa-bars"></i></button>
        <div className="navbar-header"><Link className="navbar-brand" to="/"><img
                    src={logoWhite} className="logo logo-display" alt="" />
                    </Link></div>
        <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">

               
                <li><Link to="/find-job">Find Jobs</Link></li>
                <li><Link to="/my-proposals">my proposals</Link></li>
                <li><Link to="/user-profile">My Profile</Link></li>
               
                <li className="left-br">
                {
                  (UserContext.user === null) ? (
                    <button
                    data-toggle="modal"
                    data-target="#signup"
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In / Sign up
                  </button>
                    
                  ) : (
                    <Link className="signin" to="/logout">
                    Logout
                  </Link>
                  )}
                  </li>
            </ul>
           
        </div>
    </div>
   </nav>
  );
 }
 else if(UserContext.user?.role === "Employeer"){
  return (
    <nav className="navbar navbar-default navbar-fixed navbar-transparent  bootsnav">
    <div className="container">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"><i
                className="fa fa-bars"></i></button>
        <div className="navbar-header"><Link className="navbar-brand" to="/">
        <img src={logoWhite} className="logo logo-display" alt="" />
          <img src={logoWhite} className="logo logo-scrolled" alt="" /></Link></div>
        <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
            <li><Link to="/create-job">Create Job</Link></li>
            <li><Link to="/manage-freelancer">Manage Freelancers</Link></li>
            <li><Link to="/myjobs">My Jobs</Link></li>
            <li><Link to="/employeer-profile">My Profile</Link></li>
          
            
            <li className="left-br">
            {
                  (UserContext.user === null) ? (
                    <button
                    data-toggle="modal"
                    data-target="#signup"
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In / Sign up
                  </button>
                    
                  ) : (
                    <Link className="signin" to="/logout">
                    Logout
                  </Link>
                  )}
            </li>
            </ul>
           
        </div>
    </div>
</nav>
  );

 }
  return (
    <div>
      <div className="wrapper">
        <nav className="navbar navbar-default navbar-fixed navbar-transparent  bootsnav">
          <div className="container ">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
            >
              <i className="fa fa-bars"></i>
            </button>
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <img src={logoWhite} className="logo logo-display" alt="" />
                
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul
                className="nav navbar-nav navbar-right"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <li className="">
                 
                  {
                  (UserContext.user === null) ? (
                    <button
                    data-toggle="modal"
                    data-target="#signup"
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                  >
                    Sign In / Sign up
                  </button>
                    
                  ) : (
                    <Link className="signin" to="/logout">
                    Logout
                  </Link>
                  )}
                </li>
              </ul>
              <ul
                className="nav navbar-nav navbar-right"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              ></ul>
            </div>
          </div>
        </nav>
        <div className="clearfix"></div>
      </div>
      <div className="clearfix"></div>
      {showModal && (
        <div
          className="modal "
          id="signup"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="tab" role="tabpanel">
                  <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                      <Link to="#login" role="tab" data-toggle="tab">
                        Sign In
                      </Link>
                    </li>
                    <li role="presentation">
                      <Link to="#register" role="tab" data-toggle="tab">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content" id="myModalLabel2">
                    <div
                      role="tabpanel"
                      className="tab-pane  in active"
                      id="login"
                    >
                      <img src={logoblack} className="img-responsive" alt="" />

                      <div className="subscribe wow fadeInUp">
                        <form
                          className="form-inline"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="col-sm-12">
                            <div className="form-group">
                              <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                required=""
                              />
                              <input
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                placeholder="Password"
                                required=""
                              />

                              <div className="center">
                                <button
                                  type="submit"
                                  id="login-btn"
                                  onClick={handleLogin}
                                  className="submit-btn"
                                >
                                  Login
                                </button>
                              </div>
                            
                            </div>
                          </div>
                          <ToastContainer />
                        </form>
                      </div>
                    </div>
                    <div
                      role="tabpanel"
                      className="tab-pane fade"
                      id="register"
                    >
                      <img src={logoblack} className="img-responsive" alt="" />

                      <form className="form-inline" method="post"  onSubmit={(e) => e.preventDefault()}>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              placeholder="First Name"
                             onChange={(e)=>setFirst_name(e.target.value)}
                              required=""
                            />
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              placeholder="Last Name"
                              onChange={(e)=>setLast_name(e.target.value)}
                              required=""
                            />
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              onChange={(e)=>setEmail(e.target.value)}
                              required=""
                            />
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              placeholder="Username"
                              onChange={(e)=>setUsername(e.target.value)}
                              required=""
                            />
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Password"
                              onChange={(e)=>setPassword(e.target.value)}
                              required=""
                            />
                            <label>Select Role</label>
                            <select className="form-control" onChange={(e)=>setRole(e.target.value)}>
                              <option>Freelancer</option>
                              <option>Employeer</option>
                            </select>
                            

                            <div className="center">
                              <button
                                type="submit"
                                id="subscribe"
                                className="submit-btn"
                                onClick={handelSingup}
                              >
                                Create Account
                              </button>
                            </div>
                          </div>
                        </div>
                        
                      </form>
                     
                        <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
