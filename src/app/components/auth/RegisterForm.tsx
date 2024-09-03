'use client';

import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function RegisterForm() {
  // TODO Refactor status button
  type Status = 'default' | 'ok' | 'loading' | 'active';
  type StatusButton = {
    text: React.ReactNode;
    color: string;
    color_hover: string;
  };

  const statusBtn: Record<Status, StatusButton> = {
    default: {
      text: 'Register',
      color: 'bg-gray-400',
      color_hover: 'bg-gray-400',
    },
    active: {
      text: 'Register',
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

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [status, setStatus] = useState<Status>('default');
  const [regBtnStatus, setRegBtnStatus] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const allFieldsFilled =
      form.username.length > 0 &&
      form.email.length > 0 &&
      form.password.length > 0;
    setRegBtnStatus(allFieldsFilled);
    if (allFieldsFilled) setStatus('active');
    else setStatus('default');
  }, [form]);

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const checkCredentials = await fetch('/api/check-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: form.username, email: form.email }),
      });
      const res = await checkCredentials.json();
      console.log(res);
      console.log(res.available);
      if (res.available) {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Process response here
        console.log('Registration Successful', response);
        setStatus('ok');
        setTimeout(() => {
          setForm({
            ...form,
            username: '',
            password: '',
            email: '',
          });
        }, 1200);
      } else {
        setMessage('Login or email is already used!');
        setStatus('default');
      }
    } catch (error) {
      console.error('Registration Failed:', error);
      setStatus('default');
    }
  }

  return (
    <form
      className='flex flex-col items-center space-y-4'
      onSubmit={register}
      method='post'
    >
      {message.length > 0 && (
        <div className='text-md my-4 block rounded-md bg-red-200 p-4 text-red-950'>
          {message}
        </div>
      )}
      <label>
        <span>Your login</span>
        <input
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none'
          type='text'
          name='username'
          value={form.username}
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
          }}
          disabled={(status === 'loading' || status === 'ok') && true}
        />
      </label>
      <label>
        <span>Your password</span>
        <input
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none'
          type='password'
          name='password'
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
          disabled={(status === 'loading' || status === 'ok') && true}
        />
      </label>
      <label>
        <span>Your email</span>
        <input
          className='form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none'
          type='email'
          name='email'
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          disabled={(status === 'loading' || status === 'ok') && true}
        />
      </label>
      <button
        className={`btn ${statusBtn[status].color} justify-start rounded px-4 py-2 text-white hover:${statusBtn[status].color_hover}`}
        disabled={!regBtnStatus}
      >
        {statusBtn[status].text}
      </button>
    </form>
  );
}
