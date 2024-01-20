import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { AddTodo, deleteTodo, getAllTodo, getTodo, updateTodo } from '../controllers/todoController.js';


const router = express.Router();

//add todo
router.post('/', AddTodo);
//get a todo
router.get('/:id', getTodo);
//get all todo
router.get('/', getAllTodo);
//update a todo
router.put('/:id' ,updateTodo);
//delete a todo
router.delete('/:id', deleteTodo);


export default router;
