import Filter from '@/components/client/search/Filter';
import { sortABC } from '@/lib/utils';
import React, { ChangeEventHandler, useState } from 'react';
import { WatchProvider } from 'tmdb-ts';

type FilterProvidersType = {
  providers: WatchProvider[];
  setData: ChangeEventHandler;
  title: string;
  id: string;
};
export default function FilterProviders({
  providers,
  setData,
  title,
  id,
}: FilterProvidersType) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(providers);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredOptions(
      providers.filter((option) =>
        option.provider_name.toLowerCase().includes(term)
      )
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
        multiple
        defaultValue={['all']}
      >
        <option value='all'>All</option>
        {sortABC(filteredOptions, 'provider_name').map((p) => (
          <option key={p.provider_id} value={p.provider_id}>
            {p.provider_name}
          </option>
        ))}
      </select>
    </Filter>
  );
}
