import { ApiResponse } from "../utility/ApiResponse.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { Offer } from "../models/Offer.model.js"
import { isValidObjectId } from "mongoose";
import { Appointment } from "../models/appointment.model.js";
const create = asyncHandler(async (req, res) => {
    const offerId = req.params.offerId
    const { scheduleTime, zoomLink, credentials } = req.body
    if (!zoomLink) {
        throw new ApiError(409, "zoomlink is required")
    }
    if (!offerId || !isValidObjectId(offerId)) {
        throw new ApiError(409, " OfferId missing or Invalid")
    }

    const parseDate = new Date(scheduleTime)
    const isExist = await Appointment.findOne({ offer: offerId })
    if (isExist) {
        throw new ApiError(400, "appointment aready exists")
    }
    const createAppointment = await Appointment.create({
        offer: offerId,
        scheduleTime: parseDate,
        zoomLink,
        credentials
    })

    if (!createAppointment) {
        throw new ApiError(500, "Failed to create appointment")
    }
    return res.status(200).json(new ApiResponse(200, createAppointment, "successfully created appointment"))
})
const getAppointment = asyncHandler(async (req, res) => {
    const offerId = req.params.offerId
    if (!offerId || !isValidObjectId(offerId)) {
        throw new ApiError(409, " OfferId missing or Invalid")
    }
    const appointment = await Appointment.findOne({ offer: offerId }).populate("offer")
    if (!appointment) {
        throw new ApiError(404, "appointment not available")
    }
    return res.status(200).json(new ApiResponse(200, appointment))
})
export { create, getAppointment }