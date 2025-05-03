import { axiosInstance } from "./axiosInstance";
import { IUser,LoginData } from "../interfaces/interface";
import Cookies from "js-cookie";
import { store } from "../store/store";
import { loginSuccess } from "../store/userSlice";


export const register = async(userData:IUser)=>{
    try {
        const response = await axiosInstance.post('/register',userData)
        return response.data        
    } catch (error:any) {
        console.error("Registration API error:", error);
        throw error.response?.data || new Error("Something went wrong");

    }
}
export const login = async(userData:LoginData)=>{
    try {
        const response = await axiosInstance.post('/login',userData)        
        const {accessToken} =  response.data
        if(accessToken){
            store.dispatch(loginSuccess({
                accessToken,
                user:response.data.user,
                isAuthenticated:true
            }))
            Cookies.set('authToken',accessToken,{expires:1/1440})
        }else{
            console.log("not logged in");
            
        }    
        return response.data

    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        
    }
}

export const logoutUser = async()=>{
    try {
        const response = await axiosInstance.post('/logout')
        return response.data

    } catch (error:any) {
        throw error.response?.data || new Error("Something went wrong");        

        
    }
}