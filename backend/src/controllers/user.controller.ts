import { Request, Response } from 'express';
import userModelInstance from '../models/user.model';

class UserController {

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModelInstance.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: `Error to get all users: ${error}` });
    }
  }

  public async addUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await userModelInstance.addUser(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: `Error to add user: ${error}` });
    }
  }



}

export default new UserController();


