import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// import { saltAndHashPassword } from "@/utils/password"
import { compare } from 'bcryptjs';
import { findUser } from './actions';

interface Credentials {
  email: string;
  password: string;
}

export class InvalidLoginError extends CredentialsSignin {
  code = 'invalid_credentials';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: true,
  providers: [
    Credentials({
      name: 'Aloha!',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as Credentials;
        let user = await findUser(email);

        if (!user) {
          throw new Error('User not found.');
        }

        console.log('user: ' + user);

        const passwordCorrect = await compare(password || '', user.password);

        if (!passwordCorrect) {
          throw new InvalidLoginError();
        }

        return user;
      },
    }),
  ],
});
