import { ApiResponse } from "../utility/ApiResponse.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/AsyncHandler.js";

import { Offer } from "../models/Offer.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Post } from "../models/post.model.js";

const createOffer = asyncHandler(async (req, res) => {
  const { fee, time, message } = req.body;
  const { reqId } = req.query;
  const { studentId } = req.query;
  const offeredBy = req.user._id;

  if ([fee, time, reqId, message].some((field) => field == "")) {
    throw new ApiError(400, "all fields are required");
  }

  const parsedTime = new Date(time);

  const createOffer = await Offer.create({
    offeredBy,
    appointmentTime: parsedTime,
    post: reqId,
    proposed_price: fee,
    message,
    offeredTo: studentId,
  });

  const teacher = await Teacher.findOne({
    userDetail: offeredBy,
  });

  const createdOffer = await Offer.findById(createOffer._id)
    .populate({
      path: "offeredBy",
      select: "fullName _id",
    })
    .populate({
      path: "offeredTo",
      select: "fullName _id",
    });
  const responseData = {
    ...createdOffer,
    offeredBy: {
      ...createOffer.offeredBy,
      rating: teacher.rating,
      experience: teacher.experience,
    },
  };
  if (!createdOffer) {
    throw new ApiError(500, "Failed to create offer");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Successfully created Offer"));
});

const fetchOffers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const isTeacher = req.user.role === "teacher";
  const query = isTeacher
    ? {
        offeredBy: userId,
      }
    : {
        $and: [
          { offeredTo: userId },
          {
            status: "Accepted",
          },
        ],
      };

  const offers = await Offer.find(query)
    .populate("post")
    .populate("offeredBy")
    .populate("offeredTo");

  return res
    .status(200)
    .json(new ApiResponse(200, offers, "Successfully fetched Offers"));
});

const fetchOffersByReqId = asyncHandler(async (req, res) => {
  const reqId = req.query.reqId;

  const offers = await Offer.find({ post: reqId }).populate("offeredBy");

  return res
    .status(200)
    .json(new ApiResponse(200, offers, "Successfully fetched Offers"));
});

const fetchOfferByReqId = asyncHandler(async (req, res) => {
  const { reqId } = req.query;
  const offers = await Offer.findOne({ post: reqId }).populate({
    path: "offeredBy",
    select: "fullName _id",
  });

  if (!offers) {
    throw new ApiError(404, "No offers found for this request");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, offers, "Successfully fetched Offers"));
});

const acceptOffer = asyncHandler(async (req, res) => {
  const { offerId } = req.query;
  const offer = await Offer.findById(offerId);
  const post = await Post.findById(offer?.post);

  if (!offer) {
    throw new ApiError(404, "Offer not found");
  }

  offer.status = "Accepted";
  await offer.save();

  post.status = "closed";
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, offer, "Offer accepted successfully"));
});

export {
  createOffer,
  fetchOffers,
  fetchOfferByReqId,
  fetchOffersByReqId,
  acceptOffer,
};
