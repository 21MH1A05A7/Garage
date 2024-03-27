import React, { useEffect, useState } from 'react';
import './staff.login.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Gm_icon from '../assets/GM.jpeg';
import Cash_icon from '../assets/Cashier.jpeg'
import Staff from '../assets/Staff.jpeg';
import Vc from '../assets/VC.jpeg';



const Staff_login = () => {

  const navigate=useNavigate();

  const [logindata,setlogindata] = useState({
    username:'',
    password:'',
    type:'0'
  });

  const handleLogin = (e) => {
    e.preventDefault()
    // console.log("hi");
    if(logindata.username===""){
      toast.error("Please fill the Username")
    }
    else if(logindata.password===''){
      toast.error("Please fill the Password")
    }
    else{
      console.log(logindata)
      //api  
      axios.post("http://localhost:5000/staffauth/login",logindata)
      .then(async (res)=>{
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
            localStorage.setItem("id",id);
            toast.success("Successfully logged in");
            console.log("Successfully logged in");
            navigate('/staff');
        }
    })
    .catch((err)=>{
        console.log("Api Cannot be Fetched");
    })
    }
  };

  // useEffect(()=>{
  //   const id=localStorage.getItem('id');
  //   if(id){
  //     navigate('/staff');
  //   }
  // },[])

  return (
    <div className="login-page">
      <div className="login-container">
        <h2> Staff Login</h2>
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
                  <Link to='/Gm-login'><img alt="GM" src={Gm_icon}/></Link>
                  <span className="GM">GM</span>
                </div>
              <div className="login-option">
                <Link to='/acao-login'><img  alt="ACAO" src={Staff}/></Link>
                <span>ACAO</span>
              </div>
              <div className="login-option">
                <Link to='/vc-login'><img  alt="VC" src={Vc}/></Link>
                <span>VC</span>
              </div>
              <div className="login-option">
                <Link to='/cashier-login'><img alt="Cashier" src={Cash_icon}/></Link>
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

export default Staff_login;