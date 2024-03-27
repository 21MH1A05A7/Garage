import React, { useState } from 'react';
import './staff.login.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Gm_icon from '../assets/GM.jpeg';
import Cash_icon from '../assets/Cashier.jpeg'
import Staff from '../assets/Staff.jpeg';
import Vc from '../assets/VC.jpeg';



const Cashier_login = () => {
  const navigate=useNavigate();
    const [logindata,setlogindata] = useState({
    username:'',
    password:'',
    type:'4'
  });

  const handleLogin = (e) => { 
    e.preventDefault()
    if(logindata.username===""){
      toast.error("Please fill the Username");
    }
    else if(logindata.password===''){
      toast.error("Please fill the Password");
    }
    else{
        axios.post("http://localhost:5000/officials/login",logindata)
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
              localStorage.setItem("id",id);
              toast.success("Successfully logged in");
              console.log("Successfully logged in");
              navigate('/cashier');
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
  //     navigate('/cashier');
  //   }
  // },[])

  return (
    <div className="login-page">
      <div className="login-container">
        <h2> Cashier  Login</h2>
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
                <Link to='/staff-login'><img alt="staff" src={Staff} /></Link>
                <span>Staff</span>
              </div>
              <div className="login-option">
                <Link to='/Gm-login'><img alt="GM" src={Gm_icon}/></Link>
                <span>GM</span>
              </div>
              <div className="login-option">
                <Link to='/acao-login'><img alt="ACOA" src={Vc}/></Link>
                <span>ACAO</span>
              </div>
              <div className="login-option">
                <Link to='/vc-login'><img alt="vc" src={Cash_icon}/></Link>
                <span>VC</span>
              </div>
            </div>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Cashier_login;