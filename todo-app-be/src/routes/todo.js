import express from 'express';
import { addTodo } from '../controllers/todo.js';

const router = express.Router();

router.post('/', addTodo);

export default router;
