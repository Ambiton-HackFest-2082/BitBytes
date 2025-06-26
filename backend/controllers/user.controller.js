import { ApiResponse } from "../utility/ApiResponse.js"
import { ApiError } from "../utility/ApiError.js"
import { asyncHandler } from "../utility/AsyncHandler.js"
import { User } from "../models/user.model.js"
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const register = asyncHandler(async (req, res) => {
    const { fullName, email, password, phone, role } = req.body
    if ([fullName, email, password, phone, role].some(field => field == "")) {
        throw new ApiError(400, "all fields are required")
    }
    const isUserExist = await User.findOne({
        $or: [{ email }, { phone }]
    })
    if (isUserExist) {
        throw new ApiError(409, "user already exists")
    }
    const createdUser = await User.create({
        fullName,
        email,
        password,
        phone,
        role
    })
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(createdUser._id)
    const user = await User.findById(createdUser).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(new ApiResponse(200, user, "Successfully created user"))

})
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(409, "email/password is required")
    }
    const isUserExist = await User.findOne({ email })
    if (!isUserExist) {
        throw new ApiError(404, "user doesnot exist");
    }

    const isPasswordCorrect = await isUserExist.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError("Incorrect password")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(isUserExist._id)
    const user = await User.findById(isUserExist._id).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(new ApiResponse(200, user,))
})
const logoutUser = asyncHandler(async (req, res) => {

    const userId = req.user._id
    console.log(userId)
    await User.findByIdAndUpdate(userId, {
        $unset: {
            refreshToken: ""
        }
    }, {
        new: true
    })
    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, "logout successfully"))
})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse("current user fetched successfully", req.user, 200))
})

export { register, login, logoutUser, getCurrentUser }