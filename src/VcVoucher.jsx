import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Popup from 'reactjs-popup';


const VcVoucher = (props) => {

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
    }
    const [view,setView]=useState(false);
    const handleView=(e)=>{
      e.preventDefault();
      setView(true);
    }
  

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
        {props.person === '3' ? (
          <>
            <button className="btn btn-primary" onClick={handleForward} style={{marginRight:'6px'}}>Forward to Cashier</button>
            <button className="btn btn-danger" onClick={() => setView(true)} style={{marginRight:'5px'}}>View</button>
              
              {view && (
                  <Popup open={view} contentStyle={{height:'100%',borderRadius:'20px'}}>   
                      <div style={{width:'50%',margin:'70px auto'}}>    
                      <h1 style={{textAlign:'center',marginBottom:'15px'}}>Voucher Details</h1>    
                          <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Voucher Id:  </span>{props.voucher_id}</p>
                          <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Name of Particulars:  </span>{props.name_of_the_particulars}</p>
                          {props.image===""?<img alt='No image provided' />:<img src={require(`./images/${props.image}`)} alt="No image Provided" style={{width:'600px',display:'block',height:'600px'}} />}
                          <div style={{marginTop:'15px'}}>
                            <button onClick={() => setView(false)} className='btn btn-primary'>Close modal</button>
                          </div>
                        </div>
                  </Popup>
              )}
          </>
        ) : (
          <>
            <p style={{display:'inline-block',marginRight:'7px'}}>Forwarded to Cashier</p>
            <button className="btn btn-success" onClick={() => setView(true)} style={{marginRight:'5px'}}>View</button>
            {view && (
              <Popup open={view} contentStyle={{height:'100%',borderRadius:'20px'}}>   
                  <div style={{width:'50%',margin:'70px auto'}}>    
                  <h1 style={{textAlign:'center',marginBottom:'15px'}}>Voucher Details</h1>    
                      <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Voucher Id:  </span>{props.voucher_id}</p>
                      <p><span style={{fontSize:'20px',fontWeight:'bold'}}>Name of Particulars:  </span>{props.name_of_the_particulars}</p>
                      {props.image===""?<img alt='No image provided' />:<img src={require(`./images/${props.image}`)} alt="No image Provided" style={{width:'600px',display:'block',height:'600px'}} />}
                      <div style={{marginTop:'15px'}}>
                        <button onClick={() => setView(false)} className='btn btn-primary'>Close modal</button>
                      </div>
                    </div>
              </Popup>
          )}
          </>
        )}
      </td>
    </tr>
  
  </>
  )
}

export default VcVoucher
