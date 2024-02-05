import express from 'express';
import userController from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/getall', userController.getAllUsers);
userRouter.post('/add', userController.addUser);

export default userRouter