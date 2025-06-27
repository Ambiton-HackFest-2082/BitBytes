/* auth.controller.js */
import axiosInstance from "@/helper/axios";
import { toast } from "sonner";
const usePost = () => {
  const createPost = async (offerData) => {
    try {
      const response = await axiosInstance.post("/posts/create", offerData);
      toast.success("Post created successfully!");
      return response.data.data;
    } catch (error) {
      console.error(
        "Error verifying authentication",
        error.response?.data || error.message
      );
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts/get-posts");
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPostsForTeacher = async () => {
    try {
      const res = await axiosInstance.get("/posts/get-posts-teacher");
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPostDetail = async (reqId) => {
    try {
      const res = await axiosInstance.get(`/posts/get-post-details/${reqId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const closePost = async (reqId) => {
    try {
      const res = await axiosInstance.patch(`/posts/update-post/${reqId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (reqId) => {
    try {
      const res = await axiosInstance.delete(`/posts/delete-post/${reqId}`);
      toast.success("Post deleted successfully!");
      return res.data.data;
    } catch (error) {
      console.error(
        "Error deleting post",
        error.response?.data || error.message
      );
    }
  };

  return {
    createPost,
    fetchPosts,
    fetchPostsForTeacher,
    fetchPostDetail,
    closePost,
    deletePost
  };
};

export default usePost;
