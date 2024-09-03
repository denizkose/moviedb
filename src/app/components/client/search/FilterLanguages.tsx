import Filter from '@/components/client/search/Filter';
import { ChangeEventHandler } from 'react';
import { LanguageConfiguration } from 'tmdb-ts';

type FilterLanguagesType = {
  languages: LanguageConfiguration[];
  setData: ChangeEventHandler;
};
export default function FilterLanguages({
  languages,
  setData,
}: FilterLanguagesType) {
  return (
    <Filter title='Language' id='languages'>
      <select
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        id='languages'
        onChange={setData}
      >
        <option value='all'>All</option>
        {languages.map((l) => (
          <option key={l.iso_639_1} id={l.iso_639_1} value={l.iso_639_1}>
            {l.english_name} {l.name && `| ${l.name}`}
          </option>
        ))}
      </select>
    </Filter>
  );
}
