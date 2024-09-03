import { faFilm, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler, useState } from 'react';

type FilterType = {
  type: boolean;
  tumbler: ChangeEventHandler;
};

export default function SwitcherMovieTv({ type, tumbler }: FilterType) {
  return (
    <div>
      <label
        htmlFor='toggle'
        className='relative inline-flex cursor-pointer items-center'
      >
        <input
          id='toggle'
          type='checkbox'
          checked={type}
          onChange={tumbler}
          className='sr-only'
        />
        <div
          className={`h-16 w-36 rounded-full bg-gray-300 transition duration-300 ${
            type ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-14 w-14 transform items-center justify-center rounded-full bg-white shadow-md transition duration-300 ${
            type ? 'translate-x-20' : ''
          }`}
        >
          {type ? (
            <FontAwesomeIcon icon={faTv} className='h-9 w-9 text-yellow-500' />
          ) : (
            <FontAwesomeIcon icon={faFilm} className='h-9 w-9 text-blue-500' />
          )}
        </div>
      </label>
      <p className='text-xs italic text-red-500'>
        {type ? 'TV Shows' : 'Films'}
      </p>
    </div>
  );
}
