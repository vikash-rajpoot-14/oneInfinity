import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    detail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
