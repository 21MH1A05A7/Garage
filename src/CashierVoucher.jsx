import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from './Context/userContext';

const CashierVoucher = (props) => {

    const context=useContext(userContext);
    // const  set Cashier info
    const {vouchers,getAllVochers,deleteVoucher,officialVoucher,officialvouchersList,AcaoVoucherfunc,acaoVoucherlist,VcVoucherfunc,VcVoucherList,setFunc}=context;


    const handleForward=async (e)=>{
        console.log(props.voucher_id);
        e.preventDefault();
        const date=new Date();
        const day=date.getDate();
        const month=date.getMonth()+1;
        const year=date.getFullYear();
        const str=day+"/"+month+"/"+year;
        
        const user_id=localStorage.getItem('id');
        let success='false';
        const d={
            date:str
        }
        // console.log(d);

        await axios.put(`http://localhost:5000/voucher/setpaidOn/${props.voucher_id}`,d,
        {
            headers:{
                'id':user_id
            }
        })
        .then((res)=>{
            setFunc(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }



  return (
<>
    <tr key={props.id}>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 5px', textAlign: 'left' }}>{props.index + 1}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.voucher_id}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.name_of_the_particulars}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.person_name}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.purpose_of_voucher}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.date}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.amount}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>{props.remarks}</td>
        <td style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>
                      {props.paid_on===undefined?<button className="btn btn-primary" onClick={handleForward}>Paid</button>:<p>{props.paid_on}</p>}
                </td>
              </tr>
              <ToastContainer />
  </>
  )
}

export default CashierVoucher
