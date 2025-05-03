import { Router } from "express";
import { addBlog, getAllBlogs } from "../controllers/blogController";
import { authToken } from "../middlewares/authToken";
import  upload  from "../middlewares/uploads";

const blogRouter = Router();

blogRouter.get('/blogs',getAllBlogs)
blogRouter.post('/blogs',authToken,upload.single('image'), addBlog)

export default blogRouter