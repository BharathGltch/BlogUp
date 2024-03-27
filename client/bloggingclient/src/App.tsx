import {Route,Routes, useNavigate} from "react-router-dom";
import {Home,Signup,Login,BlogPage,InitUser} from "../src/pages/Index";
import './App.css'
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState, RecoilRoot } from "recoil";
import { userState } from "./store/atoms/user";

function App() {

  return (
    <>
     <RecoilRoot>
      <div>
       <InitUser/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/blog"  element={<BlogPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </div> 
      </RecoilRoot>
    </>
  )
}


export default App;
