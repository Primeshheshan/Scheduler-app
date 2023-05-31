import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
