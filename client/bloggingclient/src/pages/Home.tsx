import { useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate=useNavigate();
    return(
        <div>
            Hello This is Home
        </div>
    )
}

export default Home;