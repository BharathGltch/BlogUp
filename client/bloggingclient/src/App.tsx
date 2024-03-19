import {Route,Routes} from "react-router-dom";
import {Home,Signup,Login} from "../src/pages/Index";

import './App.css'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </div> 
    </>
  )
}

export default App