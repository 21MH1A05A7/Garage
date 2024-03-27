
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import valid from '../../Validate/valid';
// Teja , Ganesh , Sudheeer  templateeeeeee HEREEEEEE
import { Link } from 'react-router-dom';
import gmValidate from '../../gmValidate';


const GMHome = () => {
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('id');
            const data = await gmValidate(id);
            // console.log(data.data.data);
            if (!data.data.data) {
                navigate('/Gm-login');
            }
            else{
                navigate('/Gm');   
            }
        }
        fetchData();
    }, [])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.removeItem('id');
    navigate('/Gm-login');
  }

  return (
    <div>
      <h1>Gm Home</h1>
      <button onClick={handleSubmit} style={{
      backgroundColor: '#ffa500', // Green
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '10px'
    }}>Logout</button>
      <Link to="/Gm/view-vouchers"><button style={{
      backgroundColor: '#4CAF50', // Green
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '10px'
    }}>Show Vouchers</button></Link>
      <Link to="/Gm/voucher-status"><button  style={{
      backgroundColor: '#4CAF50', // Green
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '10px'
    }}>Status</button></Link>
    </div>
  )
}

export default GMHome