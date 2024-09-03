import dbConnect from '@/lib/database/db';

export async function register() {
  await dbConnect();
}
