import { Blog } from "../models/blog"
import { Request,Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import { AuthRequest } from "../middlewares/authToken";



export const getAllBlogs = async(req:Request,res:Response):Promise<void>=>{
    try {
        const blogs = await Blog.find().populate("author","name email").sort({createdAt:-1});
        res.status(HTTP_STATUS.OK).json({message:"Blogs fetched successfully",blogs})
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Failed to fetch posts",error});
        
    }
}

export const addBlog = async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
        const {title,content} = req.body
        const author = req.userId
        const imageUrl = req.file?.path || ""

      
        
    if (!title || !content || !author) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "All fields are required." });
        return;
      }
  

        const newBlog = new Blog({
            title,
            content,
            imageUrl,
            author
        })
        await newBlog.save()
        res.status(HTTP_STATUS.CREATED).json({message:"Blog created",blog:newBlog})
        
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:"Failed to create post",error})
        
    }
}