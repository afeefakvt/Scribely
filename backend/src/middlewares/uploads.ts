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
    storage,
    limits:{
        fileSize:5*1024*1024,
    },
    fileFilter:(req,file,cb)=>{
        if(!file.mimetype.startsWith('image/')){
            cb(new Error("Only image files are allowed"));
            return;
        }
        cb(null, true);
    }
})

export default upload