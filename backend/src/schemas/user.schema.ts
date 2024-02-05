import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  services: JSON;
  created_at: Date;
  updated_at: Date;
  active: boolean;
}

export const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: false },
  services: { type: Object, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
})

