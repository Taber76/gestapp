import { Model } from 'mongoose';
import MongoDB from '../config/mogodb';
import { IUser, UserSchema } from '../schemas/user.schema';

class UserModel {
  public model: Model<IUser>;

  public constructor() {
    const connection = MongoDB.getInstance().getConnection();
    this.model = connection.model<IUser>('User', UserSchema);
  }

  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await this.model.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async addUser(userData: IUser): Promise<IUser> {
    try {
      const newUser = new this.model(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserModel();


