import { Router } from 'express';

import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/users.js";

import { UserController } from "../controllers/users.controller.js";


export const createUserRouter = ({ userModel }) => {
  const usersRouter = Router();

  const userController = new UserController({ userModel });

  usersRouter.get('/users', userController.getAll);

  usersRouter.post('/register', validateSchema(userSchema), userController.register);

  return usersRouter;
}