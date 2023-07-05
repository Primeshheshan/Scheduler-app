import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
