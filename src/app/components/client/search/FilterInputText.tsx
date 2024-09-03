import Filter from '@/components/client/search/Filter';
import { ChangeEventHandler } from 'react';

type FilterInputTextType = {
  setData: ChangeEventHandler;
  id: string;
  title?: string;
  desc?: string;
  placeholder?: string;
};
export default function FilterInputText({
  setData,
  id,
  title,
  desc,
  placeholder,
}: FilterInputTextType) {
  return (
    <Filter title={title} id={id} desc={desc}>
      <input
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        type='text'
        placeholder={placeholder}
        onChange={setData}
      />
    </Filter>
  );
}
