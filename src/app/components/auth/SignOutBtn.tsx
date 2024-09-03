import { signOut } from '@/auth';

export function SignOut({ className }: any) {
  return (
    <form
      className={className}
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type='submit'>Signout</button>
    </form>
  );
}
