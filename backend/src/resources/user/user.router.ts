// src/resources/user/user.routes.ts

import { Router } from 'express';
import userController from './user.controller';
import checkAutorization from '../../middlewares/checkAutorization'; 

const router = Router();

router.post('/', userController.createUser); 
router.get('/', checkAutorization, userController.listUsers);
router.get('/:id', userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', checkAutorization, userController.deleteUser);

export default router;