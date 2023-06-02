import express from 'express';
import {
  addTodo,
  getAllTodos,
  deleteTodo,
  doneTodo,
  getInporgressTodos,
  getDoneTodos,
  getTodoCount,
} from '../controllers/todo.js';

const router = express.Router();

router.post('/', addTodo);
router.get('/', getAllTodos);
router.delete('/:id', deleteTodo);
router.put('/:id', doneTodo);
router.get('/inprogress', getInporgressTodos);
router.get('/done', getDoneTodos);
router.get('/count', getTodoCount);

export default router;
