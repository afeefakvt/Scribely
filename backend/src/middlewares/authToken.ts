import { verifyAccessToken } from "../utils/jwt";
import { Request,Response,NextFunction } from "express";

export interface AuthRequest extends Request{
    userId?:string
}
export const authToken = (req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            res.status(403).json({message:"Access denied no token provided"});
            return;
        }
        const decoded = verifyAccessToken(token) as {id:string};
        // console.log(decoded,"deccccccoded");
        
        req.userId = decoded.id
        next();
    } catch (error) {
        res.status(403).json({message:'Token is expired.Please login again.'})
        return;
        
    }

}