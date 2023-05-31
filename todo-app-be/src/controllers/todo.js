import Todo from '../models/todo.js';
import mongoose from 'mongoose';

export const addTodo = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const todo = new Todo({ title, description, status });
    await todo.save();
    console.log('A todo created!');
    return res.sendStatus(201);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    console.log('Get all Totdos!');
    return res.json({
      allTodos,
    });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid object ID' });
    }

    // Find and delete the item by its ID
    const deletedItem = await Todo.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};
