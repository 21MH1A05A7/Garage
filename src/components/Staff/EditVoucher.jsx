import React from 'react'
import { useState } from 'react';
// import { Toast } from 'react-toastify/dist/components';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const EditVoucher = (props) => {
    const location=useLocation();
    const navigate=useNavigate();
    const [file,setFile]=useState('');
    const id=localStorage.getItem('id');
    const d={
        name_of_the_particulars: location.state.name_of_the_particulars,
        person_name: location.state.person_name,
        purpose_of_voucher: location.state.purpose_of_voucher,
        date: location.state.date,
        amount: location.state.amount, 
        remarks: location.state.remarks,
        image:location.state.image
      };
      // console.log(d);
      const[data,setdata]=useState(d);
    //   console.log(location.state.voucher_id);
      const handleChange=(e)=>{
        e.preventDefault();
        setdata({...data,[e.target.name]:e.target.value});
      }

      const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(file);
        if(file){
          const formData=new FormData();
          formData.append("image",file);
          // console.log(formData);
          const result=await axios.post('http://localhost:5000/upload',formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
          })
          // d.image=data.data;
          data.image=result.data;
          console.log(data);
        }
          
        
        
        await axios.put(`http://localhost:5000/voucher/editVocher/${location.state.voucher_id}`,data,{headers:{
            'id':id
        }})
        
        .then((res)=>{
            toast.success('updated Successfully');
            // navigate('/staff/view-vouchers');
        })
        
      }
      
      const handlefileChange=(e)=>{
        e.preventDefault();
        setFile(e.target.files[0]);
      }


  return (
<div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>Voucher Form</h2>
      <form onSubmit={handleSubmit} style={{ margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="particulars" className="form-label">Name of the Particulars:</label>
          <input value={data.name_of_the_particulars} type="text" id="particulars" name="name_of_the_particulars" className="form-control" style={{ width:'30rem',borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="personName" className="form-label">Person Name:</label>
          <input value={data.person_name} type="text" id="personName" name="person_name" className="form-control" style={{ borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="purposeOfVoucher" className="form-label">Purpose of Voucher:</label>
          <input value={data.purpose_of_voucher} type="text" id="purposeOfVoucher" name="purpose_of_voucher" className="form-control" style={{ borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input  value={data.date} type="date" id="date" name="date" className="form-control"  style={{ borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount:</label>
          <input value={data.amount} type="text" id="amount" name="amount" className="form-control" style={{ borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Image :</label>
          <input type="file" id="amount" name="amount" className="form-control" onChange={handlefileChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-5">
          <label htmlFor="remarks" className="form-label">Remarks:</label>
          <textarea value={data.remarks} id="remarks" name="remarks" className="form-control"  style={{ borderRadius: '5px', border: '1px solid #ccc' }} onChange={handleChange} />
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}   

export default EditVoucher
