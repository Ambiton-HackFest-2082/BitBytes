import { ApiResponse } from "../utility/ApiResponse.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { Chat } from "../models/chat.model.js"
import { User } from "../models/user.model.js"
import { Offer } from "../models/Offer.model.js"
import { isValidObjectId } from "mongoose";
const create = asyncHandler(async (req, res) => {
    const { message } = req.body
    const offerId = req.query.offerId
    const senderId = req.user._id
    const receiverId = req.params.receiverId
    if (!message) {
        throw new ApiError(409, "Message is required")
    }
    if (!senderId || !receiverId || !offerId) {
        throw new ApiError(409, "Sender/Reciver/offer id is required")
    }
    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId) || !isValidObjectId(offerId)) {
        throw new ApiError(409, "Invalid sender/receiver/offer id")
    }
    const sender = await User.findById(senderId)
    const receiver = await User.findById(receiverId)
    const offer = await Offer.findById(offerId)
    if (!sender) {
        throw new ApiError(404, "Sender doesnot exist")
    }
    if (!receiver) {
        throw new ApiError(404, "Receiver doesnot exist")
    }
    if (!offer) {
        throw new ApiError(404, "Offer doesnot exist")
    }
    const createMessage = await Chat.create({
        sender: senderId,
        receiver: receiverId,
        offer: offerId,
        message
    })
    if (!createMessage) {
        throw new ApiError(500, "Failed to create chat")
    }
    return res.status(200).json(new ApiResponse(200, createMessage, "chat successfully created"))
})
const getAllChat = asyncHandler(async (req, res) => {
    const offerId = req.params.offerId
    if (!offerId) {
        throw new ApiError(409, "Offer id is required")
    }
    if (!isValidObjectId(offerId)) {
        throw new ApiError(409, "Invalid offer id")
    }
    const offer = await Offer.findById(offerId)
    if (!offer) {
        throw new ApiError(404, "Offer not found")
    }
    const AllChats = await Chat.find({ offer: offerId }).sort({ createdAt: -1 }).populate({ path: "sender", select: "fullName role" }).populate({ path: "receiver", select: "fullName role" })
    if (!AllChats) {
        throw new ApiError(505, "Failed to fetch all chats")
    }
    return res.status(200).json(new ApiResponse(200, AllChats, "Successfully fetched all the chats"))
})

export { create, getAllChat }