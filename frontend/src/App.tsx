import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Register from "./components/user/Register";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Navbar from "./components/user/Navbar";
import AddBlog from "./components/user/AddBlog";
import BlogDetails from "./components/user/BlogDetails";
import UserProtected from "./components/protectedRoutes/UserProtected";
import MyFeed from "./components/user/MyFeeds";
import EditBlog from "./components/user/EditBlog";


function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/blogs/:id" element={<BlogDetails/>}/>
        <Route element={<UserProtected/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/blogs/:id" element={<BlogDetails/>}/>
          <Route path="/addBlog" element={<AddBlog/>}/>
          <Route path="/myFeed" element={<MyFeed/>}/>
          <Route path="/edit/:id" element={<EditBlog/>}/>
        </Route>
       
      </Routes>
    </Router>
     
    </>
  )
}

export default App
