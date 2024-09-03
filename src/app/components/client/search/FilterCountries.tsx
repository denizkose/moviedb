import Filter from '@/components/client/search/Filter';
import { title } from 'process';
import { ChangeEventHandler } from 'react';
import { CountryConfiguration } from 'tmdb-ts';

type FilterCountriesType = {
  countries: CountryConfiguration[];
  setData: ChangeEventHandler;
  title: string;
  id: string;
};
export default function FilterCountries({
  countries,
  setData,
  title,
  id,
}: FilterCountriesType) {
  return (
    <Filter title={title} id={id}>
      <select
        name={id}
        id={id}
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        onChange={setData}
        defaultValue={'all'}
      >
        <option value='all'>All</option>
        {countries.map((c) => (
          <option key={c.iso_3166_1} id={c.iso_3166_1} value={c.iso_3166_1}>
            {c.native_name}
          </option>
        ))}
      </select>
    </Filter>
  );
}
