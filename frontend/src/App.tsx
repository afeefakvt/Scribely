import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Register from "./components/user/Register";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Navbar from "./components/user/Navbar";
import AddBlog from "./components/user/AddBlog";


function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addBlog" element={<AddBlog/>}/>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
