import React from 'react'

const ViewVoucher = (props) => {
  return (props.trigger)?(
    <div>
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
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.voucher_id}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.name_of_the_particulars}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.person_name}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.purpose_of_voucher}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.date}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.amount}</td>
    <td style={{ borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'left' }}>{props.remarks}</td>
  </tr>
  <img src={require(`../../images/${props.image}`)} alt="" style={{width:'100%'}}/>
</tbody>
</table> 
{props.children}
    </div>
    
  ):""
}

export default ViewVoucher;

