import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/user.js';
import todoRoutes from './src/routes/todo.js';
import cors from 'cors';

const app = express();
const port = 8080;
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/todo', todoRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zlhb3u9.mongodb.net/todo?retryWrites=true&w=majority`
    );
    app.listen(port);
    console.log('Connected to MongoDB');
    console.log(`App listening on ${port}`);
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};

connectDb();
