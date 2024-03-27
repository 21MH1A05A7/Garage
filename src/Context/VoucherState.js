import React,{useState} from "react";
import userContext from "./userContext";
import axios from "axios";


function VoucherState(props){

    const [vouchers,setvouchers]=useState([]);
    const [officialvouchersList,setoffvouchers]=useState([]);
    const [acaoVoucherlist,setacao]=useState([]);

    const [VcVoucherList,setvc] = useState([]);
    const [cashierVoucherList,setcashier]=useState([]);
    const id=localStorage.getItem('id');
    // console.log(id);
    const getAllVochers=async ()=>{
        const response = await axios.get('http://localhost:5000/voucher/getVochers',{
          headers: {
            'id': id
          }
        });
        console.log(response.data.data[0]);
        setvouchers(response.data.data);
    }


    const deleteVoucher=async(voucher_id)=>{

        const id=localStorage.getItem('id');
        // console.log(voucher_id);
        await axios.delete(`http://localhost:5000/voucher/deleteVoucher/${voucher_id}`,{
            headers:{
                'id':id
            }
        })
        .then((response)=>{
            // console.log(response.data.data[0]);
            setvouchers(response.data.data); 
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const officialVoucher=async()=>{
        const id=localStorage.getItem('id');
        const response = await axios.get('http://localhost:5000/voucher/getAllGmVochers');
        // console.log(response.data[0]);
        setoffvouchers(response.data);
    }

    const AcaoVoucherfunc=async()=>{
        const id=localStorage.getItem('id');
        const response= await axios.get('http://localhost:5000/voucher/getAllAcaoVochers');
        // console.log(response.data);
        setacao(response.data);
    }
    const VcVoucherfunc=async()=>{
        const id=localStorage.getItem('id');
        const response= await axios.get('http://localhost:5000/voucher/getAllVcVochers');
        setvc(response.data);
    }

    const CashierVoucherfunc=async()=>{
        const id=localStorage.getItem('id');
        const response= await axios.get('http://localhost:5000/voucher/getAllCashierVochers');
        console.log(response.data);
        setcashier(response.data);
    }

    const setFunc=async(res)=>{
        setcashier(res);
    }

    return(
        <userContext.Provider value={{vouchers,getAllVochers,deleteVoucher,officialVoucher,officialvouchersList,AcaoVoucherfunc,acaoVoucherlist,VcVoucherfunc,VcVoucherList,CashierVoucherfunc,cashierVoucherList,setFunc}}>
            {props.children}
        </userContext.Provider>
    )
}

export default VoucherState;

