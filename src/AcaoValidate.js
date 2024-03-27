import axios from "axios";
const AcaoValidate=async (id)=>{
    const d={
        id:id
    }

    return axios.post("http://localhost:5000/auth/acao/validate",d)
    .then((res)=>{
        // console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default AcaoValidate;