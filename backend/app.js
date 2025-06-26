// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

export default app;