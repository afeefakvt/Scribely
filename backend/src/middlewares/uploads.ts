import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req,file)=>({
        folder:"uploads/blogImages",
        format:file.mimetype.split('/')[1] || "jpg",
        transformation:[{width:500,height:500,crop:"limit"}],
        resource_type:"image"

    })
})

const upload = multer({
    storage
})