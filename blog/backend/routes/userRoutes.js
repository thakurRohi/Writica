// routes/userRoutes.js

import express from 'express'
import userController from '../controllers/userControllers.js'

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.delete('/users/:userId', userController.deleteUser);
router.put('/users/:userId/name', userController.updateUserName);


export default router;
