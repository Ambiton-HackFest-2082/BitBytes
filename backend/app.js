// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

//middlewares
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }))
app.use(cookieParser())



//routing
import userRouter from './routes/user.route.js';
import studentRouter from "./routes/student.route.js"
import teacherRouter from './routes/teacher.route.js';
import offerRouter from './routes/offer.route.js';
import postRouter from "./routes/post.route.js"
app.use("/api/v1/users", userRouter)
app.use("/api/v1/students", studentRouter)
app.use("/api/v1/teachers", teacherRouter)
app.use("/api/v1/offers", offerRouter)
app.use("/api/v1/posts", postRouter)
//http://localhost:5000/api/v1/users/register
export default app;