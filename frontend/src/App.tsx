import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Register from "./components/user/Register";
import Home from "./components/user/Home";
import Login from "./components/user/Login";


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
