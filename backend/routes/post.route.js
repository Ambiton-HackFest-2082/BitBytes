import { Router } from "express"
import { create, getPostDetail, getAllPost, deletePost, postClosed } from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const postRouter = Router()
postRouter.route("/create").post(verifyJWT, create)
postRouter.route("/get-post-details/:postId").get(verifyJWT, getPostDetail)
postRouter.route("/get-posts").get(verifyJWT, getAllPost)
postRouter.route("/update-post/:postId").patch(verifyJWT, postClosed)
postRouter.route("/delete-post/:postId").delete(verifyJWT, deletePost)
export default postRouter