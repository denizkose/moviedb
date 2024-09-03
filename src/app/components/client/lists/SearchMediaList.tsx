import Image from 'next/image';
import SearchMediaCard from '../cards/SearchMediaCard';
import { Movie, MovieDiscoverResult, TV, TvShowDiscoverResult } from 'tmdb-ts';

interface SearchMediaListProps {
  data: MovieDiscoverResult | TvShowDiscoverResult | undefined;
}

export default function SearchMediaList({ data }: SearchMediaListProps) {
  return (
    <div className='grid grid-cols-1 gap-5 tablet:grid-cols-2'>
      {data?.results.map((m) => (
        <SearchMediaCard
          key={m.id}
          id={m.id}
          title={(m as Movie).title || (m as TV).name}
          desc={m.overview}
          image={m.poster_path}
          type={'movie'}
        />
      ))}
    </div>
  );
}
