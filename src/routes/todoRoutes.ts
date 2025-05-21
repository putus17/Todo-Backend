import { Router } from 'express';
import { create, getAll, getById, update, deleteTodo } from '../controllers/todoController'
import {authenticate} from '../middleware/authmiddleware'

const router = Router();

router.post('/', authenticate, create);

router.get('/',authenticate,  getAll );

router.get('/:id', authenticate, getById );

router.put('/:id', authenticate ,update );

router.delete('/:id', authenticate, deleteTodo );

export default router;
