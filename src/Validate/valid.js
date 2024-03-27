import axios from "axios";

const valid=async (id)=>{
    const d={
        id:id
    }
    // console.log(d);
    return axios.post("http://localhost:5000/staffauth/validate",d)
    .then((res)=>{
        // console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default valid;