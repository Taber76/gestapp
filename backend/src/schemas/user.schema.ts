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
  password: { type: String, required: true, select: false },
  name: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(v);
      },
      message: props => `${props.value} no es un correo electrónico válido`
    }
  },
  phone: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['GESTOR', 'USUARIO']
  },
  avatar: { type: String, required: false },
  services: { type: Object, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
})

