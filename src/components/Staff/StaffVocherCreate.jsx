import React, { useState } from 'react';
import './generate_voucher.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import valid from '../../valid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StaffVocherCreate() {
  const [formData, setFormData] = useState({
    name_of_the_particulars: '',
    person_name: '',
    purpose_of_voucher: '',
    date: '',
    amount: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if(formData.name_of_the_particulars==='' || formData.person_name==='' || formData.purpose_of_voucher==='' || formData.date==='' || formData.amount==='' || formData.remarks===''){
        toast.error("Please Enter the data");
    }
    else{
        const user_id=localStorage.getItem('id');
    console.log(user_id);
    axios.post("http://localhost:5000/voucher/addData",formData,{
        headers:{
            'id':user_id
        }
    })
    .then((res)=>{
        toast.success("Successfuly added");
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    }
    
  };


  const navigate=useNavigate();
  useEffect(() => {
      const fetchData = async () => {
          const id = localStorage.getItem("id");
          const data = await valid(id);
        //   console.log(data.data.data);
        console.log(data);
          if (!data.data.data) {
            navigate('/staff-login');
          }
      }
      fetchData(); // Call the inner async function
  }, [])


  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-3">Voucher Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="particulars" className="form-label">Name of the Particulars:</label>
            <input type="text" id="particulars" name="name_of_the_particulars" className="form-control"  onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="personName" className="form-label">Person Name:</label>
            <input type="text" id="personName" name="person_name" className="form-control" onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="purposeOfVoucher" className="form-label">Purpose of Voucher:</label>
            <input type="text" id="purposeOfVoucher" name="purpose_of_voucher" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="date" className="form-label">Date:</label>
            <input type="date" id="date" name="date" className="form-control"  onChange={handleChange} />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <label htmlFor="amount" className="form-label">Amount:</label>
            <input type="text" id="amount" name="amount" className="form-control" onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="remarks" className="form-label">Remarks:</label>
            <textarea id="remarks" name="remarks" className="form-control" onChange={handleChange}></textarea>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default StaffVocherCreate;