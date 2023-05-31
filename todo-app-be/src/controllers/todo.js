import Todo from '../models/todo.js';

export const addTodo = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const todo = new Todo({ title, description });
    await todo.save();
    console.log('A todo created!');
    res.sendStatus(201);
  } catch (error) {
    console.log(`An error occurred! ${error}`);
  }
};
