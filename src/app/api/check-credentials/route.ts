import User from '@/lib/database/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  console.log(req.body);
  const { username, email } = await req.json();
  console.log(username, email);

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return NextResponse.json({ available: false }, { status: 200 });
    }

    return NextResponse.json({ available: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
