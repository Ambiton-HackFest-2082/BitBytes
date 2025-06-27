import { Router } from "express"
import { create, getAllChat } from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const chatRouter = Router()
chatRouter.route("/create/:receiverId").post(verifyJWT, create)
chatRouter.route("/get-all-chats/:offerId").get(verifyJWT, getAllChat)
export default chatRouter