import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import update from '../../update';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../../Context/userContext';
import { Link } from 'react-router-dom';
// import ViewVoucher from './ViewVoucher';
// 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const SingleVoucher = (props) => {
    const id=localStorage.getItem('id');
    const navigate=useNavigate();
    const context=useContext(userContext);
    
    const {vouchers,getAllVochers,deleteVoucher}=context;
    const handleForward=async (e)=>{
        console.log(props.voucher_id);
        e.preventDefault();
        // const status=update(props.voucher_id);
        const user_id=localStorage.getItem('id');
        let success='false';
        await axios.put(`http://localhost:5000/voucher/forwardto/${props.voucher_id}`,{},
        {
            headers:{
                'id':user_id
            }
        })
        .then((res)=>{
            console.log(res.data.success);
            if(res.data.success===true){
                toast.success("Updated Successfully");
                window.location.reload(false);
            }
        })
        .catch((err)=>{
            console.log(err);
        })


        // console.log(status);
        
    } 

    // const handleView=(e)=>{
    //     e.preventDefault();
    //     axios.get(`http://localhost:5000/voucher/getVocherId/${props.voucher_id}`,{
    //         headers:{
    //             'id':id
    //         }
    //     })
    //     .then((res)=>{
            
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    const handleDelete=(e)=>{
        e.preventDefault();
        console.log(props.voucher_id);
        deleteVoucher(props.voucher_id);
    }

    const [view,setView]=useState(false);
    const handleView=(e)=>{
      e.preventDefault();
      setView(true);
    }

    const userData = {voucher_id:props.voucher_id,name_of_the_particulars:props.name_of_the_particulars,purpose_of_voucher:props.purpose_of_voucher,person_name:props.person_name,date:props.date,amount:props.amount,remarks:props.remarks,image:props.image};
    return (
        <>
      <tr>
        <td style={{ borderBottom: '1px solid #ddd', padding: '10px 5px', textAlign: 'left' }}>{props.index + 1}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.voucher_id}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.name_of_the_particulars}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.person_name}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.purpose_of_voucher}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.date}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.amount}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.remarks}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>
          {props.person === '0' ? (
            <>
              <Link to='/staff/edit-voucher' state={userData}><button className="btn btn-warning" style={{ marginRight: '7px' }}>Edit</button></Link>
              <button className="btn btn-danger" style={{ marginRight: '7px' }} onClick={handleDelete}>Delete</button>
              <button className="btn btn-primary" onClick={handleForward} style={{ marginRight: '7px' }}>Forward to GM</button>
              <button className="btn btn-success" onClick={() => setView(true)}>View</button>
              {view && (
                  <Popup open={view} contentStyle={{height:'100%',borderRadius:'20px'}}>   
                      <div style={{width:'50%',margin:'70px auto'}}>    
                      <h1 style={{textAlign:'center',marginBottom:'15px'}}>Voucher Details</h1>    
                          <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Voucher Id:  </span>{props.voucher_id}</p>
                          <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Name of Particulars:  </span>{props.name_of_the_particulars}</p>
                          {props.image===""?<img alt='No image provided' />:<img src={require(`../../images/${props.image}`)} alt="No image Provided" style={{width:'600px',display:'block',height:'600px'}} />}
                          <div style={{marginTop:'15px'}}>
                            <Link to='/staff/edit-voucher' state={userData}><button className='btn btn-warning' style={{ marginRight: '7px' }}>Edit</button></Link>
                            <button className="btn btn-danger" style={{ marginRight: '7px' }} onClick={handleDelete}>Delete</button>
                            <button onClick={() => setView(false)} className='btn btn-primary'>Close modal</button>
                          </div>
                        </div>
                  </Popup>
              )}
            </>
          ) : (
            <p>Forwarded to GM</p>
          )}
        </td>
      </tr>
    </>
    )
}

export default SingleVoucher
{/* <div>
<tr key={props.id}>
              <td>{props.index + 1}</td>
              <td>{props.voucher_id}</td>
              <td>{props.name_of_the_particulars}</td>
              <td>{props.person_name}</td>
              <td>{props.purpose_of_voucher}</td>
              <td>{props.date}</td>
              <td>{props.amount}</td>
              <td>{props.remarks}</td>
              <td>
                  {props.person==='0'?<button className="btn btn-warning" style={{marginRight:'7px'}} onClick={handleEdit}>Edit</button>:<></>}
                  {props.person==='0'?<button className="btn btn-danger" style={{marginRight:'7px'}} onClick={handleDelete}>Delete</button>:<></>}
                  {props.person==='0'?<button className="btn btn-primary" onClick={handleForward}>Forward to GM</button>:<></>}
              </td>
          </tr>
          <ToastContainer />
</div> */}