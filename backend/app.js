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
app.use("/api/v1/users", userRouter)
//http://localhost:5000/api/v1/users/register
export default app;