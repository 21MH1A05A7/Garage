
import React, { useState } from 'react';
import './register.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import official_validate from  '../../official_validate'
import gmValidate from '../../gmValidate';


const Register = () => {
  const [registerdata,setregisterdata] = useState({
    name:'',
    username:'',
    password:'',

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(registerdata.name===""){
      toast.error('Please fill the Name');
    }
    else if(registerdata.username===""){
      toast.error('Please fill the Username');
    }
    else if(registerdata.password===""){
      toast.error('Please fill the Password');
    }
    else{
        axios.post("http://localhost:5000/staffauth/register",registerdata)
        .then((res)=>{ 
            console.log(res);
            toast.success("Successfully Registered");
        })  
        .catch((err)=>{
            toast.error("An error has Occured");
        })
    }


  };
  const navigate = useNavigate();
  // useEffect(async ()=>{
  //   const data=localStorage.getItem("id");
  //   const d=await gmValidate(data);
  //   const success=d.data.success;
  //   console.log(success); 
  //   if(success===true){
  //       navigate("/gm/staff-register");
  //   }
  //   else{
  //       navigate("/Gm-login ");
  //   }
  // },[])
  useEffect(() => {
    const fetchData = async () => {
        const id = localStorage.getItem('id');
        const data = await gmValidate(id);
        // console.log(data.data.data);
        if (!data.data.data) {
            navigate('/Gm-login');
        }
        else{
            navigate('/Gm/staff-register');   
        }
    }
    fetchData();
}, [])

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Staff Registration</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={registerdata.name}
            onChange={(e) => setregisterdata({ ...registerdata, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            value={registerdata.username}
            onChange={(e) => setregisterdata({...registerdata,username:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            value={registerdata.password}
            onChange={(e) => setregisterdata({...registerdata,password:e.target.value})}
          />
          <input type="submit" value="Register" />
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Register;