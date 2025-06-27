import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { isValidObjectId } from "mongoose";
import { Teacher } from "../models/teacher.model.js"
import { User } from "../models/user.model.js"
const register = asyncHandler(async (req, res) => {
    const { experience, rating } = req.body
    if (!experience || !rating) {
        throw new ApiError(409, "experience or rating is required")
    }
    const userId = req.params.id

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(409, "User id is required")
    }
    const isTeacherAlreadyExist = await Teacher.findOne({ userId })
    if (isTeacherAlreadyExist) {
        throw new ApiError(401, "Teacher already exists")
    }
    const user = await User.findById(userId)
    if (user.role == "student") {
        throw new ApiError(500, "User with student role cannot register as teacher")
    }
    const createTeacher = await Teacher.create({
        userId,
        experience,
        rating
    })
    const createdTeacher = await Teacher.findById(createTeacher._id).populate("userId").select("-password -refreshToken")
    if (!createdTeacher) {
        throw new ApiError(500, "Failed to create student")
    }
    return res.status(200).json(new ApiResponse(200, createdTeacher, "Successfully created teacher"))
})
const getTeacherById = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(id)
    if (!id) {
        throw new ApiError(409, "teacher id is required or must be valid")
    }
    if (!isValidObjectId(id)) {
        throw new ApiError(409, "teacher id  must be valid")
    }
    const teacher = await Teacher.findOne({ _id: id }).populate({ path: "userDetail", select: "-password -refreshToken" })
    console.log(teacher)
    if (!teacher) {
        throw new ApiError(404, "Teacher does not exist ")
    }
    return res.status(200).json(new ApiResponse(200, teacher, "Successfully fetched teacher"))
})
export { register, getTeacherById }