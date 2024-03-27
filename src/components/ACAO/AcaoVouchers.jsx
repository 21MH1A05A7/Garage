import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import SingleVoucher from './SingleVoucher'
import userContext from '../../Context/userContext';
import { useContext } from 'react'
import OfficialVoucher from '../OfficialVoucher';
import AcaoVoucher from '../../AcaoVoucher';
import AcaoValidate from '../../AcaoValidate';

const AcaoVouchers = () => {
    const navigate=useNavigate();
    const [vocherData,setData]=useState([])
    const context=useContext(userContext);
    // console.log(context);
    const {vouchers,getAllVochers,deleteVoucher,officialVoucher,officialvouchersList,AcaoVoucherfunc,acaoVoucherlist}=context;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const id = localStorage.getItem('id');
          const data = await AcaoValidate(id);
          if (!data.data.data){
              navigate('/acao-login');
          }
            // write the context
            
            // console.log(officialvouchersList);
            // setData(vouchers);
            AcaoVoucherfunc();
            console.log(acaoVoucherlist);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

  return (
    <div style={{ maxWidth: '200rem' }}>
    <h2 style={{ marginBottom: '20px' }}>Voucher List</h2>
    <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left' }}>S.NO</th>
                <th style={{ padding: '10px 8px', textAlign: 'left' }}>Voucher id</th>
                <th style={{  padding: '10px 8px', textAlign: 'left' }}>Name of the particulars</th>
                <th style={{  padding: '10px 8px', textAlign: 'left' }}>Person name</th>
                <th style={{  padding: '10px 8px', textAlign: 'left' }}>Purpose of voucher</th>
                <th style={{  padding: '10px 15px', textAlign: 'left' }}>Date</th>
                <th style={{  padding: '10px 8px', textAlign: 'left' }}>Amount</th>
                <th style={{  padding: '10px 10px', textAlign: 'left'}}>Remarks</th>
                <th style={{  padding: '10px 8px', textAlign: 'left' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {acaoVoucherlist.map((voucher, index) => (
                // <OfficialVoucher voucher_id={voucher.voucher_id} person_name={voucher.person_name} name_of_the_particulars={voucher.name_of_the_particulars} purpose_of_voucher={voucher.purpose_of_voucher} date={voucher.date} amount={voucher.amount} remarks={voucher.remarks} index={index} person={voucher.person}/>
                // <h1>{voucher.person_name}</h1>
                <AcaoVoucher voucher_id={voucher.voucher_id} person_name={voucher.person_name} name_of_the_particulars={voucher.name_of_the_particulars} purpose_of_voucher={voucher.purpose_of_voucher} date={voucher.date} amount={voucher.amount} remarks={voucher.remarks} index={index} person={voucher.person} image={voucher.image}/>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default AcaoVouchers
