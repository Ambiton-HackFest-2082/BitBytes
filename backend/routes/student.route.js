import { Router } from "express"
import { register, getStudentById } from "../controllers/student.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const studentRouter = Router()
studentRouter.route("/register/:id").post(register)
studentRouter.route("/get-student/:id").get(verifyJWT, getStudentById)
export default studentRouter