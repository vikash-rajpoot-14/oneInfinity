import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRouter from './routes/authRoute.js';
import todoRouter from './routes/todoRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config({path:"./config.env"});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());
const PORT = process.env.PORT||5000;

app.use('/api/auth', authRouter);
app.use('/api/todo',todoRouter );

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
