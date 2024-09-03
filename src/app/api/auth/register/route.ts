import { NextResponse } from 'next/server';
import { addUser, findUser } from '@/actions';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    // YOU MAY WANT TO ADD SOME VALIDATION HERE

    const user = await findUser(email);
    !user && addUser({ username: username, email: email, password: password });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: 'success' });
}
