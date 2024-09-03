import Filter from '@/components/client/search/Filter';
import { sortABC } from '@/lib/utils';
import React, { ChangeEventHandler, useState } from 'react';
import { WatchProvider } from 'tmdb-ts';

type FilterInputSelectType = {
  data: WatchProvider[];
  data_name: string;
  data_key: string;
  setData: ChangeEventHandler;
  title: string;
  id: string;
  multiple: boolean;
};
export default function FilterInputSelect({
  data,
  data_name,
  data_key,
  setData,
  title,
  id,
  multiple,
}: FilterInputSelectType) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(data);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      data.filter((option) => option.provider_name.toLowerCase().includes(term))
    );
  };
  return (
    <Filter title={title} id={id}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder='Search...'
        className='w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200'
      />
      <select
        name={id}
        id={id}
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        onChange={setData}
        multiple={multiple}
        defaultValue={['all']}
      >
        <option value='all'>All</option>
        {sortABC(filteredOptions, data_name).map((p) => (
          <option key={p[data_key]} value={p[data_key]}>
            {p[data_name]}
          </option>
        ))}
      </select>
    </Filter>
  );
}
