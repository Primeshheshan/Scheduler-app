import mongoose from 'mongoose';
import { TodoStatus } from '../enums/todo-status.enum.js';
import Todo from '../models/todo.js';

export const addTodo = async (req, res) => {
  try {
    const username = req.user;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const todo = new Todo({ username, title, description, status });
    await todo.save();
    console.log('A todo created!');
    return res.sendStatus(201);
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({
      username: req.user,
    });
    return res.status(200).json({
      message: 'All todos fetched successfully',
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

    // Find and delete the Todo by its ID
    const deletedItem = await Todo.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const doneTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid object ID' });
    }

    // Find and update the Todo by its ID
    const updatedItem = await Todo.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res
      .status(200)
      .json({ message: 'Todo status updated successfully', item: updatedItem });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const getInporgressTodos = async (req, res) => {
  try {
    try {
      // Find objects with status "InProgress"
      const inProgressTodos = await Todo.find({
        username: req.user,
        status: TodoStatus.IN_PROGRESS,
      });

      return res.status(200).json({ message: 'Success', inProgressTodos });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const getDoneTodos = async (req, res) => {
  try {
    try {
      // Find objects with status "InProgress"
      const doneTodos = await Todo.find({
        username: req.user,
        status: TodoStatus.DONE,
      });

      return res.status(200).json({ message: 'Success', doneTodos });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};

export const getTodoCount = async (req, res) => {
  try {
    const inProgressCount = await Todo.countDocuments({
      status: TodoStatus.IN_PROGRESS,
      username: req.user,
    });

    const doneCount = await Todo.countDocuments({
      username: req.user,
      status: TodoStatus.DONE,
    });

    return res
      .status(200)
      .json({ message: 'Success', inProgressCount, doneCount });
  } catch (error) {
    console.log(`An error occurred: ${error}`);
  }
};
