import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { AddTodo, deleteTodo, getAllTodo, getTodo, updateTodo } from '../controllers/todoController.js';


const router = express.Router();


router.post('/',verifyToken, AddTodo);
router.get('/:id',verifyToken, getTodo);
router.get('/',verifyToken, getAllTodo);
router.put('/:id',verifyToken ,updateTodo);
router.delete('/:id',verifyToken, deleteTodo);


export default router;
