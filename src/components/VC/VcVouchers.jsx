import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../../Context/userContext';
import VcVoucher from '../../VcVoucher';
import { useState } from 'react';
import { useEffect } from 'react';

const VcVouchers = () => {
    const navigate=useNavigate();
    const [vocherData,setData]=useState([])
    const context=useContext(userContext);
    const {vouchers,getAllVochers,deleteVoucher,officialVoucher,officialvouchersList,AcaoVoucherfunc,acaoVoucherlist,VcVoucherfunc,VcVoucherList}=context;


    useEffect(() => {
        const fetchData = async () => {
          try {
            const id = localStorage.getItem('id');
            if (!id) {
              navigate('/vc-login');
              return;
            }
            VcVoucherfunc();
            console.log(VcVoucherList);
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
            {VcVoucherList.map((voucher, index) => (
                <VcVoucher voucher_id={voucher.voucher_id} person_name={voucher.person_name} name_of_the_particulars={voucher.name_of_the_particulars} purpose_of_voucher={voucher.purpose_of_voucher} date={voucher.date} amount={voucher.amount} remarks={voucher.remarks} index={index} person={voucher.person} image={voucher.image} />
            ))}
        </tbody>
    </table>
</div>
  )
}

export default VcVouchers
