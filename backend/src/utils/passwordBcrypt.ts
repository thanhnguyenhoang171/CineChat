import * as bcrypt from 'bcrypt';

export async function passwordHashing(passwordInput: string) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(passwordInput, salt);
  //   console.log('Check hashed password: ', hashedPassword);
  return hashedPassword;
}

export async function passwordCompare(passwordInput: string, hashedPassword: string) {
  return bcrypt.compareSync(passwordInput, hashedPassword);
}