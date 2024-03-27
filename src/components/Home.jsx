import React, { useState } from "react";
import './assets/homeStyling.css';
import axios from "axios";


function Home(props){

    const [file,setfile]=useState('');

    const handleChange=(e)=>{
        e.preventDefault();
        setfile(e.target.files[0]);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("image",file);
        console.log(formData);

        const data=await axios.post('http://localhost:5000/upload',formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
        })

    }


    return(
        <div className="w-full">
            <form action="" onSubmit={handleSubmit}>
                {/* <img src="" alt="" /> */}
                <input type="file"  onChange={handleChange}/>
                <button>submit</button>
            </form>
    </div>
    )
}   


export default Home;