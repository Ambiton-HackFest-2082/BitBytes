import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/AsyncHandler.js";
import { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { Student } from "../models/student.model.js";
const create = asyncHandler(async (req, res) => {
  const { title, fee, description, preferredTime } = req.body;
  if (
    [title, description, preferredTime].some((field) => field == "")
  ) {
    throw new ApiError(409, "All fields are required");
  }
  const userId = req.user._id;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(409, "Invalid ");
  }
//   const student = await Student.findOne({ userDetail: userId });
//   if (!student) {
//     throw new ApiError(404, "Student does not exists");
//   }
  const parseDate = new Date(preferredTime);
  const createPost = await Post.create({
    topic:title,
    description,
    budget:fee,
    appointmentTime: parseDate,
    studentDetail: userId,
  });
  if (!createPost) {
    throw new ApiError(500, "Failed to create post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createPost, "successfully created post"));
});
const getPostDetail = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  if (!postId || !isValidObjectId(postId)) {
    throw new ApiError(409, "Post id is must/valid");
  }
  const getPost = await Post.findOne({ _id: postId }).populate({
  path: "studentDetail",
  select: "fullName _id",
  });
  if (!getPost) {
    throw new ApiError(404, "post doesnot exist ");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getPost, "successfully fetched post"));
});
const getAllPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(409, "Invalid ");
  }
//   const student = await Student.findOne({ userDetail: userId });
//   if (!student) {
//     throw new ApiError(404, "Student does not exists");
//   }
  const allPosts = await Post.find({ studentDetail: userId }).populate("studentDetail");
  if (!allPosts) {
    throw new ApiError(404, "No post available");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allPosts, "Sucessfully fetched all the posts"));
});
const getAllPostForTeacher = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({
    status: "open",
  }).populate("studentDetail");
  if (!allPosts) {
    throw new ApiError(404, "No post available");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allPosts, "Sucessfully fetched all the posts"));
});
const postClosed = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  if (!postId || !isValidObjectId(postId)) {
    throw new ApiError(409, "Invalid/missing post id ");
  }
  const postClose = await Post.findByIdAndUpdate(
    postId,
    { status: "closed" },
    { new: true }
  );
  if (!postClose) {
    throw new ApiError(500, "failed to close post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, postClose, "Post closed sucessfully"));
});
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;
  if (!postId || !isValidObjectId(postId)) {
    throw new ApiError(409, "Invalid or missing postId");
  }
  const postDelete = await Post.findByIdAndDelete(postId);
  if (!postDelete) {
    throw new ApiError(500, "failed to delete post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, postDelete, "successfully deleted post"));
});

export { create, getPostDetail, getAllPost, postClosed, deletePost, getAllPostForTeacher };
