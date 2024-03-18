import React from 'react'
import axios from 'axios'
import { useState } from 'react';




const StaffVocherStatus = () => {
    const [vocherid,setid]=useState('');    
    const display=(e)=>{
        e.preventDefault();        
    }

  return (
    <div>
        <form action="/voucherStatus" onClick={display}>
            <input type="text" placeholder='Enter Voucherid' name="voucherid" onChange={(e) => setid(e.target.value)}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default StaffVocherStatus
