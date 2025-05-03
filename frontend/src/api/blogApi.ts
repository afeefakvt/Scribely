import { axiosInstance } from "./axiosInstance";

export const getBlogs =async ()=>{
    try {
        const response = await axiosInstance.get('/blogs')
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}

export const publishBlog = async(formData:FormData)=>{
    try {
        const response = await axiosInstance.post("/blogs",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return response.data
    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

    }
}