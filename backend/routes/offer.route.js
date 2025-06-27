import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createOffer, fetchOffers } from "../controllers/offer.controller.js"

const offerRouter = Router()
offerRouter.route("/create").post(verifyJWT,createOffer)
offerRouter.route("/fetchOffers").get(verifyJWT,fetchOffers)

export default offerRouter