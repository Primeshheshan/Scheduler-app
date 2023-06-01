import express from 'express';
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  doneTodo,
} from '../controllers/todo.js';

const router = express.Router();

router.post('/', addTodo);
router.get('/', getAllTodos);
router.delete('/:id', deleteTodo);
router.put('/:id', doneTodo);

export default router;
