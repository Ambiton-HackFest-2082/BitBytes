import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { isValidObjectId } from "mongoose";
import { Student } from "../models/Student.model.js";
import { User } from "../models/user.model.js";
const register = asyncHandler(async (req, res) => {
    const { grade, school } = req.body;
    const userId = req.params.id;

    // Validation
    if (!grade || !school) {
        throw new ApiError(409, "Grade and school are required");
    }

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(409, "Valid user ID is required");
    }

    // Prevent duplicate
    const isStudentAlreadyExist = await Student.findOne({ userDetail: userId });
    if (isStudentAlreadyExist) {
        throw new ApiError(409, "Student already exists");
    }

    const user = await User.findById(userId).lean();
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role === "teacher") {
        throw new ApiError(403, "Teachers cannot register as students");
    }

    // Create student
    const createdStudent = await Student.create({
        userDetail: userId,
        grade,
        school
    });

    // Fetch with populated and flattened userDetail
    const studentWithUser = await Student.findById(createdStudent._id)
        .populate("userDetail", "-password -refreshToken -__v")
        .lean();

    // Flatten userDetail into root
    const { userDetail, ...rest } = studentWithUser;
    const flattened = {
        ...rest,
        ...userDetail
    };

    return res.status(200).json(new ApiResponse(200, flattened, "Successfully created student"));
});

const getStudentById = asyncHandler(async (req, res) => {
    const id = req.params.id
    console.log(id)
    if (!id) {
        throw new ApiError(409, "student id is required or must be valid")
    }
    if (!isValidObjectId(id)) {
        throw new ApiError(409, "student id  must be valid")
    }
    const student = await Student.findOne({ _id: id }).populate({ path: "userDetail", select: "-password -refreshToken" })
    if (!student) {
        throw new ApiError(404, "Student does not exist ")
    }
    return res.status(200).json(new ApiResponse(200, student, "Successfully fetched student"))
})
export { register, getStudentById }