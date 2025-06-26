import { Router } from "express"
import { register, login, logoutUser, getCurrentUser } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const userRouter = Router()
userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/get-current-user").get(verifyJWT, getCurrentUser)

export default userRouter