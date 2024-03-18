import React, { useState } from 'react';
import './staff.login.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Vc_login = () => {
  
    const [logindata,setlogindata] = useState({
    username:'',
    password:'',
    type:'3'
  });

  const handleLogin = (e) => {
    e.preventDefault()
    if(logindata.username===""){
      toast.error("Please fill the Username")
    }
    else if(logindata.password===''){
      toast.error("Please fill the Password")
    }
    else{
        axios.post("http://localhost:5000/staffauth/login",logindata)
        .then((res)=>{
          console.log(res);
          const data=res.data;
          // console.log(data);
          if(data.success===false){
              toast.error("Check the Credentials");
          }
          else{
              const id=res.data.DB_User._id;
              console.log(id);
              // navigate
              toast.success("Successfully logged in");
              console.log("Successfully logged in");
              // Navigate('/');
          }
      })
      .catch((err)=>{
          console.log("Api Cannot be Fetched");
      })
      }
    }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2> VC  Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={logindata.username}
            onChange={(e) => setlogindata({...logindata,username:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            value={logindata.password}
            onChange={(e)=> setlogindata({...logindata,password:e.target.value})}
          />
          <input type="submit" value="Login" />

          <div className="login-options">
            <h3>Login As</h3>
            <div className="login-options-grid">
              <div className="login-option">
                <Link to='/'><img alt="GM" /></Link>
                <span>Staff</span>
              </div>
              <div className="login-option">
                <Link to='/Gm-login'><img alt="ACAO" /></Link>
                <span>GM</span>
              </div>
              <div className="login-option">
                <Link to='/acao-login'><img alt="VC" /></Link>
                <span>ACAO</span>
              </div>
              <div className="login-option">
                <Link to='/cashier-login'><img alt="Cashier" /></Link>
                <span>Cashier</span>
              </div>
            </div>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Vc_login;