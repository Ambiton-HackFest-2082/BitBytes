import { Router } from "express"
import { register, getTeacherById } from "../controllers/teacher.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const teacherRouter = Router()
teacherRouter.route("/register/:id").post(register)
teacherRouter.route("/get-teacher/:id").get(verifyJWT, getTeacherById)
export default teacherRouter