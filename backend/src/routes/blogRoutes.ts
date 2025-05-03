import { Router } from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getUserBlogs, updateBlog } from "../controllers/blogController";
import { authToken } from "../middlewares/authToken";
import  upload  from "../middlewares/uploads";

const blogRouter = Router();

blogRouter.get('/blogs',getAllBlogs)
blogRouter.post('/blogs',authToken,upload.single('image'), addBlog)
blogRouter.get('/blogs/:blogId', getBlogById)
blogRouter.get('/myBlogs', authToken, getUserBlogs)
blogRouter.put('/blogs/:blogId', authToken, upload.single("image"),updateBlog)
blogRouter.delete('/blogs/:blogId', authToken, deleteBlog);

export default blogRouter