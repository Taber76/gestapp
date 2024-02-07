import * as bcrypt from 'bcrypt';

export function checkAndHashPassword(password: string): string {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!re.test(password)) {
    throw new Error('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número');
  }
  const hashPassword = bcrypt.hashSync(password, 7);
  return hashPassword;
}

export function checkPassword(password: string, hashPassword: string): boolean {
  return bcrypt.compareSync(password, hashPassword);
}
