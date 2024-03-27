import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import valid from '../../Validate/valid';


const StaffVocherStatus = () => {
    const [vocherid,setid]=useState('');    
    const navigate=useNavigate();
    const [voucherData,setData]=useState({});
    const [success,setsucess]=useState('false');
    const [atwhom,setwhom]=useState('');
    const display=(e)=>{
        e.preventDefault();
        if(vocherid===''){
          toast.error("Enter the id");
        }
        else{
          const id=localStorage.getItem('id');
        axios.get(`http://localhost:5000/voucher/getVocherId/${vocherid}`,{
          headers:{
            id:id
          }
        })
        .then((res)=>{
          console.log(res.data.success);
          if(res.data.success===true){
            console.log(res.data.data[0]);
            const f=res.data.data[0];
            setsucess('true');
            
            if(f.person==='0'){
              setwhom('Still Pending to Send');
            }
            else if(f.person==='1'){
              setwhom('Forwarded to GM');
            }
            else if(f.person==='2'){
              setwhom('Forwarded to ACAO');
            }
            else if(f.person==='3'){
              setwhom('Forwarded to VC');
            }  
            else{
              setwhom('Forwarded to Cashier');
            }
            setData(f);
          }
          else{
            setsucess('false');
            toast.error('No data Found');
          }

        })
        .catch((err)=>{
          console.log(err);
        })
        }
    }
    useEffect(() => {
      const fetchData = async () => {
          const id = localStorage.getItem("id");
          const data = await valid(id);
          // console.log(data.data.data);
          if (!data.data.data) {
              navigate('/staff-login');
          }
      }
      fetchData();
  }, [])
    //Write the table in component format
  return (
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <form action="/voucherStatus" style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter Voucher ID"
            name="voucherid"
            onChange={(e) => setid(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button
            onClick={display}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
        {success === 'true' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>S.NO</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Voucher ID</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Name of the Particulars</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Person Name</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Purpose of Voucher</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Date</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Amount</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Remarks</th>
                <th style={{ borderBottom: '1px solid #ddd',  padding: '10px 8px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>1</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.voucher_id}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.name_of_the_particulars}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.person_name}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.purpose_of_voucher}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.date}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.amount}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{voucherData.remarks}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{atwhom}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <h3>No Data Found</h3>
        )}
        <ToastContainer />
      </div>
    
  )
}

export default StaffVocherStatus
{/* <div>
        <form action="/voucherStatus" >
            <input type="text" placeholder='Enter Voucherid' name="voucherid" onChange={(e) => setid(e.target.value)}/>
            <button onClick={display}>Submit</button>
            {success==='false'?<h3>No Data Found</h3>:<><table className="table table-striped">
        <thead>
            <tr>
                <th>S.NO</th>
                <th>Voucher id</th>
                <th>Name of the particulars</th>
                <th>Person name</th>
                <th>Purpose of voucher</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Remarks</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
             
                <tr key={voucherData.id}>
                    <td>{voucherData.voucher_id}</td>
                    <td>{voucherData.name_of_the_particulars}</td>
                    <td>{voucherData.person_name}</td>
                    <td>{voucherData.purpose_of_voucher}</td>
                    <td>{voucherData.date}</td>
                    <td>{voucherData.amount}</td>
                    <td>{voucherData.remarks}</td>
                    <td>
                        <button className="btn btn-primary" style={{marginRight:'7px'}}>View</button>
                        <button className="btn btn-warning" style={{marginRight:'7px'}}>Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
        </tbody>
    </table></>}
    <ToastContainer />
        </form>
    </div> */}