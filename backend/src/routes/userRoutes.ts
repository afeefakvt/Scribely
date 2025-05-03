import { Router } from "express";
import { login, logout, register } from "../controllers/userController";
import { refreshAccessToken } from "../controllers/userController";
import { authToken } from "../middlewares/authToken";

const userRouter = Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/refreshToken',refreshAccessToken)
userRouter.post('/logout',logout)

export default userRouter