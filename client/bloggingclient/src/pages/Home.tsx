import { useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate=useNavigate();
    useEffect(()=>{
        const makeARequest=async ()=>{
              let data=await axios.get("http://localhost:3000/test");
              console.log(data);
        } 
        if(localStorage.getItem('token')==null){
            navigate("/login");
        }else{
            makeARequest();
        }
    
    },[])
    return(
        <div>
            Hello This is Home
        </div>
    )
}

export default Home;