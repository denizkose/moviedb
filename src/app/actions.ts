'use server';

import User from '@/lib/database/models/User';
import { signIn } from '@/auth';
import { hash } from 'bcryptjs';

interface UserRegForm {
  username: string;
  email: string;
  password: string;
}

const addUser = async (user: UserRegForm) => {
  const hashedPassword = await hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });
  newUser.save();
  return newUser.username;
};

const findUser = async (email: string) => {
  const foundedUser = (await User.findOne({ email: email })) || undefined;
  return foundedUser;
};

const login = async (formData: any) => {
  console.log('enter');
  try {
    console.log(formData);
    await signIn('credentials', formData);
    // const result = await signIn("credentials", formData);
    // return result;
    return { status: 'ok', description: 'authenticated' };
  } catch (e: any) {
    if (e['cause']?.err.code === 'invalid_credentials') {
      return { error: 'Incorrect username or password' };
    }
  }
};

export { addUser, findUser, login };
