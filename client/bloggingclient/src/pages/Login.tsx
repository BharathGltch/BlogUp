import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login(){
    const navigate=useNavigate();
   const [username,setUsername]=useState("");
   const [password,setPassword]=useState("");
   const [message,setMessage]=useState("");

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const raw=await fetch("http://localhost:3000/auth/signin",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                "username":username,
                "password":password
            })
        });
        const data=await raw.json();
        console.log(data);
        if(data.status){
             setMessage("correctDetails");
             setTimeout(()=>{
                navigate("/");
             })
        }else{
            setMessage("InCorrect Details");
            setTimeout(()=>{
                setMessage("");
            },1000);
        }
        
    }
    return(
        <div>
            <h2>Login </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} placeholder="Enter your username" onChange={(e)=>{console.log(e.target.value);setUsername(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} placeholder="Enter your username" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Submit</button>
            </form>
            <div>{message}</div>
        </div>
        
    )
}

export default Login;