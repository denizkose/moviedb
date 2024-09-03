import { AppendToResponse, TvShowDetails } from 'tmdb-ts';

type TVShowProp = {
  tv: AppendToResponse<
    TvShowDetails,
    ('similar' | 'recommendations' | 'credits' | 'videos' | 'images')[],
    'tvShow'
  >;
};

export default function TVShowDetailsTab({ tv }: TVShowProp) {
  return (
    <>
      <ul className='space-y-4'>
        <li id='tv-name' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Original title</span>
          <span className=''>{tv.original_name}</span>
        </li>
        <li id='tv-status' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Status</span>
          <span className=''>
            {tv.status}{' '}
            {tv.status === 'Released' ? `(${tv.first_air_date})` : ''}
          </span>
        </li>
        <li id='tv-language' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Language</span>
          <span className=''>
            {tv.spoken_languages.map((l, index) => (
              <span key={index}>{l.name}</span>
            ))}
          </span>
        </li>
        <li id='tv-budget' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Number of seasons</span>
          <span className=''>{tv.number_of_seasons}</span>
        </li>
        <li id='tv-revenue' className='flex flex-col space-y-1'>
          <span className='text-lg font-semibold'>Number of episodes</span>
          <span className=''>{tv.number_of_episodes}</span>
        </li>
      </ul>
    </>
  );
}
