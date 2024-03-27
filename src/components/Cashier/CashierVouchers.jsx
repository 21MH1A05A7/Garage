import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import SingleVoucher from './SingleVoucher'
import userContext from '../../Context/userContext';
import { useContext } from 'react'
import CashierVoucher from '../../CashierVoucher';
import CashierValidate from '../../CashierValidate';

const CashierVouchers = () => {
    const navigate=useNavigate();
    const context=useContext(userContext);
    const {vouchers,getAllVochers,deleteVoucher,officialVoucher,officialvouchersList,AcaoVoucherfunc,acaoVoucherlist,VcVoucherfunc,VcVoucherList,CashierVoucherfunc,cashierVoucherList}=context;

    useEffect(() => {
        const fetchData = async () => {
          try {
            const id = localStorage.getItem('id');
            const data = await CashierValidate(id);
            if (!data.data.data){
                navigate('/cashier-login');
            }
            CashierVoucherfunc();
            console.log(cashierVoucherList[0]);
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
            {cashierVoucherList.map((voucher, index) => (
                <CashierVoucher voucher_id={voucher.voucher_id} person_name={voucher.person_name} name_of_the_particulars={voucher.name_of_the_particulars} purpose_of_voucher={voucher.purpose_of_voucher} date={voucher.date} amount={voucher.amount} remarks={voucher.remarks} index={index} person={voucher.person} paid_on={voucher.paid_on} />
            ))}
        </tbody>
    </table>
</div>
  )
}

export default CashierVouchers
