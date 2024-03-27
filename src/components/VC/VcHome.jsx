import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import valid from '../../Validate/valid';
// Teja , Ganesh , Sudheeer  templateeeeeee HEREEEEEE
import { Link } from 'react-router-dom';
import VcValidate from '../../VcValidate';


const VcHome = () => {
    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('id');
            const data = await VcValidate(id);
            if (!data.data.data) {
                navigate('/vc-login');
            }
            else{
                navigate('/vc');   
            }
        }
        fetchData();
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault();
        localStorage.removeItem('id');
        navigate('/vc-login');
    }

  return (
    <div>
        <h1>VC Home</h1>
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
        <Link to="/vc/view-vouchers"><button style={{
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
    }} >Show Vouchers</button></Link>
       
  </div>
  )
}

export default VcHome
