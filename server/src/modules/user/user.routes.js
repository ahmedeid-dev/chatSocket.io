import * as userCtrl from './user.controllers.js'
import { Router } from "express";

const userRouter = Router();

userRouter
    .get('/', userCtrl.getAllUsers)
    .get('/:id', userCtrl.getOneUser)
    .post('/', userCtrl.addUser)
    .put('/:id', userCtrl.updateUser)
    .delete('/:id', userCtrl.deleteUser)
    .patch('/:id/password', userCtrl.changePassword)

export default userRouter