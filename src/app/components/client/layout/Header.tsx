import { auth } from '@/auth';
import SearchBar from '@/components/client/navbar/SearchBar';
import { SignOut } from '@/components/auth/SignOutBtn';
import Image from 'next/image';
import { SignInBtn } from '@/components/auth/SignInBtn';
import { NavLink } from '@/components/client/navbar/NavLink';
import { createAvatar } from '@dicebear/core';
import { notionistsNeutral } from '@dicebear/collection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default async function Header() {
  const session = await auth();

  const user = {
    id: session?.user?.id || '',
    name: session?.user?.name || session?.user?.email || 'Guest',
    image:
      `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${session?.user?.name}` ||
      'Guest',
    email: session?.user?.email || '',
  };

  const avatar = createAvatar(notionistsNeutral, {
    seed: user.name === 'Guest' ? 'Guest' : user.email,
  }).toDataUri();

  return (
    <header className='header-gradient sticky top-0 z-50 hidden h-16 px-5 tablet:block'>
      <nav className='flex h-full flex-row items-center space-x-2 overflow-hidden'>
        <div className='flex w-4/12 flex-row items-center justify-start space-x-4'>
          <span className='text-2xl font-bold'>
            {/* TODO Create mobile menu */}
            <span className='tablet:hidden'>
              <NavLink url='/' title='MDB' />
            </span>
            <span className='hidden tablet:block'>
              <NavLink url='/' title='Movie DB' />
            </span>
          </span>
          <span className='hidden space-x-5 tablet:block'>
            <NavLink url='#' title='Films' />
            <NavLink url='#' title='TV Shows' />
            <NavLink url='/search' title='Search' />
          </span>
        </div>
        <div className='flex w-4/12 justify-center'>
          <SearchBar />
        </div>
        <div className='flex w-4/12 flex-row items-center justify-end space-x-2'>
          <button aria-label='Search'>
            <FontAwesomeIcon icon={faSearch} className='text-white' />
          </button>
          {!session && <NavLink url='/register' title='Register' />}
          {!session && <SignInBtn className='text-md text-white' />}
          {session && (
            <span className='flex flex-row items-center space-x-2'>
              {' '}
              <SignOut className='text-md text-white' />
              <span className='tetx-md text-white'>{user.name}</span>{' '}
              <Image
                src={avatar}
                height={48}
                width={48}
                alt={user.name}
                className='rounded-full'
              />
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}
