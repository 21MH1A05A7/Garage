import axios from "axios"
const update=(id)=>{
    const user_id=localStorage.getItem('id');
    let success='false';
    axios.put(`http://localhost:5000/voucher/forwardto/${id}`,{},
        {
            headers:{
                'id':user_id
            }
        })
        .then((res)=>{
            
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })
}

export default update;