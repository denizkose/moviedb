import { colors } from '@/lib/colors';
import {
  faCheck,
  faFilm,
  faTv,
  faX,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler } from 'react';

type FilterType = {
  isActive: boolean;
  setData: ChangeEventHandler;
  id: string;
  desc_true?: string;
  desc_false?: string;
};

export default function Switcher({
  isActive,
  setData,
  id,
  desc_true,
  desc_false,
}: FilterType) {
  console.log(isActive, setData, id);
  return (
    <div>
      <label
        htmlFor={id}
        className='relative inline-flex cursor-pointer items-center'
      >
        <input
          id={id}
          type='checkbox'
          checked={isActive}
          onChange={setData}
          className='sr-only'
        />
        <div
          className={`h-8 w-16 rounded-full transition duration-300 ${
            isActive ? `${colors.main.bg}` : `${colors.addition.gray_dark.bg}`
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition duration-300 ${
            isActive
              ? `translate-x-8 ${colors.addition.gray_dark.bg}`
              : 'bg-white'
          }`}
        >
          {isActive ? (
            <FontAwesomeIcon icon={faCheck} className='h-4 w-4 text-white' />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              className={`h-4 w-4 ${colors.main.text}`}
            />
          )}
        </div>
      </label>
      {(desc_true || desc_false) && (
        <p className='text-xs italic text-red-500'>
          {isActive ? desc_true : desc_false}
        </p>
      )}
    </div>
  );
}
