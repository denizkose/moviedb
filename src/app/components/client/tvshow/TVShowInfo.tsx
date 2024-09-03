import { configuration } from '@/api/configuration';
import { colors } from '@/lib/colors';
import {
  listOfActors,
  listOfDirectors,
  toFullYear,
  yearsDuration,
} from '@/lib/utils';
import { faCalendar, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { AppendToResponse, TvShowDetails } from 'tmdb-ts';

type TVShowProp = {
  tv: AppendToResponse<TvShowDetails, 'credits'[], 'tvShow'>;
};

export default function TVShowInfo({ tv }: TVShowProp) {
  const release_date = toFullYear(tv.first_air_date);
  const last_date = toFullYear(tv.last_air_date) || null;
  const cast = listOfActors(tv.credits.cast);
  return (
    <section
      id='media-info'
      className='mt-5 flex h-[calc(100lvh-20px)] flex-col justify-center space-y-5 tablet:mt-0 tablet:h-[calc(100vh-64px)]'
    >
      <h1 className='text-4xl font-semibold tablet:text-6xl'>{tv.name}</h1>
      <div id='row-1' className='flex flex-row items-center space-x-5'>
        <div id='categories'>
          {tv.genres.map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index + 1 === tv.genres.length ? '' : ', '}
            </span>
          ))}
        </div>
        <div id='date' className='flex flex-row items-center space-x-2'>
          <FontAwesomeIcon
            icon={faCalendar}
            className={`w-4 ${colors.main.text}`}
          />
          <span>{yearsDuration(release_date, last_date, tv.status)}</span>
        </div>
        <div id='duration' className='flex flex-row items-center space-x-2'>
          <FontAwesomeIcon
            icon={faCircle}
            className={`w-4 ${colors.main.text}`}
          />
          <span>{tv.status}</span>
        </div>
      </div>
      <div id='row-2'>
        <div id='imdb-rating' className='flex flex-row items-center space-x-5'>
          <span className='text-xl font-bold'>TMDB Rating</span>
          <span
            className={`rounded-lg px-2 py-1 text-sm font-semibold ${colors.main.bg}`}
          >
            {tv.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <div id='row-3' className='tablet:w-1/2'>
        <a href={tv.homepage} target='_blank'>
          <button
            className={`btn w-48 rounded-lg px-2 py-2 ${colors.gradients.main} font-bold shadow-xl shadow-white/20 hover:outline hover:outline-2 hover:outline-yellow-400`}
          >
            Watch!
          </button>
        </a>
      </div>
      <div
        id='row-4'
        className='hidden flex-col space-y-2 tablet:flex tablet:w-1/2'
      >
        <div id='directors-list'>
          <span className='font-semibold'>Created by:</span>{' '}
          <span className='font-light'>{tv.created_by.map((p) => p.name)}</span>
        </div>
        <div id='cast-list'>
          <span className='font-semibold'>Cast:</span>{' '}
          <span className='font-light'>{cast}</span>
        </div>
      </div>
      <div id='row-5' className='tablet:w-2/3'>
        <div id='short-description' className='font-light'>
          {tv.overview}
        </div>
      </div>
      <div id='image'>
        <Image
          fill
          alt={tv.name}
          src={
            configuration.images.secure_base_url + 'original' + tv.backdrop_path
          }
          className='-z-10 object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full overflow-hidden bg-gradient-to-b from-[#00000070] to-black'></div>
      </div>
      <span className={`animate-pulse place-self-center pb-5`}>
        <FontAwesomeIcon icon={faAngleDoubleDown} />
      </span>
    </section>
  );
}
