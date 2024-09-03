import Filter from '@/components/client/search/Filter';
import { title } from 'process';
import { ChangeEventHandler } from 'react';

type FilterGenresType = {
  genres: { id: number; name: string }[];
  setData: ChangeEventHandler;
  title: string;
  id: string;
};
export default function FilterGenres({
  genres,
  setData,
  title,
  id,
}: FilterGenresType) {
  return (
    <Filter title={title} id={id}>
      <select
        name={id}
        id={id}
        className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-white px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
        onChange={setData}
        multiple
        defaultValue={['all']}
      >
        <option value='all'>All</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </Filter>
  );
}
