import { errorHandler } from '../utils/error.js';
import Todo from '../models/Todo.js';

export const AddTodo = async (req, res, next) => {
  try {

    const { detail } = req.body;
    if(!detail) return next(errorHandler(400 , "please fill all required fields"))
 
    const newTodo = new Todo({
      detail: detail,
      userId: req.user.id,
    });

    await newTodo.save();
    return res.status(201).json({ message: 'todo added successfully'});
  } catch (error) {
    // console.error('Error in todo addition:', error);
    next(error);
  }
};

export const getTodo = async (req, res, next) => {
  try {
    const id  = req.params.id;
    const todo = await Todo.findById(id)
    if(!todo) return next(errorHandler(404, "todo not found"))
    return res.status(201).json({status:"success", todo});
  } catch (error) {
    next(error);
  }
};

export const getAllTodo = async (req, res, next) => {
  try {
    const todos = await Todo.find({userId: req.user.id});
    return res.status(201).json({status:"success", todos});
  } catch (error) {
    next(error);
  }
};


export const deleteTodo = async (req, res, next) => {
  try {
    const id  = req.params.id;
    const data =  await Todo.findByIdAndDelete(id);
    return res.status(204).json({status:"todo deleted successfully"});
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const id  = req.params.id;
    const { detail } = req.body;
    if(!detail) return next(errorHandler(400 , "please fill all required fields"))
    await Todo.findByIdAndUpdate(id,{detail:detail});
    return res.status(200).json({status:"todo updated successfully"});
  } catch (error) {
    next(error);
  }
};
