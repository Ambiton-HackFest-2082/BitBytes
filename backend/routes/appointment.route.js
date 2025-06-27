import { Router } from "express"
import { getAppointment, create } from "../controllers/appointment.controller.js"
const appointmentRouter = Router()
appointmentRouter.route("/create/:offerId").post(create)
appointmentRouter.route("/get-appointment/:offerId").get(getAppointment)
export default appointmentRouter