import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AuthenticatedUser } from '../types/user.type';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/environment';
import userModelInstance from '../models/user.model';
import { checkAndHashPassword, checkPassword } from '../helpers/user.helper';

class UserController {

  public async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = checkAndHashPassword(req.body.password);
      const user = await userModelInstance.register(req.body);
      user.password = '';
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: `Error to register user: ${error}` });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModelInstance.login(req.body.email, req.body.username);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else if (!checkPassword(req.body.password, user.password)) {
        res.status(401).json({ error: 'Wrong password' });
      } else {
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        user.password = '';
        res.status(202).json({ token, user: user });
      }
    } catch (error) {
      res.status(500).json({ error: `Error to login user: ${error}` });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const id = (req.user as AuthenticatedUser).id;
      if (req.body.password) {
        req.body.password = checkAndHashPassword(req.body.password);
      }
      const updatedUser = await userModelInstance.update(id, req.body);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(202).json(updatedUser);
      }
    } catch (error) {
      res.status(500).json({ error: `Error to update user: ${error}` });
    }
  }


}

export default new UserController();