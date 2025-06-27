import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  acceptOffer,
  createOffer,
  fetchOfferByReqId,
  fetchOffers,
  fetchOffersByReqId,
} from "../controllers/offer.controller.js";

const offerRouter = Router();
offerRouter.route("/create").post(verifyJWT, createOffer);
offerRouter.route("/acceptOffer").post(verifyJWT, acceptOffer);
offerRouter.route("/fetchOffers").get(verifyJWT, fetchOffers);
offerRouter.route("/fetchOffers-by-reqId").get(verifyJWT, fetchOffersByReqId);
offerRouter.route("/fetchOffer-reqId").get(verifyJWT, fetchOfferByReqId);

export default offerRouter;
