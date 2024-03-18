import axios from "axios";

const official_validate=(id)=>{
    const d={
        id:id
    }
    // console.log(d);
    return axios.post("http://localhost:5000/officials/validate",d)
    .then((res)=>{
        console.log(res);
        return res;
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default official_validate;