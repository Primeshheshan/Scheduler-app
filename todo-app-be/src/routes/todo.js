import express from 'express';
import { addTodo, getAllTodos, deleteTodo } from '../controllers/todo.js';

const router = express.Router();

router.post('/', addTodo);
router.get('/', getAllTodos);
router.delete('/:id', deleteTodo);

export default router;
