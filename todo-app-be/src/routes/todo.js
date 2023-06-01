import express from 'express';
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  doneTodo,
  getInporgressTodos,
  getDoneTodos,
} from '../controllers/todo.js';

const router = express.Router();

router.post('/', addTodo);
router.get('/', getAllTodos);
router.delete('/:id', deleteTodo);
router.put('/:id', doneTodo);
router.get('/inprogress', getInporgressTodos);
router.get('/done', getDoneTodos);

export default router;
