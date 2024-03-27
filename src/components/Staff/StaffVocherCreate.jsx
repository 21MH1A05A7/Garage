import React, { useState } from 'react';
import './generate_voucher.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import valid from '../../Validate/valid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function StaffVocherCreate() {
  const [file,setFile]=useState('');
  const [formData, setFormData] = useState({
    name_of_the_particulars: '',
    person_name: '',
    purpose_of_voucher: '',
    date: '',
    amount: '',
    remarks: '',
    image:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(file){
      const Form=new FormData();
    Form.append("image",file);

    const data=await axios.post('http://localhost:5000/upload',Form,{
      headers:{
          "Content-Type":"multipart/form-data"
      },
  })
  .then((res)=>{
    formData.image=res.data;
  })
  console.log(formData);
    }
    

    // console.log(formDatawithimage);

    // Handle form submission logic here
    // console.log(formData);

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
      window.location.reload(false);
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
    }
  };

 
  
  const handlefileChange=(e)=>{
    e.preventDefault();
    setFile(e.target.files[0]);
  }

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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>Voucher Form</h2>
      <form onSubmit={handleSubmit} style={{ margin: '0 auto' }}>
        <div className="mb-3">
          <label htmlFor="particulars" className="form-label">Name of the Particulars:</label>
          <input type="text" id="particulars" name="name_of_the_particulars" className="form-control" onChange={handleChange} style={{ width:'30rem',borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="personName" className="form-label">Person Name:</label>
          <input type="text" id="personName" name="person_name" className="form-control" onChange={handleChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="purposeOfVoucher" className="form-label">Purpose of Voucher:</label>
          <input type="text" id="purposeOfVoucher" name="purpose_of_voucher" className="form-control" onChange={handleChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="date" id="date" name="date" className="form-control" onChange={handleChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Amount: </label>
          <input type="text" id="amount" name="amount" className="form-control" onChange={handleChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Image :</label>
          <input type="file" id="amount" name="amount" className="form-control" onChange={handlefileChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="mb-5">
          <label htmlFor="remarks" className="form-label">Remarks:</label>
          <textarea id="remarks" name="remarks" className="form-control" onChange={handleChange} style={{ borderRadius: '5px', border: '1px solid #ccc' }}></textarea>
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
          <Link to='/staff'><button className='btn btn-primary' style={{backgroundColor:'black',borderBlockStyle:'none',marginLeft:'10%',padding: '10px 20px'}}>Back to Home</button></Link>
        </div>
      </form>
      <ToastContainer />
      
    </div>
  );
}

export default StaffVocherCreate;



