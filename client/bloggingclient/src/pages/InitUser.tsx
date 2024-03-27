import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

function InitUser(){
    const navigate=useNavigate();
    const setUserState=useSetRecoilState(userState);
     useEffect(()=>{
      const init=async()=>{
       const token=localStorage.getItem('token');
       console.log("Inside init");
       if(token==null){
          navigate("/login");
          return;
       }
       let response;
       try{
     response = await axios.get("http://localhost:3000/auth/me",{
        headers:{
          'token':'Bearer '+token
        }
      });
    }catch(e){
         console.log("Error is "+e);
         localStorage.removeItem('token');
         navigate("/login");
    }
      const {status,userID,username}=response?.data;
  
      if(status==false){
        localStorage.removeItem('token');
        navigate("/login")
      }
  
  
      
        setUserState({
          isLoading:false,
          userID:userID as number,
          username:username as string
        })
  
      }
  
       init();
     },[]);
  
     return <div></div>
     
  }
  

  export default InitUser;