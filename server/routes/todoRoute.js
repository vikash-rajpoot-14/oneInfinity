import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { AddTodo, deleteTodo, getAllTodo, getTodo, updateTodo } from '../controllers/todoController.js';


const router = express.Router();

//add todo
router.post('/',verifyToken, AddTodo);
//get a todo
router.get('/:id',verifyToken, getTodo);
//get all todo
router.get('/',verifyToken, getAllTodo);
//update a todo
router.put('/:id',verifyToken ,updateTodo);
//delete a todo
router.delete('/:id',verifyToken, deleteTodo);


export default router;
