'use client';

import { login } from '@/actions';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

export function SignInBtn({ className }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('default');
  const modalRef = useRef<HTMLDivElement>(null);
  // const router = useRouter();
  // const callbackUrl = usePathname()

  // TODO Refactor status button
  type Status = 'default' | 'ok' | 'loading';
  type StatusButton = {
    text: React.ReactNode;
    color: string;
    color_hover: string;
  };

  const statusBtn: Record<Status, StatusButton> = {
    default: {
      text: 'Login',
      color: 'bg-blue-500',
      color_hover: 'bg-blue-700',
    },
    ok: {
      text: <FontAwesomeIcon icon={faCheck} />,
      color: 'bg-green-500',
      color_hover: 'bg-green-700',
    },
    loading: {
      text: <FontAwesomeIcon icon={faSpinner} className='animate-spin' />,
      color: 'bg-yellow-500',
      color_hover: 'bg-yellow-700',
    },
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log(modalRef.current);
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmail = (email: SetStateAction<string>) => {
    setMessage('');
    setEmail(email);
  };
  const handlePassword = (password: SetStateAction<string>) => {
    setMessage('');
    setPassword(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const r = await login({ email, password, redirect: false });
    // console.log(await login({ email, password, redirect:false}))
    console.log(r);
    if (r?.status === 'ok') {
      setStatus('ok');
      setTimeout(() => {
        location.reload();
      }, 1500);
      // return router.replace(callbackUrl); // Redirect to the URL provided in the result
    } else {
      setStatus('default');
      setMessage('Password or email not correct!');
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <button onClick={toggleModal} className={className}>
        Login
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            ref={modalRef}
            className='w-full max-w-md rounded bg-white p-6 shadow-lg'
          >
            <h2 className='mb-4 text-2xl font-bold'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  onChange={(e) => handleEmail(e.target.value)}
                  type='email'
                  id='email'
                  className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='password'
                >
                  Password
                </label>
                <input
                  onChange={(e) => handlePassword(e.target.value)}
                  type='password'
                  id='password'
                  className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                />
              </div>
              {message.length > 0 && (
                <div className='mb-4" flex items-center justify-center text-red-800'>
                  {message}
                </div>
              )}
              <div className='flex items-center justify-center'>
                <button
                  type='submit'
                  className={`px-4 py-2 font-bold text-white ${statusBtn[status].color} rounded hover:${statusBtn[status].color_hover}`}
                >
                  {statusBtn[status].text}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
