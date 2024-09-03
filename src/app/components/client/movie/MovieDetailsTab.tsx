import { AppendToResponse, MovieDetails } from 'tmdb-ts';

type MovieProp = {
  movie: AppendToResponse<
    MovieDetails,
    (
      | 'similar'
      | 'recommendations'
      | 'credits'
      | 'videos'
      | 'images'
      | 'lists'
    )[],
    'movie'
  >;
};

export default function MediaDetailsTab({ movie }: MovieProp) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <>
      <ul className='space-y-4'>
        <li id='movie-name' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Original title</span>
          <span className=''>{movie.original_title}</span>
        </li>
        <li id='movie-status' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Status</span>
          <span className=''>
            {movie.status}{' '}
            {movie.status === 'Released' ? `(${movie.release_date})` : ''}
          </span>
        </li>
        <li id='movie-language' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Language</span>
          <span className=''>
            {movie.spoken_languages.map((l, index) => (
              <span key={index}>{l.name}</span>
            ))}
          </span>
        </li>
        <li id='movie-budget' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Budget</span>
          <span className=''>{USDollar.format(movie.budget)}</span>
        </li>
        <li id='movie-revenue' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Revenue</span>
          <span className=''>{USDollar.format(movie.revenue)}</span>
        </li>
      </ul>
    </>
  );
}
