
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import valid from '../../valid';
// Teja , Ganesh , Sudheeer  templateeeeeee HEREEEEEE



const StaffHome = () => {
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem("id");
            const data = await valid(id);
            console.log(data.data.data);
            if (!data.data.data) {
                navigate('/staff-login');
            }
        }
        fetchData(); // Call the inner async function
    }, [])
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.removeItem('id');
    navigate('/staff-login');
  }
  return (
    <div>
      <h1>Staff Home</h1>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  )
}

export default StaffHome
{/* <h1></h1> */}