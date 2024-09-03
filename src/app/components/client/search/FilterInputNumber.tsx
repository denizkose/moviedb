import Filter from '@/components/client/search/Filter';
import { ChangeEventHandler } from 'react';

type FilterInputNumberType = {
  setData: ChangeEventHandler;
  id: string;
  title?: string;
  desc?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  placeholder?: string;
};
export default function FilterInputNumber({
  setData,
  id,
  title,
  desc,
  min,
  max,
  step,
  defaultValue,
  placeholder,
}: FilterInputNumberType) {
  return (
    <Filter title={title} id={id} desc={desc}>
      <input
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        type='number'
        id={id}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={setData}
      />
    </Filter>
  );
}
