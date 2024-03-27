import axios from "axios";

const VcValidate=async (id)=>{
    const d={
        id:id
    }
    // console.log(d);
    return axios.post("http://localhost:5000/auth/vc/validate",d)
    .then((res)=>{
        // console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log(err);
    })
}
export default VcValidate;